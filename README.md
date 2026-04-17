# TravelTrucks

Frontend for a campervan rental service. Built with Next.js App Router and
TypeScript, consuming the public `campers-api.goit.study` backend.

## Features

- **Home** (`/`) — hero banner with a call to action leading to the catalog.
- **Catalog** (`/catalog`) — backend-filtered list of campers with URL-driven
  filters (location, vehicle type, engine, transmission) and "Load more"
  pagination powered by TanStack Query's `useInfiniteQuery`.
- **Camper detail** (`/catalog/[camperId]`) — opens in a new tab from the
  catalog cards. Shows a Swiper thumbs gallery, vehicle specs, amenities,
  user reviews, and a booking form with client-side validation and
  success/error toast notifications.

## Tech stack

- [Next.js 15](https://nextjs.org/) (App Router, React Server Components)
- [TypeScript](https://www.typescriptlang.org/)
- [TanStack Query v5](https://tanstack.com/query) — infinite queries +
  server-side prefetch / hydration
- [axios](https://axios-http.com/) — HTTP client
- [react-hook-form](https://react-hook-form.com/) +
  [yup](https://github.com/jquense/yup) — booking form state & validation
- [swiper](https://swiperjs.com/) — image gallery with thumbnails
- [react-hot-toast](https://react-hot-toast.com/) — notifications
- [react-icons](https://react-icons.github.io/react-icons/) — icon set
- CSS Modules — scoped styling, no framework

## Project structure

```
app/                  # App Router routes
  layout.tsx          # root layout, fonts, Providers, Toaster
  page.tsx            # Home
  providers.tsx       # QueryClientProvider
  catalog/
    page.tsx          # Catalog shell (RSC) with server prefetch
    CatalogView.tsx   # client view using useInfiniteQuery
    [camperId]/
      page.tsx        # Detail (RSC) + generateMetadata
components/           # UI components (each with its CSS module)
hooks/                # useFilterForm, useCampersInfinite
lib/
  api/                # axios client + campers endpoints
  filters/            # filter schema + URL serialization
  format/             # helpers (price formatting)
  query/              # query keys + per-request QueryClient
styles/               # shared tokens
types/                # shared TypeScript types
public/               # static assets
```

## Getting started

Prerequisites: Node.js 20+ and npm.

```bash
# Clone
git clone <repo-url>
cd TravelTrucks

# Install dependencies
npm install

# Configure environment
cp .env.example .env.local
# (edit .env.local if you want to point at a different backend)

# Start the dev server
npm run dev
```

Open http://localhost:3000.

## Environment variables

| Name | Required | Default (in `.env.example`) |
| --- | --- | --- |
| `NEXT_PUBLIC_API_BASE_URL` | yes | `https://campers-api.goit.study` |

`NEXT_PUBLIC_API_BASE_URL` is read by `lib/api/client.ts`. The app throws at
startup if it's not set.

## Scripts

```bash
npm run dev        # local dev server with HMR
npm run build      # production build
npm run start      # run the built app
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
```

## Deploying to Vercel

1. Push the repo to GitHub.
2. Import the project at [vercel.com/new](https://vercel.com/new). Next.js is
   detected automatically; no build override is needed.
3. In **Project Settings → Environment Variables**, add
   `NEXT_PUBLIC_API_BASE_URL=https://campers-api.goit.study` for
   _Production_, _Preview_, and _Development_.
4. Deploy. Once you have the production URL, update `metadataBase` in
   `app/layout.tsx` so Open Graph URLs resolve correctly.

## API reference

All backend traffic goes to `https://campers-api.goit.study`. Swagger docs:
https://campers-api.goit.study/docs.

Endpoints used:

- `GET /campers?page=&perPage=&location=&form=&transmission=&engine=` — list
- `GET /campers/{camperId}` — detail
- `GET /campers/{camperId}/reviews` — reviews
- `POST /campers/{camperId}/booking-requests` — create booking

## Author

Created by Tetiana as part of the Go-IT frontend course.
