# Dub — 15s product film

**Through-line object:** the blue click. It's one `blue-500` dot. In Dub's UI that blue is the colour of the checked switch and of Clicks data.

**Brand:** Satoshi, the only typeface (`apps/web/styles/Satoshi-Variable.woff2`). Black, white and neutrals; blue is used only on the dot and the key word "sale". The logo and wordmark paths are taken verbatim from `packages/ui/src/logo.tsx` and `wordmark.tsx`.

**Source of UI:** the link-builder modal, link cards and analytics tabs are rebuilt as live DOM/SVG layers, based on the open-source code at github.com/dubinc/dub. Demo data (acme.com, 248 clicks, 31 leads, $1,240) is illustrative workspace content, not a product claim.

120 BPM · 30 beats · 0.5 s per beat

| t (s) | beat | shot |
|---|---|---|
| 0.0 | 0 | "Which" and "link" rise through masks. The camera starts at 1.00 |
| 0.5 | 1 | "made" and "the" |
| 1.0 | 2 | **sale** (blue) and the "?" stem, which has no dot |
| 1.5 | 3 | The blue dot grows into the "?". The cursor enters |
| 2.0 | 4 HIT | The cursor clicks the dot. The words drop out through masks and the link builder blooms from the dot |
| 2.5 | 5 | Type `acme.com/pricing` |
| 3.0 | 6 | Type `launch` after `dub.sh`. The QR code wipes in |
| 3.5 | 7 | The camera glides to Conversion Tracking. The dot sits as the switch thumb |
| 4.0 | 8 | Click. The dot stretches into the checked blue switch and the white thumb slides |
| 4.5 | 9 | The camera moves to the footer |
| 5.0 | 10 | Click **Create link ⏎** |
| 5.5 | 11 | The modal collapses into the dot, which flies |
| 6.0 | 12 HIT | The links list opens from the dot. The dot becomes the new card's avatar and the card unfolds |
| 6.5 | 13 | `dub.sh/launch → acme.com/pricing` reveals. The click badge unfolds |
| 7.0 | 14 | The counter rolls from 0 to 96 |
| 7.5 | 15 | The counter reaches 248. Click the badge |
| 8.0 | 16 HIT | Analytics opens from the first data point. The dot is the pen that draws the line, and Clicks counts up |
| 8.5 | 17 | The line keeps drawing |
| 9.0 | 18 | The cursor grabs the dot and drags it back along the line. The tooltip scrubs the dates |
| 9.5 | 19 | The drag continues |
| 10.0 | 20 HIT | Click **Leads**. The dot leaps and becomes the tab underline, and the black Clicks underline drops away |
| 10.5 | 21 | Leads reaches 31 and the chart morphs to the leads curve |
| 11.0 | 22 | Click **Sales**. The underline springs across |
| 11.5 | 23 | The camera pushes in, the chart morphs to sales and the count rises |
| 12.0 | 24 BIGGEST | **$1,240** lands for `dub.sh/launch`, filling the frame. This answers the hook |
| 12.5 | 25 | The UI folds into the dot, which flies to the centre and grows |
| 13.0 | 26 HIT | The bowl punches out, the stem slot cuts and the mark turns from blue to black: the Dub logo |
| 13.5 | 27 | The mark slides left and the `dub` wordmark is masked in |
| 14.0 | 28 | "The link attribution platform." |
| 14.5 | 29 | The **Start for free at dub.co** pill unfolds |

**Camera:** each shot pushes ×1.04 and starts from the previous shot's end state. Moves use a critically damped glide, and blur follows camera speed and direction.

**Audio:** written in code with Web Audio (`tools/audio.html`). It has a kick on every beat, hits at 2, 6, 8, 10, 12 and 13 s, a riser into 12 s, cursor clicks and keystrokes.

## Build
```
node tools/audio.js ../out/soundtrack.wav
node tools/beats.js /tmp/beats          # one frame per beat, for review
node tools/render.js ../out/dub-film.mp4 ../out/soundtrack.wav
```
