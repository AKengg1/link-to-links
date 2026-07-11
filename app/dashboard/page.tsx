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
    <main className="min-h-[calc(100vh-4rem)] bg-[#0B0714] px-6 py-10 text-white">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
          <div>
            <h1 className="text-xl font-bold">Your Dashboard</h1>
            <p className="text-sm text-white/50">Manage your link-in-bio page</p>
          </div>
          <UserButton/>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <UsernameSetup currentUsername={profile?.username ?? null} />

          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
            {profile?.username ? (
              <>
                <p className="text-sm text-white/50">
                  Ready to share your page?
                </p>
                <Link
                  href="/dashboard/share"
                  className="h-10 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] px-6 text-sm font-semibold leading-10 text-white transition hover:opacity-90"
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