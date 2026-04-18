'use client';

import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import * as yup from 'yup';

import { postBooking } from '@/lib/api/campers';
import Loader from '@/components/Loader/Loader';
import styles from './BookingForm.module.css';

type BookingFormValues = {
  name: string;
  email: string;
};

const schema: yup.ObjectSchema<BookingFormValues> = yup.object({
  name: yup.string().trim().min(2, 'Please enter your name').required('Name is required'),
  email: yup
    .string()
    .trim()
    .email('Please enter a valid email')
    .required('Email is required'),
});

type BookingFormProps = {
  camperId: string;
  camperName: string;
};

export default function BookingForm({ camperId, camperName }: BookingFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({
    resolver: yupResolver(schema),
    defaultValues: { name: '', email: '' },
  });

  const mutation = useMutation({
    mutationFn: (values: BookingFormValues) =>
      postBooking(camperId, { name: values.name.trim(), email: values.email.trim() }),
    onSuccess: () => {
      toast.success(`Booking request sent for ${camperName}!`);
      reset();
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Could not send booking. Please try again.');
    },
  });

  const onSubmit: SubmitHandler<BookingFormValues> = (values) => {
    mutation.mutate(values);
  };

  const pending = isSubmitting || mutation.isPending;

  return (
    <section className={styles.card} aria-labelledby="booking-title">
      <header className={styles.header}>
        <h2 id="booking-title" className={styles.title}>
          Book your campervan now
        </h2>
        <p className={styles.subtitle}>
          Stay connected! We are always ready to help you.
        </p>
      </header>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={styles.field}>
          <label htmlFor="booking-name" className={styles.srOnly}>
            Name
          </label>
          <input
            id="booking-name"
            type="text"
            placeholder="Name*"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            className={styles.input}
            {...register('name')}
          />
          {errors.name && (
            <p className={styles.error} role="alert">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="booking-email" className={styles.srOnly}>
            Email
          </label>
          <input
            id="booking-email"
            type="email"
            placeholder="Email*"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            className={styles.input}
            {...register('email')}
          />
          {errors.email && (
            <p className={styles.error} role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        <button type="submit" className={styles.submit} disabled={pending}>
          {pending ? (
            <>
              <Loader size="sm" />
              <span>Sending…</span>
            </>
          ) : (
            'Send'
          )}
        </button>
      </form>
    </section>
  );
}
