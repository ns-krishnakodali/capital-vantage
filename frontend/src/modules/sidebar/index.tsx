"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  CalendarDays,
  CreditCard,
  FileText,
  HandCoins,
  LayoutDashboard,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  PieChart,
  Settings,
  ShieldCheck,
  TrendingUp,
  X,
} from "lucide-react";

import { AmbientBackdrop } from "@/components";
import { apiClient } from "@/lib";

import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import type { UserName } from "@/types";

type SideBarProps = {
  children: ReactNode;
};

type NavigationItem = {
  href?: string;
  icon: LucideIcon;
  id: string;
  label: string;
};

const navigationItems: NavigationItem[] = [
  {
    href: "/dashboard",
    icon: LayoutDashboard,
    id: "dashboard",
    label: "Dashboard",
  },
  {
    href: "/expense-tracking",
    icon: CreditCard,
    id: "expenseTracking",
    label: "Expense Tracking",
  },
  {
    href: "/investment-tracking",
    icon: TrendingUp,
    id: "investmentTracking",
    label: "Investment Tracking",
  },
  {
    href: "/budgeting",
    icon: PieChart,
    id: "budgeting",
    label: "Budgeting",
  },
  {
    href: "/loan-management",
    icon: HandCoins,
    id: "loanManagement",
    label: "Loan Management",
  },
  {
    href: "/subscriptions",
    icon: CalendarDays,
    id: "remindersAndSubscriptions",
    label: "Subscriptions",
  },
  {
    href: "/insurance",
    icon: ShieldCheck,
    id: "insuranceManagement",
    label: "Insurance",
  },
  {
    href: "/tax-planning",
    icon: FileText,
    id: "taxPlanning",
    label: "Tax Planning",
  },
  {
    href: "/financial-health",
    icon: ShieldCheck,
    id: "financeHealthScore",
    label: "Financial Health",
  },
];

type SidebarNavigationItemProps = {
  expanded: boolean;
  item: NavigationItem;
  onNavigate?: () => void;
  pathname: string;
};

const SidebarNavigationItem = ({
  expanded,
  item,
  onNavigate,
  pathname,
}: SidebarNavigationItemProps) => {
  const isActive = item.href !== undefined && pathname === item.href;
  const baseClassName = `group relative flex w-full items-center rounded-r-xl text-xs font-medium transition-all duration-150 ${
    expanded ? "min-h-11 px-3.5 py-3" : "h-11 justify-center px-0"
  } ${
    isActive
      ? "border-l-2 border-emerald-500 bg-white/[0.04] text-white shadow-sm"
      : item.href
        ? "text-zinc-400 hover:bg-white/[0.01] hover:text-zinc-200"
        : "cursor-not-allowed text-zinc-600"
  }`;

  const content = (
    <>
      <span className="flex h-5 w-5 shrink-0 items-center justify-center">
        <item.icon className="h-5 w-5 shrink-0" strokeWidth={2} />
      </span>
      {expanded ? <span className="ml-3 truncate font-semibold">{item.label}</span> : null}
      {!expanded ? (
        <div
          className="pointer-events-none absolute left-20 z-50 rounded-lg border border-white/10 bg-obsidian-900 px-2.5 py-1.5 text-[10px] whitespace-nowrap
          text-zinc-200 opacity-0 shadow-xl transition-opacity duration-150 group-hover:opacity-100"
        >
          {item.label}
        </div>
      ) : null}
    </>
  );

  if (item.href) {
    return (
      <Link
        aria-current={isActive ? "page" : undefined}
        className={baseClassName}
        href={item.href}
        onClick={onNavigate}
      >
        {content}
      </Link>
    );
  }

  return (
    <button aria-disabled="true" className={baseClassName} type="button">
      {content}
    </button>
  );
};

const SidebarLogo = ({ className, sizes }: { className: string; sizes: string }) => {
  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-xl border border-white/10 bg-obsidian-950 shadow-lg shadow-emerald-500/10 ${className}`}
    >
      <Image
        alt="Capital Vantage logo"
        className="scale-150 object-contain object-center"
        fill
        priority
        sizes={sizes}
        src="/logo.png"
      />
    </div>
  );
};

const SidebarBrand = ({ expanded, onToggle }: { expanded: boolean; onToggle: () => void }) => {
  return (
    <div
      className={`group mb-8 flex h-16 items-center ${expanded ? "justify-between" : "justify-center"}`}
    >
      <div className="relative flex min-w-0 items-center">
        <SidebarLogo
          className={`h-9 w-9 transition-all duration-200 ease-out ${
            expanded ? "" : "group-hover:scale-95 group-hover:opacity-0"
          }`}
          sizes="36px"
        />
        <button
          aria-label="Open sidebar"
          className={`absolute inset-0 flex cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-obsidian-900 text-emerald-300 shadow-lg
            shadow-emerald-500/10 backdrop-blur-[1px] transition-all duration-200 ease-out hover:border-emerald-500/40 ${
              expanded
                ? "pointer-events-none scale-95 opacity-0"
                : "pointer-events-none scale-95 opacity-0 group-hover:pointer-events-auto group-hover:scale-100 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:scale-100 group-focus-within:opacity-100"
            }`}
          onClick={onToggle}
          title="Open sidebar"
          type="button"
        >
          <PanelLeftOpen className="h-4 w-4" strokeWidth={2} />
        </button>
        <div
          className={`overflow-hidden whitespace-nowrap transition-[width,opacity,transform,margin] duration-200 ease-out ${
            expanded
              ? "ml-3 w-40 translate-x-0 opacity-100 delay-100"
              : "ml-0 w-0 -translate-x-1 opacity-0 delay-0"
          }`}
        >
          <h1 className="bg-linear-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-xs font-black tracking-tight text-transparent">
            CAPITAL VANTAGE
          </h1>
          <p className="text-[8px] font-semibold tracking-wider text-emerald-400 uppercase">
            Wealth Engine
          </p>
        </div>
      </div>
      {expanded ? (
        <button
          aria-label="Collapse sidebar"
          className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-white/5 bg-zinc-800/40 text-zinc-400
            transition-colors duration-200 hover:bg-zinc-800 hover:text-white"
          onClick={onToggle}
          title="Collapse sidebar"
          type="button"
        >
          <PanelLeftClose className="h-4 w-4" strokeWidth={2} />
        </button>
      ) : null}
    </div>
  );
};

const MobileNavigation = ({ onClose, pathname }: { onClose: () => void; pathname: string }) => {
  return (
    <div className="fixed inset-0 z-50 flex md:hidden">
      <button
        aria-label="Close navigation drawer"
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        type="button"
      />
      <div className="relative z-10 flex h-full w-72 max-w-xs flex-col border-r border-white/10 bg-obsidian-900 p-6 text-zinc-100">
        <div className="mb-8 flex items-center justify-end">
          <button
            className="rounded-lg p-1 text-zinc-400 transition hover:text-white"
            onClick={onClose}
            type="button"
          >
            <X className="h-6 w-6" strokeWidth={2} />
          </button>
        </div>
        <nav className="no-scrollbar flex flex-1 flex-col gap-2 overflow-y-auto">
          {navigationItems.map((item) => {
            const isActive = item.href !== undefined && pathname === item.href;
            if (item.href) {
              return (
                <Link
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-white/10 font-bold text-emerald-400"
                      : "text-zinc-400 hover:bg-white/5"
                  }`}
                  href={item.href}
                  key={item.id}
                  onClick={onClose}
                >
                  <item.icon className="h-5 w-5" strokeWidth={2} />
                  <span>{item.label}</span>
                </Link>
              );
            }

            return (
              <button
                aria-disabled="true"
                className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-left text-sm font-medium text-zinc-600"
                key={item.id}
                type="button"
              >
                <item.icon className="h-5 w-5" strokeWidth={2} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

const getInitials = (name: string) => {
  const trimmedName = name.trim();

  if (trimmedName === "") {
    return "CV";
  }

  const initials = trimmedName
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return initials || "CV";
};

export const SideBar = ({ children }: SideBarProps) => {
  const pathname = usePathname();
  const [isMobileNavigationOpen, setIsMobileNavigationOpen] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [userName, setUserName] = useState<UserName | null>(null);

  useEffect(() => {
    let isActive = true;

    const fetchUserName = async () => {
      try {
        const nextUserName = await apiClient.get<UserName>("/api/user-config/name");

        if (isActive) {
          setUserName(nextUserName);
        }
      } catch (err) {
        console.error("Failed to fetch user name for sidebar.", err);
      }
    };

    void fetchUserName();

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <main className="app-shell bg-grid-mesh no-scrollbar relative isolate min-h-screen overflow-x-hidden overflow-y-auto px-0 text-zinc-100 antialiased">
      <AmbientBackdrop />
      <div className="fixed inset-0 z-0 bg-obsidian-950/80 backdrop-blur-md" />
      <div className="relative z-10 flex min-h-screen overflow-hidden">
        <aside
          className={`no-scrollbar relative z-30 hidden shrink-0 flex-col justify-between overflow-y-auto border-r border-white/4 bg-obsidian-900/90 backdrop-blur-xl
            transition-[width] duration-300 ease-in-out md:flex ${isSidebarExpanded ? "w-64" : "w-22"}`}
        >
          <div
            className={`flex h-full flex-col transition-[padding] duration-300 ease-in-out ${
              isSidebarExpanded ? "p-4" : "p-3"
            }`}
          >
            <SidebarBrand
              expanded={isSidebarExpanded}
              onToggle={() => setIsSidebarExpanded((currentValue) => !currentValue)}
            />
            <nav className="flex-1 space-y-1.5">
              {navigationItems.map((item) => (
                <SidebarNavigationItem
                  expanded={isSidebarExpanded}
                  item={item}
                  key={item.id}
                  onNavigate={() => setIsMobileNavigationOpen(false)}
                  pathname={pathname}
                />
              ))}
            </nav>
          </div>
          <div className="border-t border-white/3 bg-obsidian-950/50 p-4">
            <div
              className={`flex w-full ${
                isSidebarExpanded
                  ? "items-center justify-between gap-3"
                  : "flex-col items-center gap-3"
              }`}
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="relative shrink-0">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-emerald-500/10 text-xs font-bold text-emerald-300
                      shadow-inner"
                  >
                    {getInitials(userName?.name ?? "")}
                  </div>
                  <span className="absolute right-0 bottom-0 h-2.5 w-2.5 rounded-full border-2 border-obsidian-900 bg-emerald-500" />
                </div>
                {isSidebarExpanded ? (
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-bold text-zinc-100">
                      {userName?.name?.trim() || "Workspace User"}
                    </p>
                  </div>
                ) : null}
              </div>
              <button
                aria-disabled="true"
                className="group shrink-0 cursor-pointer rounded-xl border border-white/5 bg-zinc-900/60 p-2 text-zinc-400 transition-all duration-200
                  hover:border-emerald-500/20 hover:bg-zinc-800"
                title="Global preferences"
                type="button"
              >
                <Settings
                  className="h-4 w-4 transition-transform duration-500 ease-out group-hover:rotate-90"
                  strokeWidth={1.75}
                />
              </button>
            </div>
          </div>
        </aside>
        <div className="relative z-10 flex min-w-0 flex-1 flex-col overflow-hidden bg-transparent">
          <button
            className="fixed top-4 left-4 z-30 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-obsidian-900/90 text-zinc-300
              shadow-lg shadow-black/20 backdrop-blur-lg transition hover:bg-zinc-800 hover:text-white md:hidden"
            onClick={() => setIsMobileNavigationOpen(true)}
            type="button"
          >
            <Menu className="h-6 w-6" strokeWidth={2} />
          </button>
          <div className="no-scrollbar flex-1 overflow-y-auto">
            <div className="mx-auto w-full max-w-350 px-4 pt-20 pb-4 md:px-6 md:py-6 lg:px-8 lg:py-8">
              {children}
            </div>
          </div>
        </div>
      </div>
      {isMobileNavigationOpen ? (
        <MobileNavigation onClose={() => setIsMobileNavigationOpen(false)} pathname={pathname} />
      ) : null}
    </main>
  );
};
