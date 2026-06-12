"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Gift, House, ListChecks, Settings, User, Users } from "lucide-react";

const TABS = [
  { href: "/", label: "Home", icon: House },
  { href: "/tasks", label: "Tasks", icon: ListChecks },
  { href: "/rewards", label: "Rewards", icon: Gift },
  { href: "/profile", label: "Profile", icon: User },
  { href: "/friends", label: "Friends", icon: Users },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-4 z-40 mx-auto w-[calc(100%-2.5rem)] max-w-md">
      <div className="flex items-center justify-between rounded-3xl border border-stone-200/80 bg-white/90 px-2.5 py-2 shadow-lg shadow-stone-900/5 backdrop-blur">
        {TABS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-0.5 rounded-2xl px-2.5 py-1.5 transition-colors ${
                active
                  ? "bg-moss-100 text-moss-700"
                  : "text-stone-400 hover:text-stone-500"
              }`}
            >
              <Icon size={20} strokeWidth={2.2} />
              <span className="text-[10px] font-bold tracking-wide">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
