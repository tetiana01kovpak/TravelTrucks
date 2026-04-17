import Loader from '@/components/Loader/Loader';

export default function CamperDetailLoading() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '120px 0',
      }}
    >
      <Loader size="lg" />
    </div>
  );
}
