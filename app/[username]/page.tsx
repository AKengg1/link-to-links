import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { clerkClient } from "@clerk/nextjs/server";
import Image from "next/image";

export default async function PublicProfile({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const profile = await prisma.profile.findUnique({ where: { username } });
  if (!profile) notFound();

  const [links, client] = await Promise.all([
    prisma.link.findMany({
      where: { userId: profile.userId },
      orderBy: { order: "asc" },
    }),
    clerkClient(),
  ]);

  const user = await client.users.getUser(profile.userId);

  return (
    <main className="flex min-h-screen flex-col items-center bg-[#0B0714] px-6 py-16 text-white">
      <div className="h-16 w-16 overflow-hidden rounded-full bg-gradient-to-br from-[#7C3AED] to-[#EC4899]">
        <Image
          src={user.imageUrl}
          alt={profile.username}
          width={64}
          height={64}
          className="h-full w-full object-cover"
        />
      </div>
      <h1 className="mt-4 text-lg font-semibold">@{profile.username}</h1>
      {profile.bio && (
        <p className="mt-1 max-w-xs text-center text-sm text-white/50">
          {profile.bio}
        </p>
      )}

      <div className="mt-8 flex w-full max-w-sm flex-col gap-3">
        {links.map((link) => (
          
           <a key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium transition hover:border-[#7C3AED]/50 hover:bg-white/10"
          >
            {["github", "linkedin", "twitter", "snapchat","instagram", "facebook", "youtube", "pinterest", "custom"].includes(link.platform) && (
              <Image
                src={`/${link.platform}.png`}
                alt={link.platform}
                width={20}
                height={20}
              />
            )}
            {link.title}
          </a>
        ))}
        {links.length === 0 && (
          <p className="text-center text-sm text-white/30">No links yet.</p>
        )}
      </div>
    </main>
  );
}