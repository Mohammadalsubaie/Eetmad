'use client';

export default function Error({
  error: _error, // eslint-disable-line @typescript-eslint/no-unused-vars
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Error is available but not currently used in the UI
  // Can be used for logging or displaying error details in the future
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
