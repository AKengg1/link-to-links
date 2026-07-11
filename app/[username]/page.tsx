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
            className="group relative flex items-center gap-4 rounded-xl bg-gradient-to-r from-[#7953bb] to-[#76033d93] p-[2px]"
          >
            <div className="flex w-full items-center gap-4 rounded-[10px] bg-[#0B0714]/80 px-5 py-4 text-base font-medium transition group-hover:bg-[#0B0714]">
              {["github", "linkedin", "twitter", "snapchat","instagram", "facebook", "youtube", "tiktok", "pinterest", "custom"].includes(link.platform) && (
                <Image
                  src={`/${link.platform}.png`}
                  alt={link.platform}
                  width={32}
                  height={32}
                />
              )}
              {link.title}
            </div>
          </a>
        ))}
        {links.length === 0 && (
          <p className="text-center text-sm text-white/30">No links yet.</p>
        )}
      </div>

      <p className="mt-10 text-sm text-blue-900">Nice to meet u 🥰</p>
    </main>
  );
}