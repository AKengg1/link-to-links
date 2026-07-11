import { SignInButton, SignUpButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-[#0B0714] text-white">
      {/* ambient glow blobs */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-72 w-72 rounded-full bg-[#7C3AED]/40 blur-[100px]" />
      <div className="pointer-events-none absolute top-1/3 -right-24 h-80 w-80 rounded-full bg-[#EC4899]/30 blur-[110px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-[#22D3EE]/20 blur-[100px]" />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-14 px-6 py-12 md:flex-row md:items-center md:justify-between md:gap-8 md:py-24">
        {/* Left: copy + CTAs */}
        <div className="flex max-w-xl flex-col items-center text-center md:items-start md:text-left">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#7C3AED]/40 bg-[#7C3AED]/10 px-4 py-1.5 text-xs font-medium tracking-wide text-[#C4B5FD]">
            ✦ your whole internet, one link
          </span>

          <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
            One{" "}
            <span className="bg-gradient-to-r from-[#7C3AED] via-[#EC4899] to-[#22D3EE] bg-clip-text text-transparent">
              LINK
            </span>{" "}
            to all socials
            <br />
            <span className="text-2xl font-semibold text-white/60 sm:text-3xl">
              (QR bhi hai 📱)
            </span>
          </h1>

          <p className="mt-5 text-base text-white/60 sm:text-lg">
            GitHub, LinkedIn, Twitter, Snapchat — drop them all in one bio
            page. Share the link, or just flash the QR.
          </p>

          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <SignUpButton forceRedirectUrl="/dashboard">
              <button className="h-12 rounded-full bg-gradient-to-right from-[#7C3AED] to-[#EC4899] px-7 text-sm font-semibold text-white shadow-[0_0_25px_-5px_#7C3AED] transition hover:opacity-90 sm:text-base cursor-pointer">
                Create my page — it's free
              </button>
            </SignUpButton>
            <SignInButton forceRedirectUrl="/dashboard">
              <button className="h-12 rounded-full border border-white/15 bg-white/5 px-7 text-sm font-semibold text-white/90 backdrop-blur transition hover:bg-white/10 sm:text-base cursor-pointer">
                Sign In
              </button>
            </SignInButton>
          </div>

          {/* icon strip */}
          <div className="mt-10 flex items-center gap-4">
            {["github", "linkedin", "twitter", "snapchat"].map((icon) => (
              <div
                key={icon}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2 backdrop-blur transition hover:-translate-y-1 hover:border-[#7C3AED]/50"
              >
                <Image
                  src={`/${icon}.png`}
                  alt={icon}
                  width={22}
                  height={22}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right: signature phone mockup */}
        <div className="relative flex-shrink-0">
          <div className="relative w-[260px] rotate-[4deg] rounded-[2.2rem] border border-white/10 bg-gradient-to-b from-[#181129] to-[#0B0714] p-4 shadow-2xl shadow-[#7C3AED]/20 sm:w-[280px]">
            {/* notch */}
            <div className="mx-auto mb-4 h-4 w-20 rounded-full bg-black/60" />

            {/* profile */}
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#EC4899]" />
              <p className="mt-3 text-sm font-semibold">@yourname</p>
              <p className="text-xs text-white/40">link in bio, literally</p>
            </div>

            {/* link pills */}
            <div className="mt-5 flex flex-col gap-2.5">
              {["GitHub", "LinkedIn", "Twitter / X", "Snapchat"].map((label) => (
                <div
                  key={label}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-center text-xs font-medium text-white/80"
                >
                  {label}
                </div>
              ))}
            </div>

            {/* QR corner badge */}
            <div className="absolute -bottom-5 -right-5 flex h-16 w-16 -rotate-[4deg] items-center justify-center rounded-2xl border border-white/10 bg-[#0B0714] p-2 shadow-lg">
              <div className="grid h-full w-full grid-cols-4 grid-rows-4 gap-[2px]">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-[1px] ${
                      [0, 1, 3, 5, 6, 9, 10, 12, 14, 15].includes(i)
                        ? "bg-white"
                        : "bg-transparent"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* floating badge */}
          <div className="absolute -top-6 -left-6 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-medium text-[#C4B5FD] backdrop-blur">
            ✓ live in 60s
          </div>
        </div>
      </div>
    </main>
  );
}