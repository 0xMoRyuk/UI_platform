const implementingPartners = [
  {
    id: "digital-africa",
    name: "Digital Africa",
    description: "Pan-African initiative supporting tech entrepreneurs and innovation ecosystems.",
    role: "Lead Implementer",
  },
  {
    id: "expertise-france",
    name: "Expertise France",
    description: "French public agency for international technical cooperation.",
    role: "Technical Partner",
  },
  {
    id: "giz",
    name: "GIZ",
    description: "German development agency supporting sustainable development worldwide.",
    role: "Technical Partner",
  },
  {
    id: "enabel",
    name: "Enabel",
    description: "Belgian development agency focusing on digital transformation.",
    role: "Technical Partner",
  },
];

const fundingPartners = [
  { id: "eu", name: "European Union", flag: "🇪🇺" },
  { id: "belgium", name: "Belgium", flag: "🇧🇪" },
  { id: "estonia", name: "Estonia", flag: "🇪🇪" },
  { id: "finland", name: "Finland", flag: "🇫🇮" },
  { id: "france", name: "France", flag: "🇫🇷" },
  { id: "germany", name: "Germany", flag: "🇩🇪" },
];

export default function PartnersPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="bg-brand-primary text-brand-primary-foreground py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold sm:text-4xl">Partners</h1>
          <p className="mt-4 text-lg opacity-90 max-w-2xl">
            AI4Startups is made possible through the collaboration of European and
            African partners committed to digital innovation.
          </p>
        </div>
      </section>

      {/* Funding Partners */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground">Funding Partners</h2>
          <p className="mt-2 text-muted-foreground">
            Co-funded by the European Union under the Global Gateway strategy.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            {fundingPartners.map((partner) => (
              <div
                key={partner.id}
                className="flex items-center gap-3 bg-brand-secondary/30 border border-brand-neutral rounded-lg px-5 py-3"
              >
                <span className="text-2xl">{partner.flag}</span>
                <span className="font-medium text-foreground">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Implementing Partners */}
      <section className="py-12 bg-brand-neutral/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground">
            Implementing Partners
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {implementingPartners.map((partner) => (
              <div
                key={partner.id}
                className="border border-brand-neutral rounded-lg p-6 bg-background"
              >
                {/* Logo placeholder */}
                <div className="h-12 w-32 bg-brand-secondary/50 rounded flex items-center justify-center text-xs text-muted-foreground mb-4">
                  Logo
                </div>
                <h3 className="font-semibold text-lg text-foreground">
                  {partner.name}
                </h3>
                <p className="text-sm text-brand-primary font-medium">
                  {partner.role}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {partner.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DataGov Link */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-foreground">
            Part of DataGov Initiative
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            AI4Startups is part of the broader Data Governance in Africa initiative,
            supporting digital transformation across the continent.
          </p>
          <a
            href="https://d4dhub.eu"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 bg-brand-primary text-brand-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-brand-primary/90 transition-colors"
          >
            Visit D4D Hub
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
                d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
              />
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
}
