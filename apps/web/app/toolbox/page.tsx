import Link from "next/link";
import { models, sectors } from "../data/models";

const kpis = [
  { label: "AI Models", value: models.length.toString() },
  { label: "Sectors Covered", value: sectors.length.toString() },
  { label: "Open Source", value: "100%" },
  { label: "Ready to Use", value: "24" },
];

export default function ToolboxPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="bg-brand-primary text-brand-primary-foreground py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold sm:text-4xl">Program Toolbox</h1>
          <p className="mt-4 text-lg opacity-90 max-w-2xl">
            Open-source AI models, research studies, and best practices from the
            AI4Startups program.
          </p>
        </div>
      </section>

      {/* KPI Summary */}
      <section className="py-8 border-b border-brand-neutral">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {kpis.map((kpi) => (
              <div
                key={kpi.label}
                className="bg-brand-secondary/30 rounded-lg p-4 text-center"
              >
                <p className="text-2xl font-bold text-brand-primary">
                  {kpi.value}
                </p>
                <p className="text-sm text-muted-foreground">{kpi.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Models Section */}
      <section id="models" className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground">AI Models</h2>
          <p className="mt-2 text-muted-foreground">
            Open-source models developed during hackathons, ready for integration.
          </p>

          {/* Model Grid */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {models.map((model) => (
              <div
                key={model.id}
                className="border border-brand-neutral rounded-lg p-5 hover:border-brand-primary hover:shadow-md transition-all bg-background"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-foreground">{model.name}</h3>
                  <span className="text-xs bg-brand-secondary text-brand-primary px-2 py-1 rounded-full whitespace-nowrap">
                    {model.sector}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                  {model.description}
                </p>
                <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="bg-brand-neutral/50 px-2 py-0.5 rounded">
                    {model.type}
                  </span>
                  {model.hackathon && (
                    <span className="bg-brand-accent/20 text-brand-accent-foreground px-2 py-0.5 rounded">
                      {model.hackathon}
                    </span>
                  )}
                </div>
                <a
                  href={model.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-primary hover:underline"
                >
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  View on GitHub
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Studies Section */}
      <section id="studies" className="py-12 bg-brand-neutral/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground">
            Studies & Research
          </h2>
          <p className="mt-2 text-muted-foreground">
            Research reports and ecosystem analyses.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="border border-brand-neutral rounded-lg p-5 bg-background">
              <h3 className="font-semibold text-foreground">
                AI Ecosystem Mapping - West Africa
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Comprehensive analysis of AI startups and initiatives across West
                African countries.
              </p>
              <a
                href="#"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-primary hover:underline"
              >
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
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>
                Download PDF
              </a>
            </div>

            <div className="border border-brand-neutral rounded-lg p-5 bg-background">
              <h3 className="font-semibold text-foreground">
                Best Practices: AI for Agriculture
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Lessons learned from hackathon projects focused on agricultural
                applications.
              </p>
              <a
                href="#"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-primary hover:underline"
              >
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
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>
                Download PDF
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
