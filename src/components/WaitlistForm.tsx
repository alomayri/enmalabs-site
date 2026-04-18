"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong.");
        return;
      }
      setStatus("success");
      setMessage("You're on the list. We'll be in touch.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Network error. Try again.");
    }
  }

  const disabled = status === "loading" || status === "success";

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-xl flex-col gap-3">
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor="waitlist-email" className="sr-only">
          Email address
        </label>
        <input
          id="waitlist-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@domain.com"
          disabled={disabled}
          className="flex-1 rounded-full border border-rule bg-ink/60 px-5 py-3 text-base text-paper placeholder:text-whisper backdrop-blur-xl focus:border-violet-soft focus:bg-mist-soft focus:outline-none disabled:opacity-60 transition"
        />
        <button
          type="submit"
          disabled={disabled}
          className="rounded-full bg-violet px-6 py-3 text-base font-medium text-paper shadow-[0_8px_32px_rgba(212,145,61,0.45)] transition hover:brightness-110 disabled:opacity-60"
        >
          {status === "loading" ? "Joining…" : status === "success" ? "Joined" : "Join"}
        </button>
      </div>
      {message && (
        <p
          className={`text-sm ${status === "error" ? "text-ember" : "text-glow"}`}
          role={status === "error" ? "alert" : "status"}
        >
          {message}
        </p>
      )}
      <p className="text-xs text-whisper">
        Occasional letters when we ship something. No noise, unsubscribe in one click.
      </p>
    </form>
  );
}
