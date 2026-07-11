"use client";

import { useState, useTransition } from "react";
import { setUsername } from "@/app/actions/profile";

export default function UsernameSetup({
  currentUsername,
}: {
  currentUsername: string | null;
}) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    setError(null);
    const result = await setUsername(formData);
    if (result?.error) {
      setError(result.error);
    } else {
      startTransition(() => window.location.reload());
    }
  }

  return (
    <form
      action={handleSubmit}
      className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5"
    >
      <h2 className="text-sm font-semibold text-white/70">
        {currentUsername ? "Change your link" : "Claim your public link"}
      </h2>

      <div className="flex flex-wrap items-center gap-y-1 overflow-hidden rounded-lg border border-white/10 bg-white/5 sm:flex-nowrap">
        <span className="pl-3 py-2 text-xs text-white/40 sm:py-0 sm:text-sm">
          link-to-links.vercel.app/
        </span>
        <input
          name="username"
          defaultValue={currentUsername ?? ""}
          placeholder="yourname"
          required
          minLength={3}
          maxLength={20}
          pattern="[a-z0-9_-]+"
          className="h-11 min-w-0 flex-1 bg-transparent px-3 text-base outline-none sm:h-10 sm:px-1 sm:text-sm"
        />
      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="h-11 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50 active:scale-[0.98] sm:h-10"
      >
        {isPending ? "Saving..." : currentUsername ? "Update" : "Claim link"}
      </button>
    </form>
  );
}