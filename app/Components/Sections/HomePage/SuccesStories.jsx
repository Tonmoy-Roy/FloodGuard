"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import feniflood from '../../../../public/Images/people-wearing-life-jackets-migration-crisis.jpg';
import insulin from '../../../../public/Images/insulin.png';
import shelter from '../../../../public/Images/feni shelter.png';
import recuebaby from '../../../../public/Images/rescue baby.png';

import {
  MapPin,
  Users,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Heart,
  ShieldCheck,
} from "lucide-react";
import CTAButton from "../../Reusable/CTAButton";

// ─── Mock Stories — replace with Firestore data ───────────────────────────────

const STORIES = [
  {
    id: "r1",
    image: feniflood,
    quote: "5 members of a family were rescued safely from a rooftop in Feni Sadar after 18 hours of being trapped by floodwater.",
    familyCount: 5,
    location: "Feni Sadar, Feni",
    district: "Feni",
    volunteerName: "Rakib Hossain",
    volunteerRole: "Boat Volunteer",
    rescuedAt: "June 22, 2024",
    tag: "Family Rescue",
    tagColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  },
  {
    id: "r2",
    image: insulin,
    quote: "An elderly woman with diabetes was airlifted to a shelter with medical support. She received insulin within the first hour.",
    familyCount: 1,
    location: "Daganbhuiyan, Feni",
    district: "Feni",
    volunteerName: "Dr. Farhana Islam",
    volunteerRole: "Medical Volunteer",
    rescuedAt: "June 25, 2024",
    tag: "Medical Emergency",
    tagColor: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  },
  {
    id: "r3",
    image: shelter,
    quote: "12 students from a school were safely evacuated after floodwater reached the second floor. All are now in the Feni shelter.",
    familyCount: 12,
    location: "Sonagazi, Feni",
    district: "Feni",
    volunteerName: "Mahfuz Rahman",
    volunteerRole: "Rescue Team Lead",
    rescuedAt: "June 28, 2024",
    tag: "Group Rescue",
    tagColor: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  },
  {
    id: "r4",
    image: recuebaby,
    quote: "A newborn baby and her mother were rescued within 30 minutes of the SOS alert being sent. The baby is healthy and safe.",
    familyCount: 2,
    location: "Parshuram, Feni",
    district: "Feni",
    volunteerName: "Nurse Sadia Begum",
    volunteerRole: "Medical Volunteer",
    rescuedAt: "July 1, 2024",
    tag: "Critical Rescue",
    tagColor: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  },
];

// ─── Story Card ───────────────────────────────────────────────────────────────

function StoryCard({ story }) {
  const isImportedImage = typeof story.image !== "string";
  return (
    <div className="flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm h-full">
      {/* Image */}
      <div className="relative w-full h-48 overflow-hidden bg-gray-100 dark:bg-gray-800">
        {isImportedImage ? (
          <Image
            src={story.image}
            alt={`Rescue story from ${story.location}`}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 33vw"
            priority
          />
        ) : (
          <img
            src={story.image}
            alt={`Rescue story from ${story.location}`}
            className="w-full h-full object-cover"
          />
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        {/* Tag */}
        <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${story.tagColor}`}>
         
        </span>
        {/* People count badge */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs font-medium">
          <Users className="w-3.5 h-3.5" />
          {story.familyCount} {story.familyCount === 1 ? "person" : "people"} rescued
        </div>
      </div>
      {/* Content */}
      <div className="flex flex-col gap-4 p-5 flex-1">
        {/* Quote */}
        <blockquote className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          <span className="text-2xl text-gray-300 dark:text-gray-600 font-serif leading-none mr-1">"</span>
          {story.quote}
          <span className="text-2xl text-gray-300 dark:text-gray-600 font-serif leading-none ml-1">"</span>
        </blockquote>
        <div className="mt-auto flex flex-col gap-3">
          {/* Location + date */}
          <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {story.location}
            </span>
            <span>{story.rescuedAt}</span>
          </div>
          {/* Divider */}
          <div className="w-full h-px bg-gray-100 dark:bg-gray-800" />
          {/* Volunteer info */}
          <div className="flex items-center gap-3">
            {/* Avatar initials */}
            <div className="w-9 h-9 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-xs font-bold text-green-700 dark:text-green-400 flex-shrink-0 border border-green-200 dark:border-green-800">
              {story.volunteerName
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")}
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">
                {story.volunteerName}
              </span>
              <span className="text-[11px] text-gray-400 dark:text-gray-500 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-green-500" />
                {story.volunteerRole}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function RescueStoriesSection() {
  const [page, setPage] = useState(0);
  const perPage = 3;
  const totalPages = Math.ceil(STORIES.length / perPage);
  const visible = STORIES.slice(page * perPage, page * perPage + perPage);

  return (
    <section className="w-full px-4 py-10 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-5xl mx-auto flex flex-col gap-10">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 w-fit px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-semibold tracking-wide uppercase">
              <Heart className="w-3 h-3" />
              Real Stories
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
              Lives Saved by Our
              <span className="block text-green-600 dark:text-green-400">
                Volunteers & Rescue Teams
              </span>
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-lg">
              Every SOS is a life. These are real stories of families and
              individuals rescued during floods across Bangladesh.
            </p>
          </div>

          {/* Pagination controls */}
          {totalPages > 1 && (
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="w-9 h-9 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="Previous stories"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-sm text-gray-400 dark:text-gray-500">
                {page + 1} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page === totalPages - 1}
                className="w-9 h-9 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="Next stories"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* ── Story Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {visible.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>

        {/* ── Footer CTA ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold text-gray-900 dark:text-gray-100">1,240+</span>{" "}
            people rescued so far this season.
          </p>
          <div className="flex items-center gap-3">
            <CTAButton></CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
}