import { GlobalErrorBoundary } from "~/pages/error-boundary";

export default function TestErrorBoundary() {
  if (1 > 0) throw new Error("This is a test error");
  return (
    <div>
      <h1>Test Error Boundary</h1>
      <p>This is a test error boundary</p>
    </div>
  );
}

export const ErrorBoundary = GlobalErrorBoundary;
