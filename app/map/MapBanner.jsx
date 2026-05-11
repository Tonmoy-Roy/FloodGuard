"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertTriangle, CloudRain, X, ChevronRight } from "lucide-react";

const ALERTS = [
  {
    id: "a1",
    type: "danger",
    icon: AlertTriangle,
    message: "⚠ Heavy rainfall alert in Feni region. Flood water rising fast in Sadar & Daganbhuiyan.",
    link: "/alerts/feni",
    linkLabel: "View Details",
  },
  {
    id: "a2",
    type: "warning",
    icon: CloudRain,
    message: "🌧 Moderate flood risk in Sylhet & Sunamganj. River levels above danger mark.",
    link: "/alerts/sylhet",
    linkLabel: "View Details",
  },
  {
    id: "a3",
    type: "info",
    icon: CloudRain,
    message: "ℹ Rescue operations active in Noakhali. 12 teams deployed, 3 shelters open.",
    link: "/alerts/noakhali",
    linkLabel: "View Details",
  },
];

const ALERT_STYLES = {
  danger: {
    bg:     "bg-red-600",
    text:   "text-white",
    link:   "text-red-100 hover:text-white",
    close:  "text-red-200 hover:text-white",
    dot:    "bg-red-200",
  },
  warning: {
    bg:     "bg-orange-500",
    text:   "text-white",
    link:   "text-orange-100 hover:text-white",
    close:  "text-orange-200 hover:text-white",
    dot:    "bg-orange-200",
  },
  info: {
    bg:     "bg-blue-600",
    text:   "text-white",
    link:   "text-blue-100 hover:text-white",
    close:  "text-blue-200 hover:text-white",
    dot:    "bg-blue-200",
  },
};

// ─── Single Alert Banner ──────────────────────────────────────────────────────

function MapBanner({ alert, onClose }) {
  const style = ALERT_STYLES[alert.type];
  const Icon  = alert.icon;

  return (
    <div className={`w-full ${style.bg} ${style.text}`}>
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3">

        {/* Left: icon + message */}
        <div className="flex items-center gap-2.5 min-w-0">
          {/* Live pulse dot */}
          <span className={`w-2 h-2 rounded-full ${style.dot} animate-pulse flex-shrink-0`} />
          <Icon className="w-4 h-4 flex-shrink-0 opacity-90" />
          <p className="text-xs sm:text-sm font-medium leading-snug truncate">
            {alert.message}
          </p>
        </div>

        {/* Right: link + close */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <Link
            href={alert.link}
            className={`hidden sm:flex items-center gap-1 text-xs font-semibold underline underline-offset-2 ${style.link} transition-colors`}
          >
            {alert.linkLabel}
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={onClose}
            aria-label="Dismiss alert"
            className={`${style.close} transition-colors`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Top Alert Banner (rotates through alerts) ────────────────────────────────

export default function TopMapBanner() {
  const [alerts, setAlerts]     = useState(ALERTS);
  const [current, setCurrent]   = useState(0);

  // If all dismissed — render nothing
  if (alerts.length === 0) return null;

  const activeAlert = alerts[current] ?? alerts[0];

  function handleClose() {
    const next = alerts.filter((a) => a.id !== activeAlert.id);
    setAlerts(next);
    setCurrent(0);
  }

  return (
    <div className="w-full flex flex-col">
      <MapBanner alert={activeAlert} onClose={handleClose} />

      {/* Multiple alerts — dot indicators */}
      {alerts.length > 1 && (
        <div className="flex items-center justify-center gap-1.5 py-1 bg-gray-900">
          {alerts.map((a, i) => (
            <button
              key={a.id}
              onClick={() => setCurrent(i)}
              aria-label={`Alert ${i + 1}`}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                i === current
                  ? "bg-white scale-125"
                  : "bg-gray-600 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}