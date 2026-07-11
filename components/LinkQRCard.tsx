"use client";

import { useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function LinkQrCard({
  url,
  username,
}: {
  url: string;
  username: string;
}) {
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  async function handleCopy() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function handleDownload() {
    const canvas = canvasRef.current?.querySelector("canvas");
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = `${username}-qr.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 sm:flex-row sm:items-center">
      <div ref={canvasRef} className="flex-shrink-0 rounded-xl bg-white p-3">
        <QRCodeCanvas value={url} size={120} level="M" />
      </div>

      <div className="flex w-full min-w-0 flex-col gap-2">
        <p className="text-sm font-semibold text-white/70">Your live link</p>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="truncate text-sm font-medium text-[#C4B5FD] hover:underline"
        >
          {url.replace(/^https?:\/\//, "")}
        </a>

        <div className="mt-1 flex gap-2">
          <button
            onClick={handleCopy}
            className="h-9 flex-1 rounded-full border border-white/15 bg-white/5 text-xs font-semibold text-white/90 transition hover:bg-white/10"
          >
            {copied ? "Copied!" : "Copy link"}
          </button>
          <button
            onClick={handleDownload}
            className="h-9 flex-1 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-xs font-semibold text-white transition hover:opacity-90"
          >
            Download QR
          </button>
        </div>
      </div>
    </div>
  );
}