"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

// ─── Services Data ────────────────────────────────────────────────────────────

const SERVICES = [
  {
    id: "medical",
    emoji: "🚑",
    title: "Medical Help",
    description: "Emergency medical assistance for flood-affected victims. Request a medic or ambulance to your location.",
    href: "/request?type=medical",
    stat: "12 medics active",
    statColor: "text-red-500",
    accent: "border-red-200 dark:border-red-800",
    badgeBg: "bg-red-50 dark:bg-red-900/20",
    hoverRing: "hover:ring-2 hover:ring-red-200 dark:hover:ring-red-800",
    ctaColor: "text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200",
    dotColor: "bg-red-500",
  },
  {
    id: "food",
    emoji: "🍞",
    title: "Food Support",
    description: "Request food, drinking water, baby food, or medicine. NGOs and volunteers will deliver to your area.",
    href: "/request?type=food",
    stat: "340 packages sent",
    statColor: "text-orange-500",
    accent: "border-orange-200 dark:border-orange-800",
    badgeBg: "bg-orange-50 dark:bg-orange-900/20",
    hoverRing: "hover:ring-2 hover:ring-orange-200 dark:hover:ring-orange-800",
    ctaColor: "text-orange-600 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-200",
    dotColor: "bg-orange-500",
  },
  {
    id: "rescue",
    emoji: "🛶",
    title: "Rescue Support",
    description: "Boat and rescue team dispatch for trapped victims. Share your location and a team will reach you.",
    href: "/request?type=rescue",
    stat: "8 boats deployed",
    statColor: "text-blue-500",
    accent: "border-blue-200 dark:border-blue-800",
    badgeBg: "bg-blue-50 dark:bg-blue-900/20",
    hoverRing: "hover:ring-2 hover:ring-blue-200 dark:hover:ring-blue-800",
    ctaColor: "text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200",
    dotColor: "bg-blue-500",
  },
  {
    id: "shelter",
    emoji: "🏠",
    title: "Safe Shelter",
    description: "Find the nearest government or NGO shelter with available capacity, food, and medical support.",
    href: "/shelters",
    stat: "38 shelters open",
    statColor: "text-green-600",
    accent: "border-green-200 dark:border-green-800",
    badgeBg: "bg-green-50 dark:bg-green-900/20",
    hoverRing: "hover:ring-2 hover:ring-green-200 dark:hover:ring-green-800",
    ctaColor: "text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200",
    dotColor: "bg-green-500",
  },
];

// ─── Service Card ─────────────────────────────────────────────────────────────

function ServiceCard({ service }) {
  return (
    <div
      className={`group relative flex flex-col gap-4 p-6 rounded-2xl bg-white dark:bg-gray-900 border ${service.accent} ${service.hoverRing} transition-all duration-200 shadow-sm`}
    >
      {/* Emoji icon */}
      <div className={`w-14 h-14 rounded-2xl ${service.badgeBg} flex items-center justify-center text-3xl select-none`}>
        {service.emoji}
      </div>

      {/* Text */}
      <div className="flex flex-col gap-1.5 flex-1">
        <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
          {service.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
          {service.description}
        </p>
      </div>

      {/* Live stat */}
      <div className="flex items-center gap-1.5">
        <span className={`w-1.5 h-1.5 rounded-full ${service.dotColor} animate-pulse`} />
        <span className={`text-xs font-medium ${service.statColor}`}>
          {service.stat}
        </span>
      </div>

      {/* CTA link */}
      <Link
        href={service.href}
        className={`flex items-center gap-1.5 text-sm font-semibold ${service.ctaColor} transition-colors`}
      >
        Request Now
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}

// ─── Emergency Services Section ───────────────────────────────────────────────

export default function EmergencyServicesSection() {
  return (
    <section className="w-full px-4 py-16 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-5xl mx-auto flex flex-col gap-10">

        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-semibold tracking-wide uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            Emergency Services
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
            What Kind of Help Do You Need?
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-lg">
            Select a service below to send a request. Volunteers and rescue teams
            will be notified immediately with your location.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-xs text-gray-400 dark:text-gray-600">
          All requests are monitored by local authorities and NGOs in real time.{" "}
          <Link
            href="/how-it-works"
            className="underline underline-offset-2 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
          >
            How it works
          </Link>
        </p>
      </div>
    </section>
  );
}