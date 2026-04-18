#!/bin/bash
# Crossfade the tail into the head so audio loop:true stitches seamlessly.
# Input:  public/audio/ambient-raw.wav (fal.ai output, not loopable)
# Output: public/audio/ambient.wav     (loopable, what the site plays)

set -euo pipefail

IN="public/audio/ambient-raw.wav"
OUT="public/audio/ambient.wav"

if [ ! -f "$IN" ]; then
  echo "Missing $IN — run scripts/generate-ambient.ts first." >&2
  exit 1
fi

# Crossfade duration (seconds). Long xfade = smoother loop, shorter body.
XFADE=10

# Total length from the input — used to compute trim window.
DURATION=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$IN" | cut -d. -f1)
BODY_END=$((DURATION - XFADE))
TAIL_START=$BODY_END

ffmpeg -y -i "$IN" \
  -filter_complex "[0]atrim=0:${BODY_END}[body];[0]atrim=${TAIL_START}:${DURATION}[tail];[tail][body]acrossfade=d=${XFADE}:c1=exp:c2=exp[out]" \
  -map "[out]" \
  -ac 2 -ar 44100 -acodec pcm_s16le \
  "$OUT"

echo "✓ $OUT ($(du -h "$OUT" | cut -f1))"
