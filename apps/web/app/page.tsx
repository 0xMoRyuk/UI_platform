import Link from "next/link";

const kpis = [
  { label: "AI Models", value: "24", href: "/toolbox#models" },
  { label: "Hackathons", value: "6", href: "/hackathons" },
  { label: "Countries", value: "15", href: "/ecosystem" },
  { label: "Startups Supported", value: "120+", href: "/ecosystem" },
];

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-background to-brand-neutral/20">
      {/* Hero Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Open-Source AI for Africa
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover AI models and resources developed through the AI4Startups
            program, empowering African entrepreneurs with cutting-edge technology.
          </p>
          <p className="mt-4 text-sm text-brand-primary font-medium">
            Funded by the European Union
          </p>

          <div className="mt-10 flex gap-4 justify-center flex-wrap">
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
        </div>
      </section>

      {/* KPI Cards */}
      <section className="py-12 bg-brand-secondary/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {kpis.map((kpi) => (
              <Link
                key={kpi.label}
                href={kpi.href}
                className="group bg-background rounded-lg p-6 text-center shadow-sm border border-brand-neutral hover:border-brand-primary hover:shadow-md transition-all"
              >
                <p className="text-3xl sm:text-4xl font-bold text-brand-primary group-hover:text-brand-accent transition-colors">
                  {kpi.value}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{kpi.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Toolbox Highlight */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              Program Results & Toolbox
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Access open-source AI models, research studies, and best practices
              developed through our hackathons and ecosystem activities.
            </p>
            <Link
              href="/toolbox"
              className="mt-8 inline-flex items-center gap-2 text-brand-primary font-medium hover:underline"
            >
              Browse all resources
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
