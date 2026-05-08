"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Building2,
  Shield,
  AlertTriangle,
  ArrowRight,
  Loader2,
  RefreshCw,
} from "lucide-react";

// ─── Leaflet CSS Import (এটি না দিলে ম্যাপ ভাঙা দেখাবে) ─────────────────────────
import "leaflet/dist/leaflet.css";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_SOS_MARKERS = [
  { id: "s1", lat: 23.8103, lng: 90.4125, type: "Rescue Needed", peopleCount: 6, status: "pending" },
  { id: "s2", lat: 23.7925, lng: 90.4078, type: "Medical Emergency", peopleCount: 2, status: "pending" },
  { id: "s3", lat: 23.8241, lng: 90.3634, type: "Food Needed", peopleCount: 12, status: "active" },
  { id: "s4", lat: 23.7706, lng: 90.3897, type: "Boat Needed", peopleCount: 4, status: "pending" },
  { id: "s5", lat: 23.8350, lng: 90.4300, type: "Shelter Needed", peopleCount: 8, status: "active" },
];

const MOCK_SHELTERS = [
  { id: "sh1", lat: 23.8000, lng: 90.3800, name: "Mirpur Govt School", available: 120, capacity: 300, food: true },
  { id: "sh2", lat: 23.7800, lng: 90.4200, name: "Demra Relief Center", available: 45, capacity: 200, food: true },
  { id: "sh3", lat: 23.8400, lng: 90.3500, name: "Uttara Community Hall", available: 200, capacity: 250, food: false },
];

const MOCK_FLOOD_ZONES = [
  {
    id: "fz1",
    coords: [
      [23.820, 90.390], [23.830, 90.405], [23.825, 90.420],
      [23.810, 90.418], [23.805, 90.400],
    ],
    severity: "high",
  },
  {
    id: "fz2",
    coords: [
      [23.770, 90.395], [23.780, 90.415], [23.775, 90.425],
      [23.760, 90.420], [23.758, 90.400],
    ],
    severity: "medium",
  },
  {
    id: "fz3",
    coords: [
      [23.840, 90.350], [23.850, 90.368], [23.843, 90.375],
      [23.833, 90.370], [23.832, 90.352],
    ],
    severity: "low",
  },
];

const LEGEND_ITEMS = [
  { color: "bg-red-500", label: "Critical SOS" },
  { color: "bg-yellow-400", label: "Food / Shelter" },
  { color: "bg-blue-500", label: "Safe Shelter" },
  { color: "bg-red-400 opacity-50", label: "High Flood Zone" },
  { color: "bg-orange-300 opacity-60", label: "Medium Flood Zone" },
];

const MAP_STATS = [
  { icon: Shield, label: "Active SOS", value: MOCK_SOS_MARKERS.length, color: "text-red-500" },
  { icon: Building2, label: "Shelters", value: MOCK_SHELTERS.length, color: "text-blue-500" },
  { icon: AlertTriangle, label: "Flood Zones", value: MOCK_FLOOD_ZONES.length, color: "text-orange-500" },
];

const FLOOD_ZONE_STYLES = {
  high:   { color: "#ef4444", fillOpacity: 0.35, weight: 2 },
  medium: { color: "#f97316", fillOpacity: 0.25, weight: 1.5 },
  low:    { color: "#eab308", fillOpacity: 0.18, weight: 1 },
};

function sosSvgIcon(status) {
  const bg = status === "active" ? "#f97316" : "#ef4444";
  return `
    <div style="position:relative;width:32px;height:32px">
      <div style="position:absolute;inset:0;border-radius:50%;background:${bg};opacity:0.25;animation:ping 1.5s cubic-bezier(0,0,0.2,1) infinite"></div>
      <div style="position:absolute;inset:4px;border-radius:50%;background:${bg};display:flex;align-items:center;justify-content:center">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      </div>
    </div>
  `;
}

function shelterSvgIcon() {
  return `
    <div style="width:28px;height:28px;border-radius:8px;background:#3b82f6;display:flex;align-items:center;justify-content:center;border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.2)">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    </div>
  `;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function FloodMapPreview() {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    let isMounted = true; // To prevent memory leaks in strict mode

    if (typeof window === "undefined" || mapInstanceRef.current) return;

    // Dynamically import leaflet
    import("leaflet")
      .then((L) => {
        if (!isMounted) return;

        // Fix default marker icon path issue in Next.js
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
          iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
          shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        });

        // Init map
        const map = L.map(mapRef.current, {
          center: [23.8103, 90.4125],
          zoom: 12,
          zoomControl: false,
          scrollWheelZoom: false, // disabled in preview
          attributionControl: false,
        });

        mapInstanceRef.current = map;

        // Tile layer — CartoDB light
        L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
          subdomains: "abcd",
          maxZoom: 19,
        }).addTo(map);

        // ── Flood Zones ──
        MOCK_FLOOD_ZONES.forEach((zone) => {
          const style = FLOOD_ZONE_STYLES[zone.severity];
          L.polygon(zone.coords, {
            color: style.color,
            fillColor: style.color,
            fillOpacity: style.fillOpacity,
            weight: style.weight,
            dashArray: zone.severity === "low" ? "4 4" : null,
          })
            .addTo(map)
            .bindPopup(
              `<div style="font-family:sans-serif;font-size:13px;min-width:130px">
                <strong style="text-transform:capitalize">${zone.severity} Flood Zone</strong>
                <br/><span style="color:#6b7280;font-size:12px">Real-time water level tracking</span>
              </div>`
            );
        });

        // ── Shelters ──
        MOCK_SHELTERS.forEach((shelter) => {
          const icon = L.divIcon({
            html: shelterSvgIcon(),
            className: "",
            iconSize: [28, 28],
            iconAnchor: [14, 14],
          });

          L.marker([shelter.lat, shelter.lng], { icon })
            .addTo(map)
            .bindPopup(
              `<div style="font-family:sans-serif;font-size:13px;min-width:160px">
                <strong>${shelter.name}</strong><br/>
                <span style="color:#3b82f6">🏠 ${shelter.available} / ${shelter.capacity} seats</span><br/>
                <span style="color:#6b7280;font-size:12px">${shelter.food ? "✅ Food available" : "❌ No food"}</span>
              </div>`
            );
        });

        // ── SOS Markers ──
        MOCK_SOS_MARKERS.forEach((sos) => {
          const icon = L.divIcon({
            html: sosSvgIcon(sos.status),
            className: "",
            iconSize: [32, 32],
            iconAnchor: [16, 16],
          });

          L.marker([sos.lat, sos.lng], { icon })
            .addTo(map)
            .bindPopup(
              `<div style="font-family:sans-serif;font-size:13px;min-width:150px">
                <strong style="color:#ef4444">${sos.type}</strong><br/>
                <span style="color:#6b7280">👥 ${sos.peopleCount} people</span><br/>
                <span style="font-size:11px;background:${sos.status === "active" ? "#fed7aa" : "#fee2e2"};color:${sos.status === "active" ? "#9a3412" : "#991b1b"};padding:2px 6px;border-radius:99px">
                  ${sos.status === "active" ? "Rescue Active" : "Awaiting Rescue"}
                </span>
              </div>`
            );
        });

        // Zoom control — top right
        L.control.zoom({ position: "topright" }).addTo(map);

        setLoading(false);
        setLastUpdated(new Date());
      })
      .catch((error) => {
        console.error("Leaflet loading error:", error);
        setLoading(false);
      });

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  function handleRefresh() {
    // TODO: re-fetch Firestore data and update markers
    setLastUpdated(new Date());
  }

  return (
    <section className="w-full px-4 py-16 bg-white dark:bg-gray-950">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-semibold text-red-500 uppercase tracking-widest">
                Live
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
              Flood Situation Map
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Real-time SOS alerts, flood zones, and shelter locations across Bangladesh.
            </p>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-3">
            {MAP_STATS.map(({ icon: Icon, label, value, color }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-0.5 px-4 py-2 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
              >
                <Icon className={`w-4 h-4 ${color}`} />
                <span className="text-lg font-bold text-gray-900 dark:text-gray-100 leading-none">
                  {value}
                </span>
                <span className="text-[10px] text-gray-400">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Map Container ── */}
        <div className="relative w-full rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm">

          {/* Loading overlay */}
          {loading && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-gray-100 dark:bg-gray-900">
              <div className="flex flex-col items-center gap-2 text-gray-400">
                <Loader2 className="w-6 h-6 animate-spin" />
                <span className="text-sm">Loading map...</span>
              </div>
            </div>
          )}

          {/* Leaflet map div */}
          <div
            ref={mapRef}
            className="w-full z-0"
            style={{ height: "420px" }}
          />

          {/* ── Legend overlay ── */}
          <div className="absolute bottom-4 left-4 z-[400] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl px-3 py-2.5 shadow-sm flex flex-col gap-1.5">
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">
              Legend
            </span>
            {LEGEND_ITEMS.map(({ color, label }) => (
              <div key={label} className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-sm ${color} flex-shrink-0`} />
                <span className="text-xs text-gray-600 dark:text-gray-300">{label}</span>
              </div>
            ))}
          </div>

          {/* ── Last updated badge ── */}
          <div className="absolute top-3 left-3 z-[400] flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[11px] text-gray-500 dark:text-gray-400">
              Updated {lastUpdated.toLocaleTimeString("en-BD", { hour: "2-digit", minute: "2-digit" })}
            </span>
            <button
              onClick={handleRefresh}
              className="ml-1 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
              aria-label="Refresh map data"
            >
              <RefreshCw className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* ── Footer row ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Quick legend summary */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-red-500" />
              {MOCK_SOS_MARKERS.length} SOS active
            </span>
            <span className="text-gray-300 dark:text-gray-700">·</span>
            <span className="flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5 text-blue-500" />
              {MOCK_SHELTERS.length} shelters open
            </span>
            <span className="text-gray-300 dark:text-gray-700">·</span>
            <span className="flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5 text-orange-400" />
              {MOCK_FLOOD_ZONES.length} flood zones
            </span>
          </div>

          {/* CTA */}
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold" asChild>
            <Link href="/map">
              View Full Live Map
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}