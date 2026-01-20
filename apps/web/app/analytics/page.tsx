export default function AnalyticsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="border-b bg-white py-4 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
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
