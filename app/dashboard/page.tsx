import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { getLinks } from "@/app/actions/links";
import { getProfile } from "@/app/actions/profile";
import DashboardClient from "@/components/DashboardClient";
import UsernameSetup from "@/components/UsernameSetup";

export default async function Dashboard() {
  await auth.protect();

  const [links, profile] = await Promise.all([getLinks(), getProfile()]);

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-[#0B0714] px-4 py-6 text-white sm:px-6 sm:py-10">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur sm:p-5">
          <div className="min-w-0">
            <h1 className="truncate text-lg font-bold sm:text-xl">Your Dashboard</h1>
            <p className="truncate text-xs text-white/50 sm:text-sm">
              Manage your link-in-bio page
            </p>
          </div>
          <UserButton />
        </div>

        <div className="mt-4 grid gap-4 sm:mt-6 sm:gap-6 sm:grid-cols-2">
          <UsernameSetup currentUsername={profile?.username ?? null} />

          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-center sm:p-5">
            {profile?.username ? (
              <>
                <p className="text-sm text-white/50">
                  Ready to share your page?
                </p>
                <Link
                  href="/dashboard/share"
                  className="flex h-11 items-center rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] px-6 text-sm font-semibold text-white transition hover:opacity-90 active:scale-[0.98] sm:h-10"
                >
                  Generate link & QR
                </Link>
              </>
            ) : (
              <p className="text-sm text-white/40">
                Claim your username first to generate a link.
              </p>
            )}
          </div>
        </div>

        <DashboardClient initialLinks={links} />
      </div>
    </main>
  );
}