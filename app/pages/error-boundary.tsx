import { useRouteError } from "@remix-run/react";

export function GlobalErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  const err = useRouteError() as Error;
  console.error(err);
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="text-red-500">
        <h1>Something went wrong</h1>
        <p>{err?.message || (err as unknown as string)}</p>
      </div>
    </div>
  );
}
