# Mountain — agency website

Bilingual (English / Arabic, full RTL) dark-only marketing site for a Cairo digital agency.
Next.js 16 App Router · Tailwind CSS v4 · shadcn/ui · Framer Motion · React Three Fiber · next-intl.

## Run

```bash
npm install
cp .env.example .env.local   # optional, for contact form email
npm run dev
```

`/` redirects to `/en` or `/ar` based on the browser language (or the `NEXT_LOCALE` cookie).

## Where things live

| What | Where |
| --- | --- |
| All page copy (EN / AR) | `messages/en.json`, `messages/ar.json` |
| Phones, email, WhatsApp, client ticker names | `src/content/site.ts` |
| Services list and icons | `src/content/services.ts` |
| Portfolio projects | `src/content/work.ts` |
| Colours, fonts, dark theme | `src/app/globals.css` (`--brand` is the accent) |
| 3D hero object | `src/components/three/hero-scene.tsx` |
| Contact form handler | `src/app/[locale]/contact/actions.ts` |

## Before launch

- Replace the **placeholder** client names (`src/content/site.ts`) and portfolio projects
  (`src/content/work.ts` + `Work.projects` in messages).
- Replace the **placeholder** images in `public/work/<project-id>/`. Each project lists its images in
  `images` (cover first): one image gives a single card; two or more give a stacked card with hover
  scrubbing and a swipeable lightbox. Any size or format (jpg, png, webp, avif) works.
- Set `RESEND_API_KEY` and a verified `CONTACT_FROM` sender so contact form leads are emailed.
# mountain-web
