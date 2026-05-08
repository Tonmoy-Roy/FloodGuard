"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "../Ui/button";
import { Badge } from "../Ui/badge";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  AlertTriangle,
  Bell,
  Building2,
  ChevronDown,
  CloudRain,
  Home,
  LayoutDashboard,
  LogOut,
  Map,
  Menu,
  Settings,
  Shield,
  UserSearch,
  Users,
  Waves,
  HeartHandshake,
} from "lucide-react";

// ───────────────────────────────────────────────────────────────────────────────
// Mock User
// ───────────────────────────────────────────────────────────────────────────────

const MOCK_USER = {
  name: "Admin User",
  email: "admin@floodguard.bd",
  role: "admin", // user | volunteer | admin | rescue_team
  avatarInitials: "AD",
};

// ───────────────────────────────────────────────────────────────────────────────
// Translations
// ───────────────────────────────────────────────────────────────────────────────

const TRANSLATIONS = {
  en: {
    home: "Home",
    liveMap: "Live Map",
    shelters: "Shelters",
    missing: "Missing",
    alerts: "Alerts",

    volunteer: "Volunteer",
    becomeVolunteer: "Become a Volunteer",

    sos: "SOS",

    dashboard: "Dashboard",
    settings: "Settings",
    manageUsers: "Manage Users",
    signOut: "Sign Out",

    floodRisk: "Flood Risk",
    activeRescues: "active rescues",

    role: "Role",

    emergencyPlatform: "Emergency Platform",
  },

  bn: {
    home: "হোম",
    liveMap: "লাইভ ম্যাপ",
    shelters: "আশ্রয়কেন্দ্র",
    missing: "নিখোঁজ",
    alerts: "সতর্কতা",

    volunteer: "স্বেচ্ছাসেবক",
    becomeVolunteer: "স্বেচ্ছাসেবক হোন",

    sos: "এসওএস",

    dashboard: "ড্যাশবোর্ড",
    settings: "সেটিংস",
    manageUsers: "ইউজার ম্যানেজ",
    signOut: "লগ আউট",

    floodRisk: "বন্যা ঝুঁকি",
    activeRescues: "সক্রিয় উদ্ধার অভিযান",

    role: "ভূমিকা",

    emergencyPlatform: "জরুরি প্ল্যাটফর্ম",
  },
};

// ───────────────────────────────────────────────────────────────────────────────
// Nav Links
// ───────────────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { href: "/", key: "home", icon: Home },
  { href: "/map", key: "liveMap", icon: Map },
  { href: "/shelters", key: "shelters", icon: Building2 },
  { href: "/missing", key: "missing", icon: UserSearch },
  { href: "/alerts", key: "alerts", icon: AlertTriangle },
];

// ───────────────────────────────────────────────────────────────────────────────
// Dashboard Routes
// ───────────────────────────────────────────────────────────────────────────────

const DASHBOARD_ROUTE = {
  user: "/dashboard/user",
  volunteer: "/dashboard/volunteer",
  admin: "/dashboard/admin",
  rescue_team: "/dashboard/rescue",
};

// ───────────────────────────────────────────────────────────────────────────────
// Role Meta
// ───────────────────────────────────────────────────────────────────────────────

const ROLE_META = {
  user: {
    label: "User",
    className:
      "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  },

  volunteer: {
    label: "Volunteer",
    className:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  },

  admin: {
    label: "Admin",
    className:
      "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  },

  rescue_team: {
    label: "Rescue Team",
    className:
      "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  },
};

// ───────────────────────────────────────────────────────────────────────────────
// Logo
// ───────────────────────────────────────────────────────────────────────────────

function Logo({ language }) {
  const t = TRANSLATIONS[language];

  return (
    <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
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

// ───────────────────────────────────────────────────────────────────────────────
// Weather Badge
// ───────────────────────────────────────────────────────────────────────────────

function WeatherBadge({ language }) {
  const t = TRANSLATIONS[language];

  const floodRisk = true;

  return (
    <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-sm text-gray-600 dark:text-gray-300">
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

// ───────────────────────────────────────────────────────────────────────────────
// Notification Bell
// ───────────────────────────────────────────────────────────────────────────────

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

// ───────────────────────────────────────────────────────────────────────────────
// User Menu
// ───────────────────────────────────────────────────────────────────────────────

function UserMenu({ user, language }) {
  const t = TRANSLATIONS[language];

  const roleMeta = ROLE_META[user.role];
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

            <span
              className={`text-[10px] font-semibold px-1.5 rounded-full ${roleMeta.className}`}
            >
              {roleMeta.label}
            </span>
          </div>

          <ChevronDown className="w-3.5 h-3.5 text-gray-400 hidden md:block" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel className="flex flex-col gap-0.5">
          <span className="font-medium text-sm">{user.name}</span>

          <span className="font-normal text-xs text-muted-foreground">
            {user.email}
          </span>
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

        <DropdownMenuItem
          className="text-red-600 dark:text-red-400 focus:text-red-600"
          onClick={() => console.log("sign out")}
        >
          <LogOut className="w-4 h-4 mr-2" />
          {t.signOut}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// ───────────────────────────────────────────────────────────────────────────────
// Mobile Nav
// ───────────────────────────────────────────────────────────────────────────────

function MobileNav({ user, pathname, language }) {
  const t = TRANSLATIONS[language];

  const dashboardHref = DASHBOARD_ROUTE[user.role];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-72 p-0">
        <div className="flex flex-col h-full">
          <div className="p-5 border-b border-gray-200 dark:border-gray-800">
            <Logo language={language} />
          </div>

          <div className="px-5 pt-4">
            <WeatherBadge language={language} />
          </div>

          <nav className="flex flex-col gap-1 p-4 flex-1">
            {NAV_LINKS.map(({ href, key, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  pathname === href
                    ? "bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400"
                    : "text-white hover:text-blue-200"
                }`}
              >
                <Icon className="w-4 h-4" />
                {t[key]}
              </Link>
            ))}

            <Link
              href={dashboardHref}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <LayoutDashboard className="w-4 h-4" />
              {t.dashboard}
            </Link>
          </nav>

          <div className="p-4 border-t border-gray-200 dark:border-gray-800 flex flex-col gap-2">
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              asChild
            >
              <Link href="/volunteer/register">
                <HeartHandshake className="w-4 h-4 text-green-600" />
                {t.becomeVolunteer}
              </Link>
            </Button>

            <Button
              className="w-full gap-2 bg-red-500 hover:bg-red-600 text-white"
              asChild
            >
              <Link href="/sos">
                <Shield className="w-4 h-4" />
                {t.sos}
              </Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// ───────────────────────────────────────────────────────────────────────────────
// Navbar
// ───────────────────────────────────────────────────────────────────────────────

export default function Navbar() {
  const pathname = usePathname();

  const [language, setLanguage] = useState("en");

  const t = TRANSLATIONS[language];

  const user = MOCK_USER;

  const activeRescues = 3;

  const roleMeta = ROLE_META[user.role];

  const dashboardHref = DASHBOARD_ROUTE[user.role];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-[#f3f4f6] dark:bg-gray-900 backdrop-blur">
      {/* Main Bar */}

      <div className="flex items-center justify-between h-16 px-4 md:px-6 gap-4">
        {/* Logo */}

        <Logo language={language} />

        {/* Desktop Nav */}

        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ href, key, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                pathname === href
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-white hover:text-blue-200"
              }`}
            >
              <Icon className="w-4 h-4" />
              {t[key]}
            </Link>
          ))}
        </nav>

        {/* Right Side */}

        <div className="flex items-center gap-2">
          <WeatherBadge language={language} />

          <div className="hidden md:block w-px h-6 bg-gray-300 dark:bg-gray-700" />

          {/* Language Switcher */}

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="h-9 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-2 text-sm outline-none text-gray-300"
          >
            <option value="en">EN</option>
            <option value="bn">বাংলা</option>
          </select>

          <Button
            variant="outline"
            size="sm"
            className="hidden md:flex items-center gap-2"
            asChild
          >
            <Link href="/volunteer/register">
              <HeartHandshake className="w-4 h-4 text-green-600" />
              {t.volunteer}
            </Link>
          </Button>

          <Button
            size="sm"
            className="hidden md:flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold"
            asChild
          >
            <Link href="/sos">
              <Shield className="w-4 h-4" />
              {t.sos}
            </Link>
          </Button>

          <div className="hidden md:block w-px h-6 bg-gray-300 dark:bg-gray-700" />

          <NotificationBell count={activeRescues} />

          <UserMenu user={user} language={language} />

          <MobileNav
            user={user}
            pathname={pathname}
            language={language}
          />
        </div>
      </div>

      {/* Sub Bar */}

      <div className="hidden md:flex items-center gap-4 px-6 h-8 bg-gray-100 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <Shield className="w-3.5 h-3.5" />

          {t.role}:

          <Badge
            variant="secondary"
            className={`text-[10px] px-2 py-0 ${roleMeta.className}`}
          >
            {roleMeta.label}
          </Badge>
        </div>

        <span className="text-gray-300 dark:text-gray-700">·</span>

        <Link
          href={dashboardHref}
          className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          <LayoutDashboard className="w-3.5 h-3.5" />
          {t.dashboard}
        </Link>

        <Link
          href="/settings"
          className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          <Settings className="w-3.5 h-3.5" />
          {t.settings}
        </Link>

        <div className="ml-auto flex items-center gap-1.5 text-xs text-green-600 dark:text-green-400 font-medium">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />

          {activeRescues} {t.activeRescues}
        </div>
      </div>
    </header>
  );
}