import Link from "next/link";

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b border-brand-neutral bg-background py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
          <Link
            href="/"
            className="text-sm text-brand-primary hover:underline"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <iframe
          src="https://lookerstudio.google.com/embed/reporting/ba1d1d33-9b0e-467b-8a44-53c8f6deab44"
          className="w-full h-full min-h-[calc(100vh-80px)]"
          frameBorder="0"
          allowFullScreen
          sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
        />
      </main>
    </div>
  );
}
