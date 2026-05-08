"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

// ─── Mock user — replace with real auth context ───────────────────────────────

const MOCK_USER = {
  name: "Admin User",
  email: "admin@floodguard.bd",
  role: "admin", // "user" | "volunteer" | "admin" | "rescue_team"
  avatarInitials: "AD",
};

// ─── Nav links ────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/map", label: "Live Map", icon: Map },
  { href: "/shelters", label: "Shelters", icon: Building2 },
  { href: "/missing", label: "Missing", icon: UserSearch },
  { href: "/alerts", label: "Alerts", icon: AlertTriangle },
];

// Role → dashboard route
const DASHBOARD_ROUTE = {
  user: "/dashboard/user",
  volunteer: "/dashboard/volunteer",
  admin: "/dashboard/admin",
  rescue_team: "/dashboard/rescue",
};

// Role → label & style
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

// ─── Logo ─────────────────────────────────────────────────────────────────────

function Logo() {
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
          Emergency Platform
        </span>
      </div>
    </Link>
  );
}

// ─── Weather Badge ────────────────────────────────────────────────────────────

function WeatherBadge() {
  // TODO: replace with real OpenWeather API data
  const floodRisk = true;

  return (
    <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-600 dark:text-gray-300">
      <CloudRain className="w-4 h-4 text-amber-500" />
      <span>Dhaka</span>
      {floodRisk && (
        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300">
          ⚠ Flood Risk
        </span>
      )}
    </div>
  );
}

// ─── Notification Bell ────────────────────────────────────────────────────────

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

// ─── User Dropdown Menu ───────────────────────────────────────────────────────

function UserMenu({ user }) {
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
            <span className={`text-[10px] font-semibold px-1.5 rounded-full ${roleMeta.className}`}>
              {roleMeta.label}
            </span>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400 hidden md:block" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel className="flex flex-col gap-0.5">
          <span className="font-medium text-sm">{user.name}</span>
          <span className="font-normal text-xs text-muted-foreground">{user.email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href={dashboardHref} className="flex items-center gap-2">
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Link>
        </DropdownMenuItem>

        {/* Admin only */}
        {user.role === "admin" && (
          <DropdownMenuItem asChild>
            <Link href="/admin/users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Manage Users
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem asChild>
          <Link href="/settings" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Settings
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="text-red-600 dark:text-red-400 focus:text-red-600"
          onClick={() => {
            // TODO: call your signOut() here
            console.log("sign out");
          }}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// ─── Mobile Drawer ────────────────────────────────────────────────────────────

function MobileNav({ user, pathname }) {
  const dashboardHref = DASHBOARD_ROUTE[user.role];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="w-5 h-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0">
        <div className="flex flex-col h-full">
          <div className="p-5 border-b border-gray-200 dark:border-gray-800">
            <Logo />
          </div>

          <div className="px-5 pt-4">
            <WeatherBadge />
          </div>

          <nav className="flex flex-col gap-1 p-4 flex-1">
            {NAV_LINKS.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  pathname === href
                    ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}

            <Link
              href={dashboardHref}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                pathname === dashboardHref
                  ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
          </nav>

          <div className="p-4 border-t border-gray-200 dark:border-gray-800 flex flex-col gap-2">
            <Button variant="outline" className="w-full justify-start gap-2" asChild>
              <Link href="/volunteer/register">
                <HeartHandshake className="w-4 h-4 text-green-600" />
                Become a Volunteer
              </Link>
            </Button>
            <Button className="w-full gap-2 bg-red-500 hover:bg-red-600 text-white" asChild>
              <Link href="/sos">
                <Shield className="w-4 h-4" />
                Send SOS
              </Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────

export default function Navbar() {
  const pathname = usePathname();

  // TODO: replace with your real auth hook e.g. const { user } = useAuth();
  const user = MOCK_USER;

  // TODO: replace with real Firestore listener
  const activeRescues = 3;

  const roleMeta = ROLE_META[user.role];
  const dashboardHref = DASHBOARD_ROUTE[user.role];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">

      {/* ── Main Bar ── */}
      <div className="flex items-center justify-between h-16 px-4 md:px-6 gap-4">

        {/* Logo */}
        <Logo />

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                pathname === href
                  ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  : href === "/map"
                  ? "text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950"
                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          <WeatherBadge />

          <div className="hidden md:block w-px h-6 bg-gray-200 dark:bg-gray-700" />

          <Button
            variant="outline"
            size="sm"
            className="hidden md:flex items-center gap-2"
            asChild
          >
            <Link href="/volunteer/register">
              <HeartHandshake className="w-4 h-4 text-green-600" />
              Volunteer
            </Link>
          </Button>

          <Button
            size="sm"
            className="hidden md:flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold"
            asChild
          >
            <Link href="/sos">
              <Shield className="w-4 h-4" />
              SOS
            </Link>
          </Button>

          <div className="hidden md:block w-px h-6 bg-gray-200 dark:bg-gray-700" />

          <NotificationBell count={activeRescues} />

          <UserMenu user={user} />

          {/* Mobile hamburger */}
          <MobileNav user={user} pathname={pathname} />
        </div>
      </div>

      {/* ── Sub Bar (desktop only) ── */}
      <div className="hidden md:flex items-center gap-4 px-6 h-8 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <Shield className="w-3.5 h-3.5" />
          Role:
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
          Dashboard
        </Link>

        <Link
          href="/settings"
          className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          <Settings className="w-3.5 h-3.5" />
          Settings
        </Link>

        {/* Live rescue count */}
        <div className="ml-auto flex items-center gap-1.5 text-xs text-green-600 dark:text-green-400 font-medium">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          {activeRescues} active rescues
        </div>
      </div>
    </header>
  );
}