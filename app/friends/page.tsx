"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FRIENDS } from "@/lib/friends";
import { PageHeader } from "@/components/page-header";
import { Island } from "@/components/island";

export default function FriendsPage() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div>
      <PageHeader title="Friends" subtitle="Visit your friends' islands" />

      <ul className="space-y-2.5">
        {FRIENDS.map((friend) => {
          const open = openId === friend.id;
          return (
            <li key={friend.id} className="overflow-hidden rounded-2xl bg-white shadow-sm">
              <button
                onClick={() => setOpenId(open ? null : friend.id)}
                className="flex w-full items-center gap-3.5 p-4 text-left transition hover:bg-fog-50"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-moss-200 font-extrabold text-moss-700">
                  {friend.name.charAt(0)}
                </span>
                <span className="flex-1">
                  <span className="block text-sm font-extrabold text-stone-700">
                    {friend.name}
                  </span>
                  <span className="block text-xs font-semibold text-stone-400">
                    @{friend.handle} · {friend.islandType} island · {friend.trees.length} tree
                    {friend.trees.length === 1 ? "" : "s"}
                  </span>
                </span>
                <ChevronDown
                  size={18}
                  className={`text-stone-300 transition-transform ${open ? "rotate-180" : ""}`}
                />
              </button>
              {open && (
                <div className="flex animate-fade-up flex-col items-center px-4 pb-5">
                  <Island trees={friend.trees} islandType={friend.islandType} compact />
                  <p className="mt-3 text-xs font-semibold text-stone-400">
                    {friend.trees.length === 0
                      ? `${friend.name}'s island is still empty`
                      : `${friend.name}'s island`}
                  </p>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
