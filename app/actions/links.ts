"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getLinks() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  return prisma.link.findMany({
    where: { userId },
    orderBy: { order: "asc" },
  });
}

export async function createLink(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const title = formData.get("title") as string;
  const url = formData.get("url") as string;
  const platform = formData.get("platform") as string;

  if (!title || !url || !platform) throw new Error("Missing fields");

  const count = await prisma.link.count({ where: { userId } });

  await prisma.link.create({
    data: { userId, title, url, platform, order: count },
  });

  revalidatePath("/dashboard");
}

export async function deleteLink(id: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  await prisma.link.delete({
    where: { id, userId }, // scoped so users can't delete others' links
  });

  revalidatePath("/dashboard");
}