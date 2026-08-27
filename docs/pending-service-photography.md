# Pending service photography

Three of the fourteen service slides have photographs. The remaining eleven are
listed below with the exact prompt and settings to generate them.

Blocked on 2026-08-27 by the image account's daily cap:
"You've reached the daily generation limit for your grace period."
Nothing was generated on the second attempt — 0 of 11 submitted.

## Settings

- model: `soul_2`
- aspect_ratio: `16:9`
- quality: 2k (model default)
- cost: ~0.12 credits each, ~1.3 credits for all eleven

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
| `brakes` | `public/services/brakes.webp` | A Black mechanic with dark brown skin in navy work overalls fitting a new brake pad into a brake caliper, car wheel removed and raised on a lift, clean modern repair bay |
| `battery` | `public/services/battery.webp` | A Black mechanic with dark brown skin in navy work overalls lowering a new car battery into an open engine bay, hood raised, clean repair shop |
| `roadside` | `public/services/roadside.webp` | A Black mechanic with dark brown skin in a work jacket clipping jumper cables onto a car battery at the roadside on an overcast day, a white service van parked behind |
| `tv` | `public/services/tv.webp` | A Black handyman with dark brown skin in a work shirt and tool belt mounting a large flat screen television onto a living room wall, holding a spirit level against the bracket |
| `furniture` | `public/services/furniture.webp` | A professional Black handyman with dark brown skin, in a work shirt, trousers and work boots, kneeling and assembling a flat pack wooden wardrobe in a living room, cordless drill in hand, full figure visible including face |
| `blinds` | `public/services/blinds.webp` | A Black handyman with dark brown skin in a work shirt fitting window blinds above a bright living room window, cordless drill raised |
| `bay` | `public/services/bay.webp` | A Black man with dark brown skin in casual clothes and gloves working on his own car raised on a two post hydraulic lift inside a clean rental garage bay, red tool trolley beside him |
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
