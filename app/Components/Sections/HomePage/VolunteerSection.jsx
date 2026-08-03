"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Bell,
  Award,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import CTAButton from "../../Reusable/CTAButton";

const BENEFITS = [
  {
    icon: MapPin,
    title: "Nearby Mission Alerts",
    description: "Get instant notifications for SOS requests near your location. Accept missions with one tap.",
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    icon: TrendingUp,
    title: "Mission Tracking",
    description: "Track all your active and completed missions in a personal dashboard with status updates.",
    color: "text-green-600",
    bg: "bg-green-50 dark:bg-green-900/20",
  },
  {
    icon: Bell,
    title: "Real-time Updates",
    description: "Live communication with victims and admin. Share rescue proof and update mission status instantly.",
    color: "text-orange-500",
    bg: "bg-orange-50 dark:bg-orange-900/20",
  },
  {
    icon: Award,
    title: "Impact Certificate",
    description: "Earn verified certificates for every rescue mission. Build your humanitarian impact record.",
    color: "text-purple-500",
    bg: "bg-purple-50 dark:bg-purple-900/20",
  },
];

const STEPS = [
  { step: "01", label: "Register your skills, location & availability" },
  { step: "02", label: "Get verified by local admin or NGO" },
  { step: "03", label: "Receive nearby SOS alerts on your phone" },
  { step: "04", label: "Accept missions, rescue, and mark complete" },
];

function BenefitCard({ benefit }) {
  const Icon = benefit.icon;
  return (
    <div className="flex gap-4 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
      <div className={`w-10 h-10 rounded-xl ${benefit.bg} flex items-center justify-center flex-shrink-0`}>
        <Icon className={`w-5 h-5 ${benefit.color}`} />
      </div>
      <div className="flex flex-col gap-1">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          {benefit.title}
        </h4>
        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
          {benefit.description}
        </p>
      </div>
    </div>
  );
}

export default function VolunteerSection() {
  return (
    <section className="w-full px-4 py-16 bg-white dark:bg-gray-950">
      <div className="max-w-5xl mx-auto flex flex-col gap-14">


        {/* ── Main Content: Left + Right ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left — text + steps + CTA */}
          <div className="flex flex-col gap-8">

            {/* Badge + headline */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 w-fit px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-semibold tracking-wide uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Volunteer Program
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 leading-tight tracking-tight">
                Be the Help
                <span className="block text-green-600 dark:text-green-400">
                  Someone Needs Today
                </span>
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-md">
                Join Bangladesh's largest flood rescue volunteer network. Whether
                you have a boat, medical training, or just time — your help saves
                lives during disasters.
              </p>
            </div>

            {/* Steps */}
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                How it works
              </p>
              {STEPS.map(({ step, label }) => (
                <div key={step} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold flex items-center justify-center">
                    {step}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed pt-0.5">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Requirements quick list */}
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                Who can join
              </p>
              {[
                "Any Bangladeshi citizen aged 18+",
                "Boat owners, doctors, nurses, or first-aiders",
                "People with local area knowledge",
                "NGO members and community leaders",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">{item}</span>
                </div>
              ))}
            </div>            
          </div>

          {/* Right — benefit cards */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
              Volunteer benefits
            </p>
            {BENEFITS.map((benefit) => (
              <BenefitCard key={benefit.title} benefit={benefit} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}