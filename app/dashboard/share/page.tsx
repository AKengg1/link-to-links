import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import LinkQrCard from "@/components/LinkQRCard";

export default async function SharePage() {
  const { userId } = await auth.protect();

  const profile = await prisma.profile.findUnique({ where: { userId } });
  if (!profile) redirect("/dashboard");

  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = host?.includes("localhost") ? "http" : "https";
  const fullUrl = `${protocol}://${host}/${profile.username}`;

  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center bg-[#0B0714] px-6 py-16 text-white">
      <div className="w-full max-w-md">
        <Link
          href="/dashboard"
          className="mb-6 inline-block text-sm text-white/40 transition hover:text-white/70"
        >
          ← Back to dashboard
        </Link>

        <h1 className="mb-1 text-2xl font-bold">Your link is ready</h1>
        <p className="mb-6 text-sm text-white/50">
          Share the link, or let people scan the QR.
        </p>

        <LinkQrCard url={fullUrl} username={profile.username} />
      </div>
    </main>
  );
}