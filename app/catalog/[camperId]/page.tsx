import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import axios from 'axios';

import Gallery from '@/components/Gallery/Gallery';
import RatingInline from '@/components/RatingInline/RatingInline';
import FeatureBadges from '@/components/FeatureBadges/FeatureBadges';
import SpecTable from '@/components/SpecTable/SpecTable';
import ReviewsList from '@/components/ReviewsList/ReviewsList';
import BookingForm from '@/components/BookingForm/BookingForm';
import { fetchCamperById, fetchCamperReviews } from '@/lib/api/campers';
import { formatPrice } from '@/lib/format/price';
import styles from './page.module.css';

type DetailPageProps = {
  params: Promise<{ camperId: string }>;
};

function isNotFound(error: unknown): boolean {
  return axios.isAxiosError(error) && error.response?.status === 404;
}

export async function generateMetadata({
  params,
}: DetailPageProps): Promise<Metadata> {
  const { camperId } = await params;
  try {
    const camper = await fetchCamperById(camperId);
    const description = camper.description
      ? camper.description.slice(0, 160)
      : `Rent ${camper.name} — ${camper.form.replace('_', ' ')} camper in ${camper.location}.`;

    return {
      title: camper.name,
      description,
      openGraph: {
        title: camper.name,
        description,
        images: camper.gallery?.[0]?.original
          ? [camper.gallery[0].original]
          : camper.coverImage
            ? [camper.coverImage]
            : [],
      },
    };
  } catch {
    return { title: 'Camper not found' };
  }
}

export default async function CamperDetailPage({ params }: DetailPageProps) {
  const { camperId } = await params;

  let camper;
  let reviews;
  try {
    [camper, reviews] = await Promise.all([
      fetchCamperById(camperId),
      fetchCamperReviews(camperId),
    ]);
  } catch (error) {
    if (isNotFound(error)) notFound();
    throw error;
  }

  return (
    <article className={styles.article}>
      <section className={styles.top}>
        <div className={styles.galleryCol}>
          <Gallery gallery={camper.gallery} alt={camper.name} />
        </div>

        <div className={styles.infoCol}>
          <div className={styles.card}>
            <header className={styles.head}>
              <h1 className={styles.title}>{camper.name}</h1>
              <RatingInline
                rating={camper.rating}
                totalReviews={camper.totalReviews}
                location={camper.location}
              />
              <p className={styles.price}>{formatPrice(camper.price)}</p>
            </header>
            {camper.description && (
              <p className={styles.description}>{camper.description}</p>
            )}
          </div>

          <div className={styles.card}>
            <h2 className={styles.blockTitle}>Vehicle details</h2>
            <FeatureBadges camper={camper} showIcons={false} />
            <div className={styles.spec}>
              <SpecTable camper={camper} />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.bottom}>
        <div className={styles.reviewsBlock}>
          <h2 className={styles.blockTitle}>Reviews</h2>
          <ReviewsList reviews={reviews} />
        </div>
        <div className={styles.bookingBlock}>
          <BookingForm camperId={camper.id} camperName={camper.name} />
        </div>
      </section>
    </article>
  );
}
