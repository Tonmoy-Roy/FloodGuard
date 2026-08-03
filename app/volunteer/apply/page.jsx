"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  User, Mail, Phone, MapPin, Briefcase,
  Heart, Clock, Shield, Upload, ChevronRight,
  CheckCircle2, Loader2, AlertCircle,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/app/Components/Ui/button";

const DISTRICTS = [
  "Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna",
  "Barisal", "Rangpur", "Mymensingh", "Feni", "Noakhali",
  "Comilla", "Cox's Bazar", "Sunamganj", "Netrokona",
  "Jamalpur", "Sherpur", "Kurigram", "Gaibandha",
];

const UPAZILAS = {
  Feni: ["Feni Sadar", "Daganbhuiyan", "Chhagalnaiya", "Parshuram", "Sonagazi", "Fulgazi"],
  Noakhali: ["Noakhali Sadar", "Companiganj", "Begumganj", "Hatiya", "Subarnachar"],
  Dhaka: ["Dhanmondi", "Mirpur", "Uttara", "Demra", "Mohammadpur"],
};

const SKILLS_OPTIONS = [
  "First Aid", "Swimming", "Boat Operation", "Medical Training",
  "Search & Rescue", "Driving", "Communication", "Cooking",
  "Psychological Support", "Construction", "Water Purification",
];

const AVAILABILITY_OPTIONS = [
  "Full Time", "Part Time", "Weekends Only", "Evenings Only", "On Call",
];

function StepBar({ current }) {
  const steps = ["Personal Info", "Skills & Experience", "Documents"];
  return (
    <div className="flex items-center gap-2 mb-8">
      {steps.map((label, i) => (
        <div key={label} className="flex items-center gap-2 flex-1">
          <div className={`flex items-center gap-2 ${i <= current ? "text-blue-600" : "text-gray-400"}`}>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors ${i < current ? "bg-blue-600 border-blue-600 text-white"
              : i === current ? "border-blue-600 text-blue-600"
                : "border-gray-300 text-gray-400"
              }`}>
              {i < current ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
            </div>
            <span className="hidden sm:block text-xs font-medium">{label}</span>
          </div>
          {i < steps.length - 1 && (
            <div className={`flex-1 h-px ${i < current ? "bg-blue-600" : "bg-gray-200"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

function Field({ label, required, icon: Icon, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
        {Icon && <Icon className="w-3.5 h-3.5" />}
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && (
        <p className="flex items-center gap-1 text-xs text-red-500">
          <AlertCircle className="w-3 h-3" /> {error}
        </p>
      )}
    </div>
  );
}

const inputClass = "w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition";
const selectClass = inputClass + " cursor-pointer";

export default function VolunteerApplyPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    name: "", email: "", phone: "", age: "", gender: "",
    district: "", upazila: "", address: "", occupation: "",
    emergencyContact: "",
    skills: [], experience: "", availability: "",
    photo: null, nid: null,
  });

  function update(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
  }

  function toggleSkill(skill) {
    setForm(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill],
    }));
  }

  function validate(stepNum) {
    const e = {};
    if (stepNum === 0) {
      if (!form.name.trim()) e.name = "Name is required";
      if (!form.phone.trim()) e.phone = "Phone is required";
      if (!form.age) e.age = "Age is required";
      if (!form.gender) e.gender = "Gender is required";
      if (!form.district) e.district = "District is required";
      if (!form.address.trim()) e.address = "Address is required";
    }
    if (stepNum === 1) {
      if (form.skills.length === 0) e.skills = "Select at least one skill";
      if (!form.availability) e.availability = "Availability is required";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleNext() {
    if (validate(step)) setStep(s => s + 1);
  }

  async function handleSubmit() {
    setSubmitting(true);
    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, val]) => {
        if (key === "skills") data.append("skills", JSON.stringify(val));
        else if (val instanceof File) data.append(key, val);
        else if (val !== null) data.append(key, val);
      });
      data.append("status", "Pending");

      const res = await fetch("/api/volunteer", {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error("Failed");
      localStorage.setItem("volunteer_email", form.email);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setErrors({ submit: "Submission failed. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-md w-full flex flex-col items-center text-center gap-6 p-8 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-green-500" />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Application Submitted!</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Your volunteer application is under review. You will be notified once approved by the admin.
            </p>
          </div>
          <div className="w-full p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-sm text-blue-700 dark:text-blue-300">
            Expected review time: <strong>24–48 hours</strong>
          </div>
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            onClick={() => router.push("/volunteer/status")}
          >
            Track Your Application
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 px-4 py-12">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="flex flex-col gap-2 mb-8 text-center">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-widest">
            Volunteer Program
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
            Join the Rescue Team
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Complete the form below to apply as a flood rescue volunteer.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 md:p-8">
          <StepBar current={step} />

          {/* ── Step 0: Personal Info ── */}
          {step === 0 && (
            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Full Name" required icon={User} error={errors.name}>
                  <input type="text" value={form.name} onChange={e => update("name", e.target.value)}
                    placeholder="Your Name" className={inputClass} />
                </Field>
                <Field label="Email" icon={Mail} error={errors.email}>
                  <input type="email" value={form.email} onChange={e => update("email", e.target.value)}
                    placeholder="Your Email" className={inputClass} />
                </Field>
                <Field label="Phone" required icon={Phone} error={errors.phone}>
                  <input type="tel" value={form.phone} onChange={e => update("phone", e.target.value)}
                    placeholder="Your phone" className={inputClass} />
                </Field>
                <Field label="Age" required error={errors.age}>
                  <input type="number" value={form.age} onChange={e => update("age", e.target.value)}
                    placeholder="Your Age" min="18" max="60" className={inputClass} />
                </Field>
                <Field label="Gender" required error={errors.gender}>
                  <select value={form.gender} onChange={e => update("gender", e.target.value)} className={selectClass}>
                    <option value="">Select gender</option>
                    <option>Male</option><option>Female</option><option>Other</option>
                  </select>
                </Field>
                <Field label="Occupation" icon={Briefcase}>
                  <input type="text" value={form.occupation} onChange={e => update("occupation", e.target.value)}
                    placeholder="Student / Teacher / etc." className={inputClass} />
                </Field>
                <Field label="District" required icon={MapPin} error={errors.district}>
                  <select value={form.district} onChange={e => { update("district", e.target.value); update("upazila", ""); }} className={selectClass}>
                    <option value="">Select district</option>
                    {DISTRICTS.map(d => <option key={d}>{d}</option>)}
                  </select>
                </Field>
                <Field label="Upazila" icon={MapPin}>
                  <select value={form.upazila} onChange={e => update("upazila", e.target.value)} className={selectClass}>
                    <option value="">Select upazila</option>
                    {(UPAZILAS[form.district] || []).map(u => <option key={u}>{u}</option>)}
                  </select>
                </Field>
              </div>
              <Field label="Full Address" required icon={MapPin} error={errors.address}>
                <textarea value={form.address} onChange={e => update("address", e.target.value)}
                  placeholder="Village / Road / Area..." rows={2} className={inputClass + " resize-none"} />
              </Field>
              <Field label="Emergency Contact" icon={Phone}>
                <input type="tel" value={form.emergencyContact} onChange={e => update("emergencyContact", e.target.value)}
                  placeholder="017xxxxxxxx (family member)" className={inputClass} />
              </Field>
            </div>
          )}

          {/* ── Step 1: Skills & Experience ── */}
          {step === 1 && (
            <div className="flex flex-col gap-6">
              <Field label="Skills" required icon={Heart} error={errors.skills}>
                <div className="flex flex-wrap gap-2 mt-1">
                  {SKILLS_OPTIONS.map(skill => (
                    <button key={skill} type="button" onClick={() => toggleSkill(skill)}
                      className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${form.skills.includes(skill)
                        ? "bg-blue-600 text-white border-blue-600"
                        : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-blue-400 hover:text-blue-600"
                        }`}>
                      {skill}
                    </button>
                  ))}
                </div>
              </Field>

              <Field label="Experience" icon={Briefcase}>
                <textarea value={form.experience} onChange={e => update("experience", e.target.value)}
                  placeholder="Describe any previous flood relief or rescue experience..."
                  rows={4} className={inputClass + " resize-none"} />
              </Field>

              <Field label="Availability" required icon={Clock} error={errors.availability}>
                <div className="flex flex-wrap gap-2 mt-1">
                  {AVAILABILITY_OPTIONS.map(opt => (
                    <button key={opt} type="button" onClick={() => update("availability", opt)}
                      className={`px-3.5 py-1.5 rounded-lg border text-sm font-medium transition-all ${form.availability === opt
                        ? "bg-green-600 text-white border-green-600"
                        : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-green-400"
                        }`}>
                      {opt}
                    </button>
                  ))}
                </div>
              </Field>
            </div>
          )}

          {/* ── Step 2: Documents ── */}
          {step === 2 && (
            <div className="flex flex-col gap-6">
              <Field label="Profile Photo" icon={Upload} required>
                <div className="flex items-center gap-4">
                  {form.photo && (
                    <img src={URL.createObjectURL(form.photo)} alt="preview"
                      className="w-16 h-16 rounded-full object-cover border-2 border-blue-200" />
                  )}
                  <label className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400 hover:border-blue-400 hover:text-blue-500 cursor-pointer transition-all">
                    <Upload className="w-4 h-4" />
                    {form.photo ? form.photo.name : "Upload photo (JPG/PNG/JPEG)"}
                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png"
                      className="hidden"
                      onChange={e => update("photo", e.target.files[0])}
                    />
                  </label>
                </div>
              </Field>

              <Field label="National ID / Birth Certificate" icon={Shield} required>
                <label className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400 hover:border-blue-400 hover:text-blue-500 cursor-pointer transition-all">
                  <Upload className="w-4 h-4" />
                  {form.nid ? form.nid.name : "Upload NID / Birth Certificate (JPG/PNG/JPEG)"}
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png"
                    className="hidden"
                    onChange={e => update("nid", e.target.files[0])}
                  />
                </label>
              </Field>

              {/* Summary */}
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Application Summary</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {[
                    ["Name", form.name], ["Phone", form.phone],
                    ["District", form.district], ["Availability", form.availability],
                    ["Skills", form.skills.join(", ") || "—"],
                  ].map(([label, val]) => (
                    <div key={label}>
                      <span className="text-gray-400 text-xs">{label}</span>
                      <p className="font-medium text-gray-800 dark:text-gray-200 truncate">{val || "—"}</p>
                    </div>
                  ))}
                </div>
              </div>

              {errors.submit && (
                <p className="text-xs text-red-500 text-center">{errors.submit}</p>
              )}
            </div>
          )}

          {/* ── Navigation buttons ── */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
            {step > 0 ? (
              <button onClick={() => setStep(s => s - 1)}
                className="px-5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                Back
              </button>
            ) : <div />}

            {step < 2 ? (
              <Button onClick={handleNext}
                className="gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold p-2 rounded-lg group flex justify-center items-center">
                Next <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={submitting}
                className="gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold p-2 rounded-lg group flex justify-center items-center">
                {submitting
                  ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
                  : <><CheckCircle2 className="w-4 h-4" /> Submit Application</>}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}