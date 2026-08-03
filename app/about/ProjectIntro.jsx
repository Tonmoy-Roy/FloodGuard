"use client";

import { Waves, AlertTriangle, Heart } from "lucide-react";

const REASONS = [
  {
    icon: AlertTriangle,
    title: "Frequent & Severe Flooding",
    description:
      "Many regions across Bangladesh experience devastating floods every year. Thousands of families lose their homes, livelihoods, and access to essential services within hours, creating an urgent need for timely rescue, relief, and coordinated emergency response.",
    color: "text-red-500",
    bg: "bg-red-50 dark:bg-red-900/20",
  },
  {
    icon: Waves,
    title: "Broken Emergency Communication",
    description:
      "During disasters, victims struggle to reach rescue teams, and volunteers have no central system to coordinate. Critical time is lost when communication breaks down.",
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    icon: Heart,
    title: "A Platform Built with Purpose",
    description:
      "This platform was built to bridge that gap — connecting people who need help with those who can provide it, in real time, with no friction.",
    color: "text-green-600",
    bg: "bg-green-50 dark:bg-green-900/20",
  },
];

export default function AboutIntroSection() {
  return (
    <section className="w-full px-4 py-20 bg-white dark:bg-gray-950">
      <div className="max-w-4xl mx-auto flex flex-col gap-16">

        {/* ── Part 1: Project Introduction ── */}
        <div className="flex flex-col gap-3">

          {/* Badge */}
          <div className="flex items-center gap-2 w-fit px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-semibold tracking-wide uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            About the Platform
          </div>

          {/* Intro text */}
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 leading-tight tracking-tight">
              A Real-Time Emergency Response System
              <span className="block text-red-500">Built for Bangladesh.</span>
            </h1>
            <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl">
              FloodGuard BD is a web-based emergency response platform designed to
              help flood-affected people quickly find rescue support, safe shelters,
              volunteers, and critical emergency information during disasters —
              starting with Feni district, one of Bangladesh's most flood-prone
              regions.
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500 leading-relaxed max-w-2xl">
              With one SOS tap, victims can share their live location and emergency
              type with nearby rescue teams. Volunteers get real-time alerts.
              Admins and NGOs monitor the entire situation from a single dashboard.
              Everything in one place, when every second counts.
            </p>
          </div>

          {/* Divider with quote */}
          <div className="border-l-4 border-red-400 pl-5 py-1">
            <p className="text-base font-medium text-gray-700 dark:text-gray-300 italic leading-relaxed">
              "Built not just as a software project — but as a response to a real
              crisis that affects thousands of Bangladeshi families every year."
            </p>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-100 dark:bg-gray-800" />
          <span className="text-xs text-gray-300 dark:text-gray-700 font-medium uppercase tracking-widest">
            Why This Exists
          </span>
          <div className="flex-1 h-px bg-gray-100 dark:bg-gray-800" />
        </div>

        {/* ── Part 2: Why This Project Was Built ── */}
        <div className="flex flex-col gap-8">

          <div className="flex flex-col gap-3">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
              Why This Project Was Built
            </h2>
            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl">
              Many regions frequently face severe flood situations that displace thousands of people within hours. Existing emergency channels are often slow, fragmented, and difficult to access during active disasters. This platform was built to change that by providing a fast, simple, and coordinated emergency response system that anyone can use from a phone.

            </p>
          </div>

          {/* Reason cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {REASONS.map(({ icon: Icon, title, description, color, bg }) => (
              <div
                key={title}
                className="flex flex-col gap-4 p-5 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
              >
                <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Stat strip */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: "2024", label: "Year Built" },
              { value: "6", label: "Upazilas Covered" },
              { value: "1,240+", label: "People Helped" },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-1 py-5 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-center"
              >
                <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {value}
                </span>
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}