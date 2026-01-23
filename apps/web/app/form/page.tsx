export default function FormPage() {
  return (
    <div className="flex flex-col bg-background">
      <div className="border-b border-brand-neutral py-4 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-foreground">Contact Form</h1>
        </div>
      </div>
      <iframe
        src="https://kw20qfzcb92.typeform.com/to/NsNUqTQy"
        className="w-full min-h-[600px]"
        frameBorder="0"
        allow="camera; microphone; autoplay; encrypted-media;"
      />
    </div>
  );
}
