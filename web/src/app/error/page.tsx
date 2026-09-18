import Image from "next/image";
import Link from "next/link";

import { AlertTriangle, RefreshCw } from "lucide-react";

import { AmbientBackdrop } from "@/components";

const ErrorPage = () => {
  return (
    <main className="app-shell bg-grid-mesh no-scrollbar relative isolate min-h-screen overflow-x-hidden overflow-y-auto px-4 py-6 text-zinc-100 antialiased">
      <AmbientBackdrop />
      <div className="fixed inset-0 z-0 bg-obsidian-950/95 backdrop-blur-md" />
      <div className="relative z-10 flex min-h-[calc(100vh-3rem)] items-center justify-center">
        <section className="premium-panel glow-emerald flex w-full max-w-2xl flex-col gap-10 overflow-hidden rounded-[28px] p-8 sm:p-12">
          <div className="border-b border-white/4 pb-5">
            <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
              <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center">
                <div className="relative h-12 w-12 shrink-0">
                  <Image
                    alt="Capital Vantage logo"
                    className="scale-150 object-contain object-center"
                    src="/logo.png"
                    sizes="48px"
                    fill
                    priority
                  />
                </div>
                <div className="flex flex-col items-center sm:items-start">
                  <h2 className="text-sm font-bold uppercase tracking-[0.24em] text-emerald-400">
                    Capital Vantage
                  </h2>
                  <p className="font-mono text-[10px] tracking-wide uppercase text-zinc-500">
                    Application Status
                  </p>
                </div>
              </div>
              <div className="rounded-full border border-rose-500/20 bg-rose-500/10 px-3 py-1">
                <span className="text-[10px] font-bold tracking-[0.2em] text-rose-300 uppercase">
                  Startup Error
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="relative flex h-32 w-32 items-center justify-center">
              <div className="animate-spin-slow absolute inset-0 rounded-full border border-rose-500/18" />
              <div className="animate-pulse-fast absolute inset-4 rounded-full border border-red-500/14" />
              <div className="absolute inset-8 flex items-center justify-center rounded-full border border-white/6 bg-rose-500/8">
                <AlertTriangle className="h-10 w-10 text-rose-300" strokeWidth={1.8} />
              </div>
            </div>
            <div className="space-y-3">
              <h1 className="bg-linear-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-3xl font-black uppercase tracking-tight text-transparent">
                Unable to load workspace
              </h1>
              <p className="mx-auto max-w-xl text-sm leading-relaxed text-zinc-400">
                The application could not complete the initial configuration check. This usually
                means the configuration service is unavailable or the current session could not be
                resolved safely.
              </p>
            </div>
            <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">
              No workspace state was changed.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-lg bg-linear-to-r from-emerald-500 to-teal-600 px-5 text-[11px]
                font-medium tracking-wide text-black shadow-lg shadow-emerald-500/20 transition duration-200 hover:from-emerald-600 hover:to-teal-700
                active:scale-95"
              href="/"
            >
              <RefreshCw className="h-4 w-4" strokeWidth={2} />
              Retry Startup Check
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ErrorPage;
