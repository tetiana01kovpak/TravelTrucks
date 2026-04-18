# TravelTrucks

A modern web application for browsing and booking camper rentals. Built with Next.js App Router and TypeScript, consuming the public `campers-api.goit.study` backend.

## Features

- **Home** (`/`) — hero banner with a call to action leading to the catalog.
- **Catalog** (`/catalog`) — backend-filtered list of campers with URL-driven filters (location, vehicle type, engine, transmission) and "Load more" pagination powered by TanStack Query's `useInfiniteQuery`.
- **Camper detail** (`/catalog/[camperId]`) — opens in a new tab from the catalog cards. Shows a Swiper thumbs gallery, vehicle specs, amenities, user reviews, and a booking form with client-side validation and success/error toast notifications.

## Tech Stack

| Tool                                                                                    | Purpose                                           |
| --------------------------------------------------------------------------------------- | ------------------------------------------------- |
| [Next.js 15](https://nextjs.org/)                                                       | App Router, React Server Components               |
| [TypeScript](https://www.typescriptlang.org/)                                           | Type safety                                       |
| [TanStack Query v5](https://tanstack.com/query/latest)                                  | Infinite queries + server-side prefetch/hydration |
| [Axios](https://axios-http.com/)                                                        | HTTP client                                       |
| [React Hook Form](https://react-hook-form.com/) + [Yup](https://github.com/jquense/yup) | Booking form state & validation                   |
| [Swiper](https://swiperjs.com/)                                                         | Image gallery with thumbnails                     |
| [React Hot Toast](https://react-hot-toast.com/)                                         | Notifications                                     |
| [React Icons](https://react-icons.github.io/react-icons/)                               | Icon set                                          |
| CSS Modules                                                                             | Scoped styling, no framework                      |

## Getting Started

**Prerequisites:** Node.js 20+ and npm.

```bash
# Install dependencies
npm install

# Configure environment
cp .env.example .env.local

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

```env
NEXT_PUBLIC_API_BASE_URL=https://campers-api.goit.study
```

## Deploying to Vercel

1. Push the repo to GitHub.
2. Import the project at [vercel.com/new](https://vercel.com/new). Next.js is detected automatically — no build override needed.
3. In **Project Settings → Environment Variables**, add `NEXT_PUBLIC_API_BASE_URL=https://campers-api.goit.study` for _Production_, _Preview_, and _Development_.
4. Deploy. Once you have the production URL, update `metadataBase` in `app/layout.tsx` so Open Graph URLs resolve correctly.

## API Reference

All backend traffic goes to `https://campers-api.goit.study`.  
Swagger docs: [https://campers-api.goit.study/docs](https://campers-api.goit.study/docs)

| Method | Endpoint                                                        | Description    |
| ------ | --------------------------------------------------------------- | -------------- |
| `GET`  | `/campers?page=&perPage=&location=&form=&transmission=&engine=` | List campers   |
| `GET`  | `/campers/{camperId}`                                           | Camper detail  |
| `GET`  | `/campers/{camperId}/reviews`                                   | Camper reviews |
| `POST` | `/campers/{camperId}/booking-requests`                          | Create booking |

## Author

Created by **Tetiana Kovpak**
