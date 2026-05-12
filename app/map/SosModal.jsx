"use client";

import { useState } from "react";
import {
  Shield,
  X,
  MapPin,
  Users,
  ChevronDown,
  Loader2,
  CheckCircle2,
  Navigation,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const EMERGENCY_TYPES = [
  { id: "rescue", label: "Rescue Needed", emoji: "🛶", color: "border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-800 text-red-700 dark:text-red-300" },
  { id: "medical", label: "Medical Emergency", emoji: "🚑", color: "border-orange-300 bg-orange-50 dark:bg-orange-900/20 dark:border-orange-800 text-orange-700 dark:text-orange-300" },
  { id: "food", label: "Food Needed", emoji: "🍞", color: "border-yellow-300 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-800 text-yellow-700 dark:text-yellow-300" },
  { id: "shelter", label: "Shelter Needed", emoji: "🏠", color: "border-blue-300 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800 text-blue-700 dark:text-blue-300" },
  { id: "boat", label: "Boat Needed", emoji: "⛵", color: "border-cyan-300 bg-cyan-50 dark:bg-cyan-900/20 dark:border-cyan-800 text-cyan-700 dark:text-cyan-300" },
  { id: "missing", label: "Missing Person", emoji: "🔍", color: "border-purple-300 bg-purple-50 dark:bg-purple-900/20 dark:border-purple-800 text-purple-700 dark:text-purple-300" },
];

const PEOPLE_OPTIONS = ["1", "2", "3–5", "6–10", "10+"];

function StepDots({ current, total }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`rounded-full transition-all ${i === current
            ? "w-4 h-1.5 bg-red-500"
            : i < current
              ? "w-1.5 h-1.5 bg-red-300"
              : "w-1.5 h-1.5 bg-gray-200 dark:bg-gray-700"
            }`}
        />
      ))}
    </div>
  );
}

function SOSModal({ onClose }) {
  const [step, setStep] = useState(0); // 0 = type, 1 = details, 2 = success
  const [selectedType, setType] = useState(null);
  const [peopleCount, setPeople] = useState("1");
  const [hasChildren, setChildren] = useState(false);
  const [hasElderly, setElderly] = useState(false);
  const [note, setNote] = useState("");
  const [locating, setLocating] = useState(false);
  const [location, setLocation] = useState(null);
  const [locError, setLocError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleGetLocation() {
    if (!navigator.geolocation) {
      setLocError("Geolocation not supported on this device.");
      return;
    }
    setLocating(true);
    setLocError("");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocating(false);
      },
      () => {
        setLocError("Could not get location. Please allow access.");
        setLocating(false);
      }
    );
  }
  async function handleSubmit() {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200)); // simulate API
    setSubmitting(false);
    setStep(2);
  }

  // ── Step 0: Choose emergency type ──
  if (step === 0) {
    return (
      <>
        <div className="flex items-center justify-between mb-5">
          <div className="flex flex-col gap-0.5">
            <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">
              What kind of help do you need?
            </h2>
            <StepDots current={0} total={2} />
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2.5 mb-5">
          {EMERGENCY_TYPES.map((type) => (
            <button
              key={type.id}
              onClick={() => setType(type.id)}
              className={`flex items-center gap-2.5 p-3 rounded-xl border-2 text-sm font-medium transition-all text-left ${selectedType === type.id
                ? type.color + " ring-2 ring-offset-1 ring-red-400"
                : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
                }`}
            >
              <span className="text-xl">{type.emoji}</span>
              <span className="leading-snug">{type.label}</span>
            </button>
          ))}
        </div>

        <Button
          className="flex p-2 rounded-lg w-full gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold justify-center items-center"
          disabled={!selectedType}
          onClick={() => setStep(1)}
        >
          Continue
          <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
        </Button>
      </>
    );
  }

  // ── Step 1: Details ──
  if (step === 1) {
    const typeInfo = EMERGENCY_TYPES.find((t) => t.id === selectedType);
    return (
      <>
        <div className="flex items-center justify-between mb-5">
          <div className="flex flex-col gap-0.5">
            <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">
              {typeInfo?.emoji} {typeInfo?.label}
            </h2>
            <StepDots current={1} total={2} />
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col gap-4">

          {/* People count */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" />
              Number of people
            </label>
            <div className="flex items-center gap-2 flex-wrap">
              {PEOPLE_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setPeople(opt)}
                  className={`px-3.5 py-1.5 rounded-lg border text-sm font-medium transition-all ${peopleCount === opt
                    ? "bg-red-500 text-white border-red-500"
                    : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-red-300 hover:text-red-500"
                    }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Vulnerable people */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Vulnerable persons
            </label>
            <div className="flex gap-2">
              {[
                { label: "👶 Children", value: hasChildren, set: setChildren },
                { label: "👴 Elderly", value: hasElderly, set: setElderly },
              ].map(({ label, value, set }) => (
                <button
                  key={label}
                  onClick={() => set(!value)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm font-medium transition-all ${value
                    ? "bg-orange-100 dark:bg-orange-900/30 border-orange-400 text-orange-700 dark:text-orange-300"
                    : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-orange-300"
                    }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              Your location
            </label>
            {location ? (
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-300 dark:border-green-700 text-sm text-green-700 dark:text-green-300">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span className="font-medium">
                  {location.lat.toFixed(5)}, {location.lng.toFixed(5)}
                </span>
              </div>
            ) : (
              <button
                onClick={handleGetLocation}
                disabled={locating}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400 hover:border-blue-400 hover:text-blue-500 transition-all disabled:opacity-50"
              >
                {locating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Getting location...
                  </>
                ) : (
                  <>
                    <Navigation className="w-4 h-4" />
                    Share My Location
                  </>
                )}
              </button>
            )}
            {locError && (
              <p className="text-xs text-red-500">{locError}</p>
            )}
          </div>

          {/* Optional note */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Additional info (optional)
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Water level, medical condition, landmark..."
              rows={2}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 resize-none"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-5">
          <button
            onClick={() => setStep(0)}
            className="px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            Back
          </button>
          <Button
            className="flex p-2 rounded-lg w-full gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold justify-center items-center"
            disabled={!location || submitting}
            onClick={handleSubmit}
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Sending SOS...
              </>
            ) : (
              <>
                Send SOS Now
                <Shield className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>

        {!location && (
          <p className="text-center text-xs text-gray-400 mt-2">
            Location is required to send SOS
          </p>
        )}
      </>
    );
  }
  return (
    <div className="flex flex-col items-center text-center gap-5 py-4">
      <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
        <CheckCircle2 className="w-8 h-8 text-green-500" />
      </div>
      <div className="flex flex-col gap-1.5">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
          SOS Sent Successfully
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs">
          Your emergency request has been sent. Nearby volunteers and rescue teams have been notified.
        </p>
      </div>
      <div className="w-full px-4 py-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-sm text-blue-700 dark:text-blue-300 font-medium">
        Stay in a safe, visible location and keep your phone on.
      </div>
      <Button
        className="w-full gap-2 bg-gray-900 dark:bg-white dark:text-gray-900 text-white font-semibold"
        onClick={onClose}
      >
        Close
      </Button>
    </div>
  );
}

export default function FloatingSosButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Send SOS"
        className="fixed bottom-6 right-6 z-[500] flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-red-500 hover:bg-red-600 active:scale-95 text-white font-bold text-sm shadow-lg shadow-red-500/40 transition-all"
      >
        {/* Outer pulse ring */}
        <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-25 pointer-events-none" />
        <Shield className="w-5 h-5 relative z-10" />
        <span className="relative z-10">Send SOS</span>
      </button>

      {/* Modal Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[600] flex items-end sm:items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          <div className="w-full max-w-md bg-white dark:bg-gray-950 rounded-2xl p-6 shadow-2xl border border-gray-200 dark:border-gray-800 animate-in slide-in-from-bottom-4 duration-200">
            <SOSModal onClose={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}