"use client";
import waterproof from '../../public/Images/Gemini_Generated_Image_rf7vmmrf7vmmrf7v.png'
import duringflood from '../../public/Images/Gemini_Generated_Image_8inzjh8inzjh8inz.png'
import safety from '../../public/Images/safety_rs1vdhrs1vdhrs1v.png'
import afterflood from '../../public/Images/afterflood_i67mwji67mwji67m.png'
import feniflood from '../../public//Images/flooded-home-3x2-1.jpg'
import afterfeni from '../../public/Images/Flood-Feni-AFP-aff3315d99f0172d80f7cb115784dfe9.webp'

import {
  CheckCircle2,
  XCircle,
  ShieldAlert,
  PackageCheck,
  Wrench,
  ImageIcon,
} from "lucide-react";
import Image from "next/image";

// ── REUSABLE COMPONENTS ──────────────────────────────────────────────────────

/** Drop-in image placeholder — replace <ImageSlot> with <img src="..." /> or <Image> */
function ImageSlot({ label = "Add image here" }) {
  return (
    <div className="w-full aspect-video rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800/40 flex flex-col items-center justify-center gap-2 text-gray-400 dark:text-gray-500">
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
    blue: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800",
    red: "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800",
    green: "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800",
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
  return (
    <section className="w-full">
      <SectionHeader icon={PackageCheck} label="Before the Flood" color="blue" />

      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
        Preparation
      </h2>

      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        Act before the flood arrives — preparation can save lives.
      </p>

      <div className="grid md:grid-cols-2 gap-5 mt-6">
        <Image
          src={feniflood}
          alt=""
          className="rounded-lg md:h-[60vh] md:w-[40vw]"
        />
        <Image
          src={waterproof}
          alt=""
          className="rounded-lg md:h-[60vh] md:w-[40vw]"
        />
      </div>
    </section>
  );
}

// ── SECTION 4: DURING FLOOD ──────────────────────────────────────────────────
function DuringFloodSection() {

  return (
    <section className="w-full justify-center items-center">
      <SectionHeader icon={ShieldAlert} label="During the Flood" color="red" />
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Safety Instructions</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        This is the most critical phase — stay calm and follow these rules.
      </p>

      {/* Image full width */}

      <div className="grid md:grid-cols-2 gap-5 mt-6">
        {/* Do card */}
        <div className="bg-gray-50 dark:bg-gray-800/40 border border-green-200 dark:border-green-800 rounded-2xl p-6">
          <p className="text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-widest mb-4">
            ✅ Safety Steps
          </p>

          <div className="mt-5">
            <Image
              src={duringflood}
              alt=''
              className='rounded-lg md:h-[60vh]'
            />
          </div>
        </div>

        {/* Don't card */}
        <div className="bg-gray-50 dark:bg-gray-800/40 border border-red-200 dark:border-red-800 rounded-2xl p-6">
          <p className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-widest mb-4">
            ❌ Do Not
          </p>


          {/* extra image slot inside dont card for a warning visual */}
          <div className="mt-5">
            <Image
              src={safety}
              alt=''
              className='rounded-lg md:h-[60vh]'
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ── SECTION 5: AFTER FLOOD ───────────────────────────────────────────────────
function AfterFloodSection() {
  return (
    <section className="w-full">
      <SectionHeader icon={Wrench} label="After the Flood" color="green" />
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Recovery Steps</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        The danger isn't always over — recover safely and systematically.
      </p>

      {/* Card */}

      {/* Image slot */}
      <div className="grid md:grid-cols-2 gap-5 mt-6">
        <Image
          src={afterfeni}
          alt=''
          className="rounded-lg md:h-[60vh] md:w-[40vw] mx-auto"
        />
        <Image
          src={afterflood}
          alt=''
          className="rounded-lg md:h-[60vh] md:w-[40vw] mx-auto"
        />
      </div>
    </section>
  );
}

// ── PAGE EXPORT ──────────────────────────────────────────────────────────────
export default function FloodAwarenessSections() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col items-center gap-16 text-center">
        <BeforeFloodSection />

        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />

        <DuringFloodSection />

        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />

        <AfterFloodSection />
      </div>
    </div>
  );
}