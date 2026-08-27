# Pending service photography

Ten of the fourteen service slides have photographs. Four remain, all in the
Tech help group.

Both image services were exhausted on 2026-08-27:

- Higgsfield: "You've reached the daily generation limit for your grace period."
- Hugging Face Z-Image Turbo: "You have exceeded your free ZeroGPU quota."

## Settings that worked

Hugging Face **Z-Image Turbo** (`gr1_z_image_turbo_generate`) produced better,
more consistent results than the alternative and is the tool to use:

- resolution: `2048x1152 ( 16:9 )`
- steps: `8`
- free ZeroGPU quota; HF PRO raises it to 25 min/day

No Adobe tooling is installed in this environment. Canva is available if a
different route is ever wanted.

## House style

Every prompt ends with: *documentary photograph, natural light, shallow depth
of field, muted warm neutral palette, no text, no logos, no watermarks* — so
the set reads as one shoot rather than eleven stock pictures.

**Every person must have dark brown skin.** State it explicitly in each prompt.
One earlier generation ignored a less direct instruction and returned
light-skinned hands; it was rejected rather than shipped.

**Show a professional at work.** An earlier furniture image came back barefoot,
in shorts, with the head cropped — it read as a hobbyist doing their own
flat-pack, not someone you would hire. Name the work clothes and ask for the
face to be visible.

## Outstanding slides

| Slide id | File to write | Prompt |
| --- | --- | --- |
| `wifi` | `public/services/wifi.webp` | A Black technician with dark brown skin setting up a Wi-Fi router on a shelf in a home office, laptop open on the desk nearby |
| `computer` | `public/services/computer.webp` | A Black computer technician with dark brown skin and dark brown hands repairing the inside of an opened laptop at a tidy workbench, small precision screwdriver in hand, face and upper body visible |
| `website` | `public/services/website.webp` | A Black web developer with dark brown skin working at a desk with two monitors showing a plain website layout, small office |
| `reports` | `public/services/reports.webp` | A Black small business owner with dark brown skin reviewing printed charts and a laptop spreadsheet at a desk in a small office |

## After generating

1. Optimise each: `sharp(src).resize(1600).webp({ quality: 70 })`. The three
   existing images went from ~2.8MB PNG to ~57KB WebP this way.
2. Add `image` and `alt` to the matching entry in
   `src/components/estimate/service-slides.tsx`. The field is already optional,
   so nothing else changes.
3. Re-run the over-image contrast check. The scrim currently measures a worst
   case of 6.48:1 at 1280 and 7.06:1 at 360; a brighter photograph could lower
   that, and 4.5:1 is the floor.
