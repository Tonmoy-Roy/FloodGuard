"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import favicon from '../../../public/Images/favicon.ico';
import Image from "next/image";


import {
  Info, BookOpen,
  Home, Map, Menu, X, HeartHandshake,
  LayoutDashboard, Users, LogOut,
  Shield, ChevronDown,
} from "lucide-react";

const TRANSLATIONS = {
  en: {
    home: "Home", liveMap: "Live Map", about: "About Us",
    dashboard: "Dashboard", awareness: "Awareness",
    settings: "Settings", manageUsers: "Manage Users", signOut: "Sign Out",
    floodRisk: "Flood Risk", emergencyPlatform: "Emergency Platform",
    becomeVolunteer: "Become Volunteer", volunteer: "Volunteer", sos: "SOS",
    volunteers: "Volunteers", adminPanel: "AD",
  },
  bn: {
    home: "হোম", liveMap: "লাইভ ম্যাপ", about: "আমাদের সম্পর্কে",
    dashboard: "ড্যাশবোর্ড", awareness: "সচেতনতা",
    settings: "সেটিংস", manageUsers: "ইউজার ম্যানেজ", signOut: "লগ আউট",
    floodRisk: "বন্যা ঝুঁকি", emergencyPlatform: "জরুরি প্ল্যাটফর্ম",
    becomeVolunteer: "ভলান্টিয়ার হন", volunteer: "ভলান্টিয়ার", sos: "এসওএস",
    volunteers: "ভলান্টিয়ার", adminPanel: "অ্যাডমিন প্যানেল",
  },
};

const NAV_LINKS = [
  { href: "/", key: "home", icon: Home },
  { href: "/map", key: "liveMap", icon: Map },
  { href: "/volunteer/apply", key: "volunteer", icon: HeartHandshake },
  { href: "/awareness", key: "awareness", icon: BookOpen },
  { href: "/about", key: "about", icon: Info },
];

const ADMIN_MENU = [
  { href: "/dashboard/admin/volunteers", label: "Volunteer Requests", icon: Users },
  { href: "/dashboard/admin", label: "Dashboard", icon: LayoutDashboard },
];

const ROLE_META = {
  user: { label: "User", className: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" },
  volunteer: { label: "Volunteer", className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" },
  admin: { label: "Admin", className: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300" },
  rescue_team: { label: "Rescue Team", className: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200" },
};

function Logo({ language }) {
  const t = TRANSLATIONS[language];
  return (
    <Link href="/" className="flex items-center gap-2.5 shrink-0">
      <div className="relative w-9 h-9 rounded-xl flex items-center justify-center">
        <Image src={favicon} alt="FloodGuard BD" />
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-white dark:border-gray-900 animate-pulse" />
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-sm font-semibold tracking-tight text-gray-900 dark:text-gray-100">
          FloodGuard BD
        </span>
        <span className="text-[10px] text-gray-400 tracking-widest uppercase">
          {t.emergencyPlatform}
        </span>
      </div>
    </Link>
  );
}

function WeatherBadge({ language, className = "" }) {
  const t = TRANSLATIONS[language];
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border border-red-600 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-sm text-gray-600 dark:text-gray-300 ${className}`}>
      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300">
        ⚠ {t.floodRisk}
      </span>
    </div>
  );
}

function AdminDropdown({ language, onSignOut }) {
  const t = TRANSLATIONS[language];
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const router = useRouter();

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleNav(href) {
    setOpen(false);
    router.push(href);
  }

  async function handleSignOut() {
    setOpen(false);
    await onSignOut?.();
    router.push("/admin/login");
  }

  return (
    <div ref={ref} className="relative">
      {/* Trigger button */}
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm font-semibold hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
      >
        <Shield className="w-4 h-4" />
        <span className="hidden sm:block">{t.adminPanel}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl overflow-hidden z-50">

          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-blue-50 dark:bg-red-900/20">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
                <Shield className="w-4 h-4 text-blue-600 dark:blue-red-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-blue-700 dark:text-blue-300">Admin</span>
              </div>
            </div>
          </div>

          {/* Menu items */}
          <div className="py-1.5">
            {ADMIN_MENU.map(({ href, label, icon: Icon }) => (
              <button
                key={href}
                onClick={() => handleNav(href)}
                className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left"
              >
                <Icon className="w-4 h-4 text-gray-400" />
                {label}
              </button>
            ))}
          </div>

          {/* Divider + Sign out */}
          <div className="border-t border-gray-100 dark:border-gray-800 py-1.5">
            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left"
            >
              <LogOut className="w-4 h-4" />
              {t.signOut}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function MobileNav({ pathname, language, role, open, onClose, onSignOut }) {
  const t = TRANSLATIONS[language];
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  function handleNavClick(href) {
    onClose();
    setTimeout(() => router.push(href), 50);
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      />

      {/* Drawer */}
      <div className={`fixed top-0 left-0 z-50 h-full w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col overflow-hidden shadow-xl transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "-translate-x-full"
        }`}>

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800">
          <Logo language={language} />
          <button onClick={onClose} className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-6">

            {/* Main nav */}
            <div className="space-y-1">
              <h4 className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Menu</h4>
              {NAV_LINKS.map(({ href, key, icon: Icon }) => (
                <button key={href} onClick={() => handleNavClick(href)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all w-full text-left ${pathname === href
                    ? "bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-bold"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-blue-600"
                    }`}>
                  <Icon className="w-5 h-5" />
                  {t[key]}
                </button>
              ))}
            </div>

            {role === "admin" && (
              <div className="space-y-1">
                <h4 className="px-3 text-[10px] font-bold text-red-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <Shield className="w-3 h-3" /> AD
                </h4>
                {ADMIN_MENU.map(({ href, label, icon: Icon }) => (
                  <button key={href} onClick={() => handleNavClick(href)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 w-full text-left">
                    <Icon className="w-5 h-5" />
                    {label}
                  </button>
                ))}
              </div>
            )}

            <div className="px-3">
              <WeatherBadge language={language} className="w-full justify-center py-3" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900">
          <button
            onClick={() => { onClose(); onSignOut?.(); }}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <LogOut className="w-5 h-5" />
            {t.signOut}
          </button>
        </div>
      </div>
    </>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [language, setLanguage] = useState("en");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [role, setRole] = useState("user");

  useEffect(() => {
    fetch("/api/admin/check")
      .then(res => res.json())
      .then(data => setRole(data.isAdmin ? "admin" : "user"))
      .catch(() => setRole("user"));
  }, []);

  const handleAdminSignOut = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch {
    }

    document.cookie = "admin_session=; Max-Age=0; path=/";
    setRole("user");
    router.push("/admin/login");
  };

  const t = TRANSLATIONS[language];

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-[#f3f4f6] dark:bg-gray-900 backdrop-blur">
        <div className="flex items-center h-16 px-4 md:px-6 gap-4">

          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo language={language} />
          </div>

          {/* Desktop Nav — centered */}
          <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map(({ href, key, icon: Icon }) => (
              <Link key={href} href={href}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${pathname === href
                  ? "text-blue-600 dark:text-blue-400 font-semibold"
                  : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  }`}>
                <Icon className="w-4 h-4" />
                {t[key]}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2 flex-shrink-0 ml-auto">

            <WeatherBadge language={language} className="hidden md:flex" />

            {/* Language switcher */}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="hidden md:block h-9 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-2 text-sm outline-none text-gray-700 dark:text-gray-300 cursor-pointer"
            >
              <option value="en">EN</option>
              <option value="bn">বাংলা</option>
            </select>

            {/* Admin dropdown — desktop, admin only */}
            {role === "admin" && (
              <div className="hidden md:block">
                <AdminDropdown language={language} onSignOut={handleAdminSignOut} />
              </div>
            )}

            {/* Hamburger — mobile */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 rounded-lg text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <MobileNav
        pathname={pathname}
        language={language}
        role={role}
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onSignOut={handleAdminSignOut}
      />
    </>
  );
}