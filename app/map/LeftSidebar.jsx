"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Shield,
  Building2,
  Users,
  MapPin,
  ChevronRight,
  Utensils,
  X,
} from "lucide-react";

const NEARBY_SHELTERS = [
  {
    id: "sh1",
    name: "Feni Govt College Shelter",
    area: "Feni Sadar",
    distance: "0.8 km",
    available: 180,
    capacity: 400,
    food: true,
    status: "open",
  },
  {
    id: "sh2",
    name: "Daganbhuiyan High School",
    area: "Daganbhuiyan",
    distance: "2.3 km",
    available: 90,
    capacity: 250,
    food: true,
    status: "open",
  },
  {
    id: "sh3",
    name: "Sonagazi Relief Center",
    area: "Sonagazi",
    distance: "4.1 km",
    available: 55,
    capacity: 200,
    food: false,
    status: "open",
  },
];

const FILTERS = [
  { id: "sos",       label: "SOS",       icon: Shield,    activeClass: "bg-red-500 text-white border-red-500",    inactiveClass: "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-red-300 hover:text-red-500" },
  { id: "shelter",   label: "Shelter",   icon: Building2, activeClass: "bg-blue-500 text-white border-blue-500",   inactiveClass: "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-blue-300 hover:text-blue-500" },
  { id: "volunteer", label: "Volunteer", icon: Users,     activeClass: "bg-green-500 text-white border-green-500", inactiveClass: "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-green-300 hover:text-green-500" },
];

function ShelterCard({ shelter }) {
  const occupancyPct = Math.round(
    ((shelter.capacity - shelter.available) / shelter.capacity) * 100
  );
  const barColor =
    occupancyPct >= 80 ? "bg-red-500" :
    occupancyPct >= 50 ? "bg-orange-400" :
    "bg-green-500";

  return (
    <div className="flex flex-col gap-2.5 p-3.5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">

      {/* Name + distance */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-0.5 min-w-0">
          <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 leading-snug truncate">
            {shelter.name}
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-400">
            <MapPin className="w-3 h-3" />
            {shelter.area}
          </span>
        </div>
        <span className="text-[11px] font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-full flex-shrink-0">
          {shelter.distance}
        </span>
      </div>

      {/* Capacity bar */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between text-[11px] text-gray-400">
          <span>{shelter.available} seats left</span>
          <span>{occupancyPct}% full</span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
          <div
            className={`h-full rounded-full ${barColor} transition-all`}
            style={{ width: `${occupancyPct}%` }}
          />
        </div>
      </div>

      {/* Food + navigate */}
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
          <Utensils className="w-3 h-3" />
          {shelter.food ? "Food available" : "No food"}
        </span>
        <Link
          href={`/shelters/${shelter.id}`}
          className="flex items-center gap-0.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline underline-offset-2"
        >
          Navigate
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

export default function MapSidebar({ onFilterChange }) {
  const [search, setSearch]           = useState("");
  const [activeFilters, setFilters]   = useState(["sos", "shelter", "volunteer"]);

  function toggleFilter(id) {
    setFilters((prev) => {
      const next = prev.includes(id)
        ? prev.filter((f) => f !== id)
        : [...prev, id];
      onFilterChange?.(next);
      return next;
    });
  }

  const filteredShelters = NEARBY_SHELTERS.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.area.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <aside className="w-full max-w-full md:max-w-[18.25rem] md:shrink-0 h-full flex flex-col bg-gray-50 dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 overflow-y-auto md:ml-2 ml-0">

      <div className="flex flex-col gap-5 p-4 w-[95vw] md:w-auto ml-2 md:ml-0">

        {/* ── Search Box ── */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search location..."
            className="w-full pl-9 pr-8 py-2.5 rounded-xl text-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* ── Filter Buttons ── */}
        <div className="flex flex-col gap-2">
          <p className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
            Show on map
          </p>
          <div className="flex items-center gap-2">
            {FILTERS.map(({ id, label, icon: Icon, activeClass, inactiveClass }) => {
              const isActive = activeFilters.includes(id);
              return (
                <button
                  key={id}
                  onClick={() => toggleFilter(id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                    isActive ? activeClass : inactiveClass
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="w-full h-px bg-gray-200 dark:bg-gray-800" />

        {/* ── Nearby Shelters ── */}
        <div className="flex flex-col gap-3 ">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
              Nearby Shelters
            </p>
            <Link
              href="/shelters"
              className="text-xs text-blue-500 hover:underline underline-offset-2 font-medium"
            >
              See all
            </Link>
          </div>

          {filteredShelters.length > 0 ? (
            <div className="flex flex-col gap-3">
              {filteredShelters.map((shelter) => (
                <ShelterCard key={shelter.id} shelter={shelter} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 py-8 text-center text-gray-400">
              <Building2 className="w-8 h-8 opacity-30" />
              <p className="text-sm">No shelters found</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}