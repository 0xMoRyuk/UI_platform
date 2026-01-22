import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-brand-neutral/30">
      <main className="text-center space-y-6 p-8">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
          AI4Startups
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Open-source AI models and resources for African startups.
        </p>
        <p className="text-sm text-brand-primary">
          Funded by the European Union
        </p>

        <div className="pt-4 flex gap-4 justify-center flex-wrap">
          <Link
            href="/toolbox"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-md bg-brand-primary text-brand-primary-foreground hover:bg-brand-primary/90 transition-colors"
          >
            Explore Toolbox
          </Link>
          <Link
            href="/hackathons"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-md bg-brand-accent text-brand-accent-foreground hover:bg-brand-accent/90 transition-colors"
          >
            View Hackathons
          </Link>
        </div>
      </main>
    </div>
  );
}
