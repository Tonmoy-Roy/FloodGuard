"use client";

import Link from "next/link";
import { Shield, Map, Building2, HeartHandshake, CloudRain, ArrowRight } from "lucide-react";

// ─── Features Data ────────────────────────────────────────────────────────────

const FEATURES = [
  {
    id: "sos",
    icon: Shield,
    emoji: "🚨",
    title: "Emergency SOS",
    description:
      "One-tap SOS alert with live GPS location sharing. Victims can select emergency type, people count, and send instant alerts to nearby rescue teams — no friction.",
    href: "/sos",
    cta: "Send SOS",
    points: ["Live location sharing", "6 emergency types", "Instant team notification"],
    iconBg: "bg-red-100 dark:bg-red-900/20",
    iconColor: "text-red-500",
    dotColor: "bg-red-500",
    border: "border-red-200 dark:border-red-800",
    ctaColor: "text-red-600 dark:text-red-400 hover:text-red-800",
    tag: "Core Feature",
    tagBg: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  },
  {
    id: "map",
    icon: Map,
    emoji: "🗺️",
    title: "Live Flood Map",
    description:
      "Interactive real-time map showing SOS markers, flood zones, shelter locations, and volunteer positions — updated live from Firestore without page refresh.",
    href: "/map",
    cta: "View Map",
    points: ["Real-time SOS markers", "Flood zone polygons", "Shelter & volunteer pins"],
    iconBg: "bg-blue-100 dark:bg-blue-900/20",
    iconColor: "text-blue-500",
    dotColor: "bg-blue-500",
    border: "border-blue-200 dark:border-blue-800",
    ctaColor: "text-blue-600 dark:text-blue-400 hover:text-blue-800",
    tag: "Live",
    tagBg: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  },
  {
    id: "shelter",
    icon: Building2,
    emoji: "🏠",
    title: "Shelter Finder",
    description:
      "Search nearest government and NGO shelters with real-time capacity, food availability, and medical support info. Navigate directly from the app.",
    href: "/shelters",
    cta: "Find Shelter",
    points: ["Real-time capacity", "Food & medical info", "Google Maps navigation"],
    iconBg: "bg-green-100 dark:bg-green-900/20",
    iconColor: "text-green-600",
    dotColor: "bg-green-500",
    border: "border-green-200 dark:border-green-800",
    ctaColor: "text-green-600 dark:text-green-400 hover:text-green-800",
    tag: "38 Open",
    tagBg: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  },
  {
    id: "volunteer",
    icon: HeartHandshake,
    emoji: "🤝",
    title: "Volunteer Support",
    description:
      "Volunteers register with their skills, location, and resources. They receive nearby SOS alerts, accept missions, and track their rescue history from a personal dashboard.",
    href: "/volunteer/register",
    cta: "Join as Volunteer",
    points: ["Skill-based matching", "Mission tracking", "Impact certificates"],
    iconBg: "bg-orange-100 dark:bg-orange-900/20",
    iconColor: "text-orange-500",
    dotColor: "bg-orange-500",
    border: "border-orange-200 dark:border-orange-800",
    ctaColor: "text-orange-600 dark:text-orange-400 hover:text-orange-800",
    tag: "312 Active",
    tagBg: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  },
  {
    id: "alerts",
    icon: CloudRain,
    emoji: "⛈️",
    title: "Flood Alerts",
    description:
      "Real-time weather and flood warnings pulled from Bangladesh Meteorological Department. Alerts cover rainfall, river danger levels, and regional flood probability.",
    href: "/alerts",
    cta: "View Alerts",
    points: ["BMD weather data", "River danger levels", "Push notifications"],
    iconBg: "bg-purple-100 dark:bg-purple-900/20",
    iconColor: "text-purple-500",
    dotColor: "bg-purple-500",
    border: "border-purple-200 dark:border-purple-800",
    ctaColor: "text-purple-600 dark:text-purple-400 hover:text-purple-800",
    tag: "Live",
    tagBg: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  },
];

// ─── Feature Card ─────────────────────────────────────────────────────────────

function FeatureCard({ feature }) {
  const Icon = feature.icon;

  return (
    <div
      className={`group flex flex-col gap-5 p-6 rounded-2xl bg-white dark:bg-gray-900 border ${feature.border} shadow-sm hover:shadow-md transition-all duration-200`}
    >
      {/* Top row: icon + tag */}
      <div className="flex items-start justify-between">
        <div className={`w-12 h-12 rounded-xl ${feature.iconBg} flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${feature.iconColor}`} />
        </div>
        <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${feature.tagBg}`}>
          {feature.tag}
        </span>
      </div>

      {/* Title + description */}
      <div className="flex flex-col gap-2">
        <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
          {feature.emoji} {feature.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
          {feature.description}
        </p>
      </div>

      {/* Bullet points */}
      <ul className="flex flex-col gap-1.5">
        {feature.points.map((point) => (
          <li key={point} className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${feature.dotColor}`} />
            {point}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        href={feature.href}
        className={`mt-auto flex items-center gap-1.5 text-sm font-semibold ${feature.ctaColor} transition-colors`}
      >
        {feature.cta}
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}

// ─── Main Features Section ────────────────────────────────────────────────────

export default function MainFeaturesSection() {
  return (
    <section className="w-full px-4 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-5xl mx-auto flex flex-col gap-12">

        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-semibold tracking-wide uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            Platform Features
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
            Everything You Need During a Flood
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xl leading-relaxed">
            Five core features designed around one goal — getting help to the
            right person at the right time, with zero friction.
          </p>
        </div>

        {/* Cards: top 3 + bottom 2 centered */}
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.slice(0, 3).map((f) => (
              <FeatureCard key={f.id} feature={f} />
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:w-2/3 lg:mx-auto">
            {FEATURES.slice(3).map((f) => (
              <FeatureCard key={f.id} feature={f} />
            ))}
          </div>
        </div>

        {/* Bottom note */}
        <p className="text-center text-xs text-gray-400 dark:text-gray-600">
          All features work together in real time — powered by Firebase Firestore,
          Next.js 15, and Leaflet.js.
        </p>
      </div>
    </section>
  );
}