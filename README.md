# TravelTrucks

A modern web application for browsing and booking camper rentals. Built with Next.js App Router and TypeScript, consuming the public `campers-api.goit.study` backend.

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

- [Next.js 15] (App Router, React Server Components)
- [TypeScript]
- [TanStack Query v5] — infinite queries + server-side prefetch / hydration
- [axios] — HTTP client
- [react-hook-form]
  [yup] — booking form state & validation
- [swiper] — image gallery with thumbnails
- [react-hot-toast] — notifications
- [react-icons] — icon set
- CSS Modules — scoped styling, no framework

## Getting started

Prerequisites: Node.js 20+ and npm.

# Install dependencies

npm install

# Configure environment

cp .env.example .env.local

# Start the dev server

npm run dev

Open http://localhost:3000.

## Environment variables

NEXT_PUBLIC_API_BASE_URL=https://campers-api.goit.study

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

Created by Tetiana Kovpak
