// The 3AM Fridge Text — make.fun entry.
//
// The program writes one short funny line to $MAKEFUN_OUTPUT_DIR/entry.txt:
// the text someone sends at 3AM after getting caught by their own fridge.
//
// The line is fixed and deterministic: the same bytes on every run, no clock,
// no randomness, no network, no environment input. Verified 25 Nov 2026:
// 144 characters (145 with the trailing newline), two runs byte-identical.
// The gate allows 1-200 characters, so the entry is valid however the scorer
// counts the newline.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The joke: a 3AM fridge raid told like a police report. The fridge light is
// the interrogation lamp, the snacker is a raccoon caught at the scene, and
// the punchline is the apology — not to a person, but to the leftovers,
// for eating their friend. One image, one twist, no setup that overstays.
const LINE =
  "3am. I opened the fridge for water and stood in its light like a raccoon at a crime scene, apologizing to the leftovers for eating their friend.";

function main(): void {
  // The gate counts characters, so guard the length with room to spare.
  if (LINE.length < 1 || LINE.length > 195) {
    throw new Error(`line is ${LINE.length} characters, outside the 1-195 band`);
  }
  if (LINE.includes("\n")) {
    throw new Error("line must be a single line");
  }
  if (LINE.trim().length === 0) {
    throw new Error("line must not be only whitespace");
  }

  const outputDir = process.env.MAKEFUN_OUTPUT_DIR?.trim() || "/output";
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, "entry.txt"), LINE + "\n", "utf8");
}

main();
