# Archivo, vendored for Open Graph rendering

Three static instances of Archivo, used only by the `opengraph-image` routes.

| File | Instance | Stands in for |
| --- | --- | --- |
| `archivo-press.ttf` | Condensed (wdth 75), weight 800 | the `.press` layer |
| `archivo-label.ttf` | SemiCondensed (wdth 87.5), weight 600 | `.field-label`, `.figure` |
| `archivo-body.ttf` | Normal (wdth 100), weight 400 | body copy |

## Why these are files and not a fetch

Satori — the renderer behind `next/og`'s `ImageResponse` — cannot read WOFF2,
so the woff2 files `next/font/google` already caches are unusable here, and it
does not interpolate variable axes: each width/weight has to arrive as its own
static TTF. Fetching them from Google Fonts inside the route would put a
network call on the critical path of every build. Vendored, the cards render
offline and cannot break because a font CDN had a bad day.

`.press` is set at `font-stretch: 58%` on the site. Google Fonts only serves
named instances, and the narrowest is Condensed at 75. The cards therefore run
marginally wider than the page — which is the right trade at share-card sizes,
where the text is often read as a thumbnail.

## Licence

Archivo is by Omnibus-Type, licensed under the SIL Open Font License 1.1.
Vendoring and redistribution are permitted; the font is not sold on its own and
is not renamed. Full text: https://openfontlicense.org
Source: https://fonts.google.com/specimen/Archivo
