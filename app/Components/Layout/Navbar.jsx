"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../Ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../Ui/dropdown-menu";

import {
  Info,
  Bell,
  CloudRain,
  Droplets,
  BookOpen,
  Home,
  LayoutDashboard,
  LogOut,
  Map,
  Menu,
  Settings,
  Shield,
  Users,
  Waves,
  HeartHandshake,
  ChevronDown,
  X,
} from "lucide-react";

const MOCK_USER = {
  name: "Admin",
  email: "admin@floodguard.bd",
  role: "admin",
  avatarInitials: "AD",
};

const TRANSLATIONS = {
  en: {
    home: "Home",
    liveMap: "Live Map",
    about: "About Us",
    flood: "Weather",
    awareness: "Awareness",
    dashboard: "Dashboard",
    settings: "Settings",
    manageUsers: "Manage Users",
    signOut: "Sign Out",
    floodRisk: "Flood Risk",
    emergencyPlatform: "Emergency Platform",
    becomeVolunteer: "Become Volunteer",
    volunteer: "Volunteer",
    sos: "SOS",
  },
  bn: {
    home: "হোম",
    liveMap: "লাইভ ম্যাপ",
    about: "আমাদের সম্পর্কে",
    flood: "আবহাওয়া",
    awareness: "সচেতনতা",
    dashboard: "ড্যাশবোর্ড",
    settings: "সেটিংস",
    manageUsers: "ইউজার ম্যানেজ",
    signOut: "লগ আউট",
    floodRisk: "বন্যা ঝুঁকি",
    emergencyPlatform: "জরুরি প্ল্যাটফর্ম",
    becomeVolunteer: "ভলান্টিয়ার হন",
    volunteer: "ভলান্টিয়ার",
    sos: "এসওএস",
  },
};

const NAV_LINKS = [
  { href: "/", key: "home", icon: Home },
  { href: "/map", key: "liveMap", icon: Map },
  { href: "/flood", key: "flood", icon: Droplets },
  { href: "/awareness", key: "awareness", icon: BookOpen },
  { href: "/about", key: "about", icon: Info },
];

const DASHBOARD_ROUTE = {
  user: "/dashboard/user",
  volunteer: "/dashboard/volunteer",
  admin: "/dashboard/admin",
  rescue_team: "/dashboard/rescue",
};

const ROLE_META = {
  user: {
    label: "User",
    className: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  },
  volunteer: {
    label: "Volunteer",
    className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  },
  admin: {
    label: "Admin",
    className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  },
  rescue_team: {
    label: "Rescue Team",
    className: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  },
};

function Logo({ language }) {
  const t = TRANSLATIONS[language];
  return (
    <Link href="/" className="flex items-center gap-2.5 shrink-0">
      <div className="relative w-9 h-9 rounded-xl bg-red-500 flex items-center justify-center">
        <Waves className="w-5 h-5 text-white" />
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
  const floodRisk = true;
  return (
    <div
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border border-red-600 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-sm text-gray-600 dark:text-gray-300 ${className}`}
    >
      <CloudRain className="w-4 h-4 text-amber-500" />
      <span>Feni</span>
      {floodRisk && (
        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300">
          ⚠ {t.floodRisk}
        </span>
      )}
    </div>
  );
}

function NotificationBell({ count = 0 }) {
  return (
    <Button variant="ghost" size="icon" className="relative">
      <Bell className="w-5 h-5" />
      {count > 0 && (
        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border-2 border-white dark:border-gray-900" />
      )}
      <span className="sr-only">{count} notifications</span>
    </Button>
  );
}

function UserMenu({ user, language }) {
  const t = TRANSLATIONS[language];
  const dashboardHref = DASHBOARD_ROUTE[user.role];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-xs font-semibold text-blue-700 dark:text-blue-300 border border-gray-200 dark:border-gray-700">
            {user.avatarInitials}
          </div>
          <div className="hidden md:flex flex-col items-start leading-tight">
            <span className="text-xs font-medium text-gray-900 dark:text-gray-100">
              {user.name}
            </span>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400 hidden md:block" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52 text-gray-400">
        <DropdownMenuLabel className="flex flex-col gap-0.5">
          <span className="font-medium text-sm">{user.name}</span>
          <span className="font-normal text-xs text-muted-foreground">{user.email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={dashboardHref} className="flex items-center gap-2">
            <LayoutDashboard className="w-4 h-4" />
            {t.dashboard}
          </Link>
        </DropdownMenuItem>
        {user.role === "admin" && (
          <DropdownMenuItem asChild>
            <Link href="/admin/users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              {t.manageUsers}
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem asChild>
          <Link href="/settings" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            {t.settings}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex gap-2 items-center text-red-600 dark:text-red-400 focus:text-red-600">
          <LogOut className="w-4 h-4" />
          {t.signOut}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function MobileNav({ user, pathname, language, open, onClose }) {
  const t = TRANSLATIONS[language];
  const dashboardHref = DASHBOARD_ROUTE[user.role];

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/40"
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div className="fixed top-0 left-0 z-50 h-full w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col overflow-hidden shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800">
          <div onClick={onClose}>
            <Logo language={language} />
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <>
            {/* User Info */}
            <div className="px-5 py-4 bg-gray-50/50 dark:bg-gray-800/20 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-xs font-bold text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-gray-700">
                  {user.avatarInitials}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
                    {user.name}
                  </span>
                </div>
              </div>
            </div>

            {/* Nav links */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-4 space-y-6">

                <div className="space-y-2">
                  <h4 className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Menu
                  </h4>
                  <nav className="flex flex-col gap-1">
                    {NAV_LINKS.map(({ href, key, icon: Icon }) => (
                      <Link
                        key={href}
                        href={href}
                        onClick={onClose}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                          pathname === href
                            ? "bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-bold"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        {t[key]}
                      </Link>
                    ))}
                  </nav>
                </div>

                {/* Account */}
                <div className="space-y-2">
                  <h4 className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Account
                  </h4>
                  <nav className="flex flex-col gap-1">
                    <Link
                      href={dashboardHref}
                      onClick={onClose}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      <LayoutDashboard className="w-5 h-5" />
                      {t.dashboard}
                    </Link>
                    <Link
                      href="/settings"
                      onClick={onClose}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      <Settings className="w-5 h-5" />
                      {t.settings}
                    </Link>
                  </nav>
                </div>

                <div className="px-3">
                  <WeatherBadge language={language} className="w-full justify-center py-3" />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-5 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900 flex flex-col gap-3">
              <Button
                variant="outline"
                className="w-full justify-center gap-2 text-green-600 border-green-200 hover:bg-green-50 dark:hover:bg-green-900/20 h-11"
                asChild
              >
                <Link href="/volunteer/register" onClick={onClose}>
                  <HeartHandshake className="w-4 h-4" />
                  {t.becomeVolunteer}
                </Link>
              </Button>

              <Button
                className="w-full gap-2 bg-red-500 hover:bg-red-600 text-white font-bold h-11 shadow-lg shadow-red-500/20"
                asChild
              >
                <Link href="/sos" onClick={onClose}>
                  <Shield className="w-4 h-4" />
                  {t.sos}
                </Link>
              </Button>
            </div>
          </>
      </div>
    </>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [language, setLanguage] = useState("en");
  const [mobileOpen, setMobileOpen] = useState(false);  // ← single source of truth

  const t = TRANSLATIONS[language];
  const user = MOCK_USER;
  const activeRescues = 3;
  const dashboardHref = DASHBOARD_ROUTE[user.role];

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-[#f3f4f6] dark:bg-gray-900 backdrop-blur">
        {/* Main Bar */}
        <div className="flex items-center h-16 px-4 md:px-6 gap-4">

          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo language={language} />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map(({ href, key, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  pathname === href
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
              >
                <Icon className="w-4 h-4" />
                {t[key]}
              </Link>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-2 flex-shrink-0 ml-auto">
            <WeatherBadge language={language} className="hidden md:flex" />

            {/* Language */}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="hidden md:block h-9 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-2 text-sm outline-none text-gray-700 dark:text-gray-300"
            >
              <option value="en">EN</option>
              <option value="bn">বাংলা</option>
            </select>

            {/* Volunteer button */}
            <div className="hidden md:flex md:w-[1vw] md:mr-3">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center rounded-r-none"
                asChild
              >
              </Button>
            </div>

            <div className="hidden md:block w-px h-6 bg-gray-300 dark:bg-gray-700" />

            <div className="hidden md:block">
              <UserMenu user={user} language={language} />
            </div>

            {/* Hamburger button (mobile only) */}
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

      {/* Mobile drawer — rendered outside the header so it can overlay everything */}
      <MobileNav
        user={user}
        pathname={pathname}
        language={language}
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </>
  );
}