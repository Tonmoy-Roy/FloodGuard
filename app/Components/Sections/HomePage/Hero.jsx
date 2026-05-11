"use client";
import Link from "next/link";
import EmergencyServicesSection from "./EmergencyService";
import LiveMap from "../../Reusable/LiveMap";
import VolunteerSection from "./VolunteerSection";
import SuccesStories from "./SuccesStories";
import { Button } from "@/components/ui/button";

import {
  Shield,
  Building2,
  HeartHandshake,
  AlertTriangle,
  Users,
  MapPin,
  ArrowRight,
  CloudRain,
} from "lucide-react";

const STATS = [
  { label: "Active SOS", value: "24", icon: AlertTriangle, color: "text-red-500" },
  { label: "Shelters Open", value: "38", icon: Building2, color: "text-blue-500" },
  { label: "Volunteers", value: "312", icon: Users, color: "text-green-500" },
  { label: "Rescued Today", value: "91", icon: Shield, color: "text-orange-500" },
];

const HERO_CARDS = [
  {
    id: "sos",
    href: "/sos",
    icon: Shield,
    badge: "Emergency",
    badgeClass: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
    title: "Request Emergency Help",
    description:
      "Flood trapped? One tap sends your live location and SOS alert to nearby rescue teams instantly.",
    cta: "Send SOS Now",
    ctaClass: "bg-red-600 hover:bg-red-700 text-white",
    iconBg: "bg-red-100 dark:bg-red-900/30",
    iconColor: "text-red-500",
    border: "border-red-200 dark:border-red-800",
    ring: "hover:ring-2 hover:ring-red-300 dark:hover:ring-red-700",
  },
  {
    id: "shelter",
    href: "/shelters",
    icon: Building2,
    badge: "Safe Zone",
    badgeClass: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    title: "Find Safe Shelter",
    description:
      "Locate nearest government shelters with real-time capacity, food availability, and medical support.",
    cta: "Find Shelter",
    ctaClass: "bg-blue-600 hover:bg-blue-700 text-white",
    iconBg: "bg-blue-100 dark:bg-blue-900/30",
    iconColor: "text-blue-600",
    border: "border-blue-200 dark:border-blue-800",
    ring: "hover:ring-2 hover:ring-blue-300 dark:hover:ring-blue-700",
  },
  {
    id: "volunteer",
    href: "/volunteer/register",
    icon: HeartHandshake,
    badge: "Join Us",
    badgeClass: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
    title: "Become a Volunteer",
    description:
      "Have a boat, medical skills, or just want to help? Register as a volunteer and save lives near you.",
    cta: "Register Now",
    ctaClass: "bg-green-600 hover:bg-green-700 text-white",
    iconBg: "bg-green-100 dark:bg-green-900/30",
    iconColor: "text-green-600",
    border: "border-green-200 dark:border-green-800",
    ring: "hover:ring-2 hover:ring-green-300 dark:hover:ring-green-700",
  },
];

function StatsBar() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-3xl mx-auto mt-10">
      {STATS.map(({ label, value, icon: Icon, color }) => (
        <div
          key={label}
          className="flex flex-col items-center gap-1 px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
        >
          <Icon className={`w-4 h-4 ${color}`} />
          <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {value}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">{label}</span>
        </div>
      ))}
    </div>
  );
}

function HeroCard({ card }) {
  const Icon = card.icon;

  return (
    <div
      className={`relative flex flex-col gap-5 p-6 rounded-2xl dark:bg-gray-900 border ${card.border} ${card.ring} transition-all duration-200 shadow-sm`}
    >
      {/* Badge + Icon row */}
      <div className="flex items-start justify-between">
        <div className={`w-12 h-12 rounded-xl ${card.iconBg} flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${card.iconColor}`} />
        </div>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${card.badgeClass}`}>
          {card.badge}
        </span>
      </div>

      {/* Text */}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 leading-snug">
          {card.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
          {card.description}
        </p>
      </div>

      {/* CTA */}
      <Button
        className={`w-full gap-2 font-semibold p-2 rounded-lg ${card.ctaClass}`}
        asChild
      >
        <Link href={card.href} className="flex justify-center items-center">
          {card.cta}
        </Link>
      </Button>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center px-4 py-16 dark:bg-gray-950">

      {/* Top alert banner */}
      <div className="relative z-10 mb-8 flex items-center gap-2 px-4 py-2 rounded-full border border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20 text-sm text-orange-700 dark:text-orange-300 font-medium">
        <CloudRain className="w-4 h-4 animate-bounce" />
        Flood alert active in Dhaka, Sylhet & Chattogram divisions
        <Link
          href="/alerts"
          className="underline underline-offset-2 text-orange-600 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-200"
        >
          View alerts
        </Link>
      </div>

      {/* Headline */}
      <div className="relative z-10 flex flex-col items-center text-center gap-4 max-w-2xl">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-semibold tracking-wide uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          Live Emergency Platform · Bangladesh
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 leading-tight tracking-tight">
          Emergency Response
          <span className="block text-red-500">When It Matters Most</span>
        </h1>

        <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-xl leading-relaxed">
          Real-time flood rescue coordination — connect victims, volunteers, and
          rescue teams instantly across Bangladesh.
        </p>

        {/* Secondary quick links */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
          <Link
            href="/map"
            className="flex items-center gap-1.5 text-sm text-blue-600 dark:text-blue-400 hover:underline underline-offset-2"
          >
            <MapPin className="w-4 h-4" />
            View Live Map
          </Link>
          <span className="text-gray-300 dark:text-gray-700">·</span>
          <Link
            href="/missing"
            className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:underline underline-offset-2"
          >
            <Users className="w-4 h-4" />
            Missing Persons
          </Link>
          <span className="text-gray-300 dark:text-gray-700">·</span>
          <Link
            href="/resources"
            className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:underline underline-offset-2"
          >
            <AlertTriangle className="w-4 h-4" />
            Request Resources
          </Link>
        </div>
      </div>

      {/* Stats bar */}
      <div className="relative z-10 w-full max-w-3xl mb-10">
        <StatsBar />
      </div>

      {/* ── 3 Hero Cards ── */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-5xl mb-20">
        {HERO_CARDS.map((card) => (
          <HeroCard key={card.id} card={card} />
        ))}
      </div>
      
      <LiveMap></LiveMap>
      <EmergencyServicesSection></EmergencyServicesSection>
      <VolunteerSection></VolunteerSection>
      <SuccesStories></SuccesStories>
    </section>
  );
}