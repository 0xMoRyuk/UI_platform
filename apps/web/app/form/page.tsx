import Link from "next/link";

export default function FormPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b border-brand-neutral bg-background py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Contact Form</h1>
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
          src="https://kw20qfzcb92.typeform.com/to/NsNUqTQy"
          className="w-full h-full min-h-[calc(100vh-80px)]"
          frameBorder="0"
          allow="camera; microphone; autoplay; encrypted-media;"
        />
      </main>
    </div>
  );
}
