"use client";

import { useState } from "react";
import { controls, cx } from "@/lib/design-system";

type Status = "idle" | "loading" | "success" | "error";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");
  const statusId = "waitlist-status";
  const noteId = "waitlist-note";

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
      setMessage("You're on the Balsam list. I'll write when the beta is ready.");
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
          aria-invalid={status === "error"}
          aria-describedby={message ? `${noteId} ${statusId}` : noteId}
          className={controls.input}
        />
        <button
          type="submit"
          disabled={disabled}
          className={controls.primaryButton}
        >
          {status === "loading" ? "Joining..." : status === "success" ? "Joined" : "Join for beta"}
        </button>
      </div>
      {message && (
        <p
          id={statusId}
          className={cx("text-sm", status === "error" ? "text-ember" : "text-glow")}
          role={status === "error" ? "alert" : "status"}
        >
          {message}
        </p>
      )}
      <p id={noteId} className="text-xs text-whisper">
        Balsam beta first. Rare notes from the lab after that. No noise.
      </p>
    </form>
  );
}
