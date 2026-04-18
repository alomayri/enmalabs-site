/**
 * Generate the ambient audio bed via fal.ai Stable Audio 2.5.
 *
 *   Usage: FAL_KEY=... npx tsx scripts/generate-ambient.ts
 *
 * Output: public/audio/ambient-raw.wav  (the model output, not yet looped)
 * Post-process: run `scripts/loopify-ambient.sh` to crossfade into
 * public/audio/ambient.wav which is what useAmbient.ts plays.
 */

import { fal } from "@fal-ai/client";
import { writeFileSync } from "fs";
import { join } from "path";

const PROMPT = [
  "Deep warm sub-bass drone sustain at 60Hz, single tonal center,",
  "slow breath-like amplitude swell every eight seconds,",
  "warm tape saturation, soft room reverb,",
  "no melody, no rhythm, no percussion,",
  "candlelit study room at night, intimate and still,",
  "Stars of the Lid, Brian Eno Ambient 1, Max Richter On the Nature of Daylight,",
  "analog warmth, fade-in opening",
].join(" ");

const SEED = Number(process.env.SEED ?? 42);
const OUT = join(process.cwd(), "public/audio/ambient-raw.wav");

async function main() {
  if (!process.env.FAL_KEY) {
    console.error("Missing FAL_KEY in env. Set it and retry.");
    process.exit(1);
  }

  console.log(`→ fal.ai stable-audio-25/text-to-audio · seed=${SEED}`);
  console.log(`  prompt: ${PROMPT.slice(0, 80)}...`);

  const result = await fal.subscribe("fal-ai/stable-audio-25/text-to-audio", {
    input: {
      prompt: PROMPT,
      seconds_total: 190,
      num_inference_steps: 8,
      guidance_scale: 1.5,
      seed: SEED,
    },
    logs: true,
    onQueueUpdate: (update) => {
      if (update.status === "IN_PROGRESS") {
        const last = update.logs?.at(-1)?.message;
        if (last) console.log(`  ${last}`);
      }
    },
  });

  const audioUrl = (result.data as { audio: { url: string } }).audio.url;
  console.log(`← download ${audioUrl.slice(0, 60)}...`);

  const res = await fetch(audioUrl);
  if (!res.ok) throw new Error(`fetch failed: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  writeFileSync(OUT, buf);

  console.log(`✓ saved ${OUT} (${(buf.length / 1024 / 1024).toFixed(2)} MB)`);
  console.log("Next: scripts/loopify-ambient.sh");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
