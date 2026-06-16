"use client";

import {
  CheckCircle2,
  XCircle,
  ShieldAlert,
  PackageCheck,
  Wrench,
  ImageIcon,
} from "lucide-react";

// ── REUSABLE COMPONENTS ──────────────────────────────────────────────────────

/** Drop-in image placeholder — replace <ImageSlot> with <img src="..." /> or <Image> */
function ImageSlot({ label = "Add image here" }) {
  return (
    <div className="w-full aspect-video rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex flex-col items-center justify-center gap-2 text-gray-400 dark:text-gray-500">
      <ImageIcon className="w-8 h-8 opacity-40" />
      <span className="text-xs font-medium">{label}</span>
    </div>
  );
}

function DoItem({ text }) {
  return (
    <li className="flex items-start gap-3">
      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
      <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{text}</span>
    </li>
  );
}

function DontItem({ text }) {
  return (
    <li className="flex items-start gap-3">
      <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
      <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{text}</span>
    </li>
  );
}

function SectionHeader({ icon: Icon, label, color }) {
  const colors = {
    blue:   "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800",
    red:    "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800",
    green:  "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800",
  };
  return (
    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-widest mb-3 ${colors[color]}`}>
      <Icon className="w-3.5 h-3.5" />
      {label}
    </div>
  );
}

// ── SECTION 3: BEFORE FLOOD ──────────────────────────────────────────────────
function BeforeFloodSection() {
  const steps = [
    "Keep important documents in waterproof bags",
    "Store drinking water and dry food",
    "Charge phones and power banks",
    "Save emergency contact numbers",
    "Know the nearest shelter location",
  ];

  return (
    <section className="w-full bg-white dark:bg-gray-950">
      <SectionHeader icon={PackageCheck} label="Before the Flood" color="blue" />
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Preparation</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        Act before the flood arrives — preparation can save lives.
      </p>

      <div className="grid md:grid-cols-2 gap-6 items-start">
        {/* Image slot */}
        <ImageSlot label="Before flood preparation image" />

        {/* Card */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
          <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">
            What To Do
          </p>
          <ul className="flex flex-col gap-3.5">
            {steps.map((s) => <DoItem key={s} text={s} />)}
          </ul>
        </div>
      </div>
    </section>
  );
}

// ── SECTION 4: DURING FLOOD ──────────────────────────────────────────────────
function DuringFloodSection() {
  const dos = [
    "Move to higher ground immediately",
    "Avoid walking through moving water",
    "Follow official warnings and instructions",
    "Keep children and elderly people safe",
    "Turn off electricity if water enters the house",
    "Move livestock and pets to higher ground and provide food and clean water",
  ];

  const donts = [
    "Do not drive through flooded roads",
    "Do not touch electrical wires",
    "Do not drink flood water",
  ];

  return (
    <section className="w-full bg-white dark:bg-gray-950">
      <SectionHeader icon={ShieldAlert} label="During the Flood" color="red" />
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Safety Instructions</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        This is the most critical phase — stay calm and follow these rules.
      </p>

      {/* Image full width */}
      <ImageSlot label="During flood safety image" />

      <div className="grid md:grid-cols-2 gap-5 mt-6">
        {/* Do card */}
        <div className="bg-white dark:bg-gray-900 border border-green-200 dark:border-green-900 rounded-2xl p-6 shadow-sm">
          <p className="text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-widest mb-4">
            ✅ Safety Steps
          </p>
          <ul className="flex flex-col gap-3.5">
            {dos.map((s) => <DoItem key={s} text={s} />)}
          </ul>
        </div>

        {/* Don't card */}
        <div className="bg-white dark:bg-gray-900 border border-red-200 dark:border-red-900 rounded-2xl p-6 shadow-sm">
          <p className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-widest mb-4">
            ❌ Do Not
          </p>
          <ul className="flex flex-col gap-3.5">
            {donts.map((s) => <DontItem key={s} text={s} />)}
          </ul>

          {/* extra image slot inside dont card for a warning visual */}
          <div className="mt-5">
            <ImageSlot label="Warning / don't image" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ── SECTION 5: AFTER FLOOD ───────────────────────────────────────────────────
function AfterFloodSection() {
  const steps = [
    "Check house safety before entering",
    "Use clean drinking water only",
    "Disinfect affected areas",
    "Report damaged infrastructure to authorities",
    "Seek medical help if needed",
  ];

  return (
    <section className="w-full bg-white dark:bg-gray-950">
      <SectionHeader icon={Wrench} label="After the Flood" color="green" />
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Recovery Steps</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        The danger isn't always over — recover safely and systematically.
      </p>

      <div className="grid md:grid-cols-2 gap-6 items-start">
        {/* Card */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
          <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">
            Recovery Checklist
          </p>
          <ul className="flex flex-col gap-3.5">
            {steps.map((s) => <DoItem key={s} text={s} />)}
          </ul>
        </div>

        {/* Image slot */}
        <ImageSlot label="After flood recovery image" />
      </div>
    </section>
  );
}

// ── PAGE EXPORT ──────────────────────────────────────────────────────────────
export default function FloodAwarenessSections() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 flex flex-col gap-16 bg-white dark:bg-gray-950">
      <BeforeFloodSection />

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />

      <DuringFloodSection />

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />

      <AfterFloodSection />
    </div>
  );
}