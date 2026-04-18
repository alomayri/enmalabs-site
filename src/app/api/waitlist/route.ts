import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  const { email } = (await req.json().catch(() => ({}))) as { email?: string };

  if (!email || !EMAIL_RE.test(email) || email.length > 160) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  const loopsKey = process.env.LOOPS_API_KEY;

  if (!loopsKey) {
    console.log(`[waitlist:dev] ${email}`);
    return NextResponse.json({ ok: true, mode: "dev-log" }, { status: 200 });
  }

  const res = await fetch("https://app.loops.so/api/v1/contacts/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${loopsKey}`,
    },
    body: JSON.stringify({
      email,
      source: "enmalabs.com/waitlist",
      userGroup: "Waitlist",
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error(`[waitlist] Loops error ${res.status}: ${text}`);
    return NextResponse.json(
      { error: "Could not save your email. Try again shortly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
