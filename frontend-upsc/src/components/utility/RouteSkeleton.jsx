export default function RouteSkeleton() {
  return (
    <div className="min-h-[60vh] w-full animate-pulse px-4 py-6 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl space-y-4">
        <div className="h-8 w-1/3 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="h-28 rounded-xl bg-gray-200 dark:bg-gray-700" />
          <div className="h-28 rounded-xl bg-gray-200 dark:bg-gray-700" />
          <div className="h-28 rounded-xl bg-gray-200 dark:bg-gray-700" />
        </div>
        <div className="h-64 rounded-xl bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>
  );
}
