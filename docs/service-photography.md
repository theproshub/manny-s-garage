# Service photography

The home page slideshow runs **five real photographs**, all Unsplash, served
from `public/hero/`:

| Slide | File | Photographer |
| --- | --- | --- |
| `brakes` | `auto-brake-suspension.webp` | Toby Hall |
| `diag` | `auto-engine-bay.webp` | Michael Lock |
| `bay` | `diy-garage-bay.webp` | Lorenzo Hamers |
| `furniture` | `handyman-furniture.webp` | Francesca Tosolini |
| `cameras` | `handyman-security-camera.webp` | Alexis Dreher |

They are 1024×682. The panel wants 1671×1044 at DPR 3, so they are soft on a
3× phone — see "Resolution". Replacing them with larger files is the first
improvement available here.

**Two gaps to close.** These frames are objects and rooms, not people at work,
which is a colder register than the site wants. And **I.T. has no photograph**:
the four trades are equal peers everywhere else on this site, and the slideshow
currently shows two Automotive, two Handyman, one DIY and no Tech help.

## The generated set was pulled

Fourteen generated photographs used to run here. They came out because several
betrayed themselves — see `references/generated-service-photos/` for the files
and the reasons, and "Queued for regeneration" below for the prompts that fix
them. The standing rule is in "House style": **check every label, screen,
keypad and printed surface at full resolution before shipping an image.** That
check is what the pulled set failed.

Do not use the seven `hero-*.webp` banners in `public/hero/`. They are AI
marketing collages with a cartoon mascot and service lists baked into the
pixels — text that no screen reader can read and no search engine can index.

## Where each one came from

**Generated** — Higgsfield `z_image` / Hugging Face Z-Image Turbo, thirteen of
the fourteen now in `references/generated-service-photos/`: `oil-change`,
`brakes`, `battery`, `check-engine`, `roadside`, `tv`, `furniture`, `blinds`,
`cameras`, `bay`, `wifi`, `computer`, `reports`.

The four Tech help frames were deliberately shot as one set: the same dark
navy work polo, the same warm neutral light, the subject and the object
clustered centrally so they survive the panel crop (see below). `website` is
the exception and is queued for regeneration.

**Photographed** — Unsplash, one remaining:

| Slide | Photographer | Unsplash ID |
| --- | --- | --- |
| `website` | Emmanuel Ikwuegbu (@emmages) | `FHIw9zOIHDY` |

The Unsplash licence does not require attribution; the photographer is recorded
because the credit is deserved and it keeps the set traceable.

## Queued for regeneration

Four files. The first three are live on the site right now and are the reason
this list exists: a visitor who looks closely can tell the pictures are
generated, which is the one thing the photography must not do.

Both generators were exhausted when this was written — Higgsfield was down to
0.15 credits and the Hugging Face ZeroGPU quota was at zero. The quotas reset
roughly every 24 hours. Prompts are written out below so the regeneration is a
single call each; generate at `1872x1248 ( 3:2 )`, 8 steps.

### `oil-change` — gibberish label, and the physics are wrong

The mechanic holds an oil bottle whose label is covered in invented
letterforms — a blue "ZΠOUZ" over paragraphs of fake text. He is also pouring
upward from beneath a lifted car, which is not how oil goes into an engine.
This is often the first slide a visitor sees.

The fix is to remove the bottle from the shot entirely. No label, no text to
get wrong:

> Medium documentary photograph of a Black auto mechanic with dark brown skin
> wearing navy blue coveralls, standing beneath a silver car raised on a
> two-post lift, loosening the sump plug with a wrench while dark engine oil
> drains in a steady stream into a wide metal drain pan, his face and both
> hands clustered in the centre of the frame, clean tidy workshop, natural
> light, shallow depth of field, muted warm neutral palette, no bottles, no
> labels, no text, no logos, no watermarks

### `check-engine` — gibberish screen and keypad

The scanner shows a paragraph of invented text over a meaningless line graph,
and every key on the keypad carries a nonsense glyph. Screens and keypads are
where this model fails hardest, so the fix is to keep both out of frame and
photograph the connection instead:

> Medium close-up documentary photograph of a Black automotive technician with
> dark brown skin wearing a navy blue work polo, crouched in the open driver's
> door of a car, plugging a diagnostic connector into the OBD port under the
> steering column, both hands and the connector clustered in the centre of the
> frame, natural light from the open door, shallow depth of field, muted warm
> neutral palette, no screens, no text, no logos, no watermarks

### `blinds` — the blind is not in the picture

Two men drill near a bare window. The alt text promises "fitting a window
blind" and there is no blind anywhere in the frame, so the picture describes a
service the slide is not selling:

> Medium documentary photograph of a Black handyman with dark brown skin
> wearing a grey work shirt, standing on a step stool fitting a white
> horizontal venetian blind into its bracket at the top of a window, the blind
> slats filling the upper centre of the frame and both hands on the headrail,
> bright living room, natural light, shallow depth of field, muted warm
> neutral palette, no text, no logos, no watermarks

### `website` — breaks the Tech help set

Still the Unsplash photograph. Darker, moodier and lamplit, with no navy polo;
put beside the other three Tech help frames it is the one that does not belong.

> Medium close-up documentary photograph of a Black web developer with dark
> brown skin wearing a dark navy work polo shirt, sitting close to a single
> monitor that shows a plain blank website layout of grey blocks, his face and
> the screen clustered tightly in the centre of the frame, small tidy office,
> natural light, shallow depth of field, muted warm neutral palette, no text,
> no logos, no watermarks

**Check every regenerated file for invented text before shipping it.** Crop
into any label, screen, keypad or printed surface at full resolution. That
check is what these four failed.

## Two things worth knowing before adding more

**Do not put "black" in an Unsplash query.** It is read as a colour, so
"black web developer coding" returns dark-background code screens and
"black business owner spreadsheet" returns grey desks. Search Afrocentric
photographers directly with the `user` parameter instead:

- `emmages` — Emmanuel Ikwuegbu, Nigeria. Warm, muted, real rooms, lamplight;
  the closest match to this project's look.
- `ninthgrid_` — Ninthgrid, Lagos, explicitly Afrocentric stock.
- `akt_`, `fasipe_tobi`, `supaslim` — Nigerian photographers, similar register.

**Unsplash has no Wi-Fi installation photograph with a dark-skinned subject.**
Six searches found nothing; every router picture in the library is a product
shot with no person in it. Three near-misses were downloaded and rejected — one
wore a Dior monogram polo positioned between the subject's face and the
laptop, so no crop could lose it; one had the phone barely visible with the
subject looking away from it; two were blank-screen mockups that render as a
white rectangle. `wifi` was generated instead.

## Composition: the panel is landscape 16:10

On desktop the picture panel is **≈557×348** at a 1440 viewport and **473×296**
at 1024 — landscape, aspect 16:10 — and `.slide-photo` is `object-fit: cover`.

This section previously said the panel was **327×352, taller than wide**, and
told you to check crops at `resize(218, 248)`. That stopped being true at
`28bebf6`, when the photograph was given its own grid cell: `.slide-figure` is
now `aspect-ratio: 16 / 10` and spans the full column. Anyone following the old
advice was composing for a portrait crop that no longer exists.

A 16:9 file loses ~10% of its width to the 16:10 crop; a 3:2 file loses ~7% of
its height and keeps its full width, which is why 3:2 is now the shape to
generate. Either way the subject should stay **clustered in the centre** —
that lesson still holds. It bit the first `wifi` generation, where a router on
the left edge was cropped away entirely and the slide stopped saying "Wi-Fi".

Check any new image at the real panel aspect before shipping:

```js
sharp(src).resize(557, 348, { fit: 'cover' })   // ≈ the desktop panel
```

## Resolution: 1600×900 is not enough

The files are 1600×900. Cropped to 16:10 that leaves **1440×900** usable, and
the panel needs **1671×1044** on a 3× phone — so the current set is short at
DPR 3.

Generate at **`1872x1248 ( 3:2 )`**, the largest 3:2 the Space offers. Cropped
to 16:10 that yields 1872×1170, which clears DPR 3 with room left.

Related: `sizes` on the `<Image>` is measured from the grid, not guessed. It
was `34vw` while the panel was really 46–48vw, so Chrome fetched the 750w
candidate for a 947-device-px slot and upscaled it 1.26×. If the hero grid
ratio changes, re-measure and update `sizes` with it.

## Generating

Higgsfield `z_image` at `16:9` works and is quick. Hugging Face
**Z-Image Turbo** (`gr1_z_image_turbo_generate`) at `2048x1152 ( 16:9 )`,
8 steps, produced the original ten. Both have daily quotas that reset roughly
every 24 hours; the Hugging Face ZeroGPU quota is **account-wide**, so no Space
routes around it once it is spent.

Keyless fallbacks were tried and rejected: **Pollinations** (only model is
`sana`, renders medium-brown skin however explicitly the prompt asks for dark
brown, drops named props, and requires sequential requests — three in parallel
returned 815-byte error bodies) and **Openverse** (keyless and works, but the
pool is amateur Flickr snapshots capped at 1024px).

`adobe-for-creativity` edits but does not generate. Canva is authenticated but
is not a photograph source: no stock-media search, and its generators emit
laid-out designs with text.

## House style

Every generation prompt ends with: *documentary photograph, natural light,
shallow depth of field, muted warm neutral palette, no text, no logos, no
watermarks*.

**Every person must have dark brown skin.** State it explicitly. Images have
been rejected rather than shipped for failing this.

**Show a professional at work.** Name the work clothes and ask for the face to
be visible; an early furniture image came back barefoot and in shorts, which
read as a hobbyist rather than someone you would hire.

**Check the hands.** Generated hands are the usual failure. Crop into them at
full resolution before shipping.

## Adding or replacing an image

1. `sharp(src).resize(1600, 900, { fit: 'cover' }).webp({ quality: 70 })`.
   Run `node` from the repo root — `sharp` will not resolve elsewhere.
2. Add `image` and `alt` to the matching entry in `service-slides.tsx`.
   `image` is optional, so a new service can ship before its picture exists.
3. Replacing a file in place keeps the same URL, so `next dev` serves a stale
   optimisation. Clear it with `rm -rf .next/cache/images` and hard-reload,
   or you will review the old picture.

**There is no over-image contrast check.** Since `28bebf6` the photograph has
its own grid cell and nothing is laid over it, so the copy sits on `--ink` at a
known luminance and a bright photograph cannot affect it. Measured: headline
18.04:1 light / 14.69:1 dark, body 15.28 / 11.90, the `where` line 9.72 / 6.25
— all clear of 4.5:1.
