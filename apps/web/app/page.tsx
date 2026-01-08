export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <main className="text-center space-y-6 p-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
          UI Platform
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
          Low-data, high-performance web platform designed for Africa.
        </p>
        <p className="text-sm text-muted-foreground">
          Built with Next.js • React • Tailwind CSS • shadcn/ui
        </p>
      </main>
    </div>
  );
}
