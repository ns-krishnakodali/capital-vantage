"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { LoaderCircle } from "lucide-react";

import { AmbientBackdrop } from "@/components";
import { apiClient } from "@/lib";

import type { UserConfig } from "@/types";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const resolveRoute = async () => {
      try {
        const userConfig = await apiClient.get<UserConfig>("/api/user-config");
        const hasValidConfig = userConfig.name.trim() !== "" && userConfig.email.trim() !== "";

        router.replace(hasValidConfig ? "/dashboard" : "/onboarding");
      } catch (err) {
        console.error("Failed to fetch user configuration.", err);
        router.replace("/onboarding");
      }
    };

    void resolveRoute();
  }, [router]);

  return (
    <main className="app-shell bg-grid-mesh no-scrollbar relative isolate min-h-screen overflow-x-hidden overflow-y-auto px-4 py-6 text-zinc-100 antialiased">
      <AmbientBackdrop />
      <div className="fixed inset-0 z-0 bg-obsidian-950/95 backdrop-blur-md" />
      <div className="relative z-10 flex min-h-[calc(100vh-3rem)] items-center justify-center">
        <section className="premium-panel glow-emerald flex w-full max-w-md flex-col items-center gap-5 rounded-[28px] p-8 text-center sm:p-10">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
            <LoaderCircle className="h-8 w-8 animate-spin" strokeWidth={2} />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-black text-white">Loading dashboard</h1>
            <p className="text-sm leading-relaxed text-zinc-400">
              Checking your configuration and routing you to the correct dashboard.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Home;
