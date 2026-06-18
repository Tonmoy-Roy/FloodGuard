import Link from "next/link";
import { Button } from "../Components/Ui/button";
import { AlertTriangle, BookOpen, Shield, ClockCheck, Waves, HeartHandshake } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 px-6 text-center bg-white dark:bg-gray-950">

      {/* decorative blobs */}
      <div className="absolute -top-10 -right-10 w-56 h-56 rounded-full bg-blue-500/10 pointer-events-none" />
      <div className="absolute -bottom-14 -left-8 w-40 h-40 rounded-full bg-blue-500/8 pointer-events-none" />

      <div className="relative max-w-2xl mx-auto flex flex-col items-center gap-5">

        {/* eyebrow badge */}
        <span className="inline-flex items-center gap-2 text-xs font-medium px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800">
          <AlertTriangle className="w-3.5 h-3.5" />
          Flood Awareness & Safety Guide
        </span>

        {/* title */}
        <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900 dark:text-white">
          Flood Safety &<br />Awareness Guide
        </h1>

        {/* description */}
        <p className="text-base text-gray-500 dark:text-gray-400 max-w-md leading-relaxed">
          Learn how to stay safe before, during, and after a flood emergency.
        </p>

        {/* Before / During / After cards */}
        <div className="grid grid-cols-3 gap-3 w-full mt-4">
          {[
            { icon: ClockCheck, label: "Before", sub: "Prepare & plan",   color: "text-blue-500"  },
            { icon: Waves,      label: "During", sub: "Stay safe & alert", color: "text-red-500"   },
            { icon: HeartHandshake, label: "After", sub: "Recover & rebuild", color: "text-green-500" },
          ].map(({ icon: Icon, label, sub, color }) => (
            <div key={label} className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 text-center">
              <Icon className={`w-6 h-6 mx-auto ${color}`} />
              <p className="mt-2 text-sm font-semibold text-gray-900 dark:text-gray-100">{label}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{sub}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}