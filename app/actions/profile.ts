"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const RESERVED = ["dashboard", "sign-in", "sign-up", "api", "admin", "settings"];
const USERNAME_REGEX = /^[a-z0-9_-]{3,20}$/;

export async function getProfile() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  return prisma.profile.findUnique({ where: { userId } });
}

export async function setUsername(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const raw = (formData.get("username") as string) || "";
  const username = raw.trim().toLowerCase();

  if (!USERNAME_REGEX.test(username)) {
    return { error: "3-20 chars, lowercase letters, numbers, - or _ only" };
  }
  if (RESERVED.includes(username)) {
    return { error: "That username is reserved" };
  }

  const existing = await prisma.profile.findUnique({ where: { username } });
  if (existing && existing.userId !== userId) {
    return { error: "Username already taken" };
  }

  await prisma.profile.upsert({
    where: { userId },
    update: { username },
    create: { userId, username },
  });

  revalidatePath("/dashboard");
  return { error: null };
}