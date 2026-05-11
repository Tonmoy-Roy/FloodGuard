"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Waves, ExternalLink } from "lucide-react";

const EMERGENCY_CONTACTS = [
  { label: "Flood Hotline", number: "1090", type: "hotline" },
  { label: "Fire Service & Civil Defence", number: "102", type: "emergency" },
  { label: "Police Emergency", number: "999", type: "emergency" },
  { label: "Ambulance", number: "199", type: "emergency" },
  { label: "BDRCS Disaster Helpline", number: "01730-336699", type: "ngo" },
];

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Live Flood Map", href: "/map" },
  { label: "Find Shelter", href: "/shelters" },
  { label: "Send SOS", href: "/sos" },
  { label: "Missing Persons", href: "/missing" },
  { label: "Request Resources", href: "/resources" },
  { label: "Rescue Stories", href: "/stories" },
  { label: "Weather Alerts", href: "/alerts" },
];

const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "https://twitter.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/8801730336699",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.558 4.14 1.535 5.876L.057 23.215a.75.75 0 00.928.928l5.339-1.478A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.943 0-3.77-.5-5.365-1.376l-.385-.216-3.985 1.103 1.104-3.985-.217-.387A9.963 9.963 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
      </svg>
    ),
  },
];

const CONTACT_BADGE = {
  hotline: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  emergency: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  ngo: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
};

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 dark:bg-gray-950 text-gray-300">

      {/* ── Emergency Banner ── */}
      <div className="w-full bg-red-600 px-4 py-3">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-white font-semibold text-sm">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            Flood Emergency? Call the National Disaster Hotline
          </div>
          <a
            href="tel:1090"
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-red-600 text-sm font-bold hover:bg-red-50 transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            1090 — Free Hotline
          </a>
        </div>
      </div>

      {/* ── Main Footer Grid ── */}
      <div className="max-w-5xl mx-auto px-4 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Col 1 — Brand */}
        <div className="flex flex-col gap-5 lg:col-span-1">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-red-500 flex items-center justify-center flex-shrink-0">
              <Waves className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-white">FloodGuard BD</span>
              <span className="text-[10px] text-gray-500 tracking-widest uppercase">
                Emergency Platform
              </span>
            </div>
          </div>

          <p className="text-xs text-gray-400 leading-relaxed">
            Bangladesh's real-time flood emergency response platform. Connecting
            victims, volunteers, and rescue teams when it matters most.
          </p>

          {/* Address */}
          <div className="flex items-start gap-2 text-xs text-gray-500">
            <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
            <span>Dhaka, Bangladesh</span>
          </div>

          <a
            href="mailto:help@floodguard.bd"
            className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-300 transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
            help@floodguard.bd
          </a>

          {/* Social links */}
          <div className="flex items-center gap-2 pt-1">
            {SOCIAL_LINKS.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-8 h-8 rounded-lg border border-gray-700 flex items-center justify-center text-gray-500 hover:text-white hover:border-gray-500 transition-colors"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Col 2 — Emergency Contacts */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
            Emergency Contacts
          </h3>
          <div className="flex flex-col gap-3">
            {EMERGENCY_CONTACTS.map(({ label, number, type }) => (
              <div key={number} className="flex flex-col gap-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-gray-400">{label}</span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${CONTACT_BADGE[type]}`}>
                    {type === "hotline" ? "Hotline" : type === "ngo" ? "NGO" : "Govt"}
                  </span>
                </div>
                <a
                  href={`tel:${number}`}
                  className="flex items-center gap-1.5 text-sm font-bold text-white hover:text-red-400 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-red-400" />
                  {number}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Col 3 — Quick Links */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
            Quick Links
          </h3>
          <ul className="flex flex-col gap-2">
            {QUICK_LINKS.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4 — Volunteer & Info */}
        <div className="flex flex-col">
          <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
            Official Resources
          </h3>

          {/* Bangladesh Gov link */}
          <div className="mt-2 pt-4 flex flex-col gap-2">
            <a
              href="https://ddm.gov.bd"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
              DDM — Dept. of Disaster Management
            </a>
            <a
              href="https://bmd.gov.bd"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
              BMD — Bangladesh Meteorological Dept.
            </a>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-gray-800">
        <div className="max-w-5xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} FloodGuard BD. Built for Bangladesh 🇧🇩
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-600">
            <Link href="/privacy" className="hover:text-gray-400 transition-colors">
              Privacy Policy
            </Link>
            <span>·</span>
            <Link href="/terms" className="hover:text-gray-400 transition-colors">
              Terms of Use
            </Link>
            <span>·</span>
            <Link href="/report" className="hover:text-gray-400 transition-colors">
              Report Fake SOS
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}