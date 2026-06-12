import type { Metadata } from "next";
import "./globals.css";
import { GameProvider } from "@/lib/game";
import { BottomNav } from "@/components/bottom-nav";

export const metadata: Metadata = {
  title: "Sleep Island",
  description: "Grow your island one good night at a time.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-fog-50 font-sans text-stone-800 antialiased">
        <GameProvider>
          <main className="mx-auto w-full max-w-md px-5 pb-32 pt-6">{children}</main>
          <BottomNav />
        </GameProvider>
      </body>
    </html>
  );
}
