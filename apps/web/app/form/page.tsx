export default function FormPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="border-b bg-white py-4 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">Contact Form</h1>
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
