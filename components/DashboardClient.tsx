"use client";

import { useState, useTransition } from "react";
import { createLink, deleteLink } from "@/app/actions/links";

type Link = {
  id: string;
  title: string;
  url: string;
  platform: string;
};

const PLATFORMS = ["instagram", "linkedin", "twitter", "snapchat", "facebook", "youtube", "github","pinterest", "custom"];

export default function DashboardClient({
  initialLinks,
}: {
  initialLinks: Link[];
}) {
  const [links, setLinks] = useState(initialLinks);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    await createLink(formData);
    startTransition(() => {
      window.location.reload();
    });
  }

  async function handleDelete(id: string) {
    setLinks((prev) => prev.filter((l) => l.id !== id));
    await deleteLink(id);
  }

  return (
    <div className="mt-4 grid gap-4 px-4 sm:mt-6 sm:gap-6 sm:px-0 sm:grid-cols-2">
      <form
        action={handleSubmit}
        className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5"
      >
        <h2 className="text-sm font-semibold text-white/70">Add a link</h2>
        <input
          name="title"
          placeholder="Title (e.g. My GitHub)"
          required
          className="h-11 sm:h-10 rounded-lg border border-white/10 bg-white/5 px-3 text-base sm:text-sm outline-none focus:border-[#7C3AED]/60"
        />
        <input
          name="url"
          type="url"
          placeholder="https://..."
          required
          className="h-11 sm:h-10 rounded-lg border border-white/10 bg-white/5 px-3 text-base sm:text-sm outline-none focus:border-[#7C3AED]/60"
        />
        <select
          name="platform"
          required
          className="h-11 sm:h-10 rounded-lg border border-white/10 bg-white/5 px-3 text-base sm:text-sm outline-none focus:border-[#7C3AED]/60"
        >
          {PLATFORMS.map((p) => (
            <option key={p} value={p} className="bg-[#0B0714]">
              {p}
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={isPending}
          className="mt-1 h-11 sm:h-10 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50 active:scale-[0.98]"
        >
          {isPending ? "Adding..." : "Add link"}
        </button>
      </form>

      <div className="flex flex-col gap-2.5 rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
        <h2 className="mb-1 text-sm font-semibold text-white/70">
          Your links ({links.length})
        </h2>
        {links.length === 0 && (
          <p className="text-sm text-white/40">No links yet — add one.</p>
        )}
        {links.map((link) => (
          <div
            key={link.id}
            className="flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 sm:px-4"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{link.title}</p>
              <p className="truncate text-xs text-white/40">{link.url}</p>
            </div>
            <button
              onClick={() => handleDelete(link.id)}
              className="shrink-0 whitespace-nowrap text-xs font-medium text-white/40 transition hover:text-[#EC4899] active:text-[#EC4899]"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}