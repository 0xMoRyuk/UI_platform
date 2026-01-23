const activities = [
  {
    id: "research",
    title: "Research & Analysis",
    description: "Ecosystem studies and surveys mapping AI initiatives across Africa.",
    icon: "📊",
    count: "4 studies",
  },
  {
    id: "networking",
    title: "Networking Events",
    description: "Conferences and meetups connecting AI practitioners and entrepreneurs.",
    icon: "🤝",
    count: "12 events",
  },
  {
    id: "women-founders",
    title: "Women Founders Program",
    description: "Dedicated support and mentorship for women-led AI startups.",
    icon: "👩‍💻",
    count: "25 founders",
  },
  {
    id: "training",
    title: "Training Workshops",
    description: "Hands-on AI/ML training for developers and entrepreneurs.",
    icon: "🎓",
    count: "8 workshops",
  },
];

const countries = [
  "Côte d'Ivoire",
  "Kenya",
  "Nigeria",
  "Rwanda",
  "Ghana",
  "Senegal",
  "South Africa",
  "Ethiopia",
  "Tanzania",
  "Uganda",
  "Morocco",
  "Egypt",
  "Tunisia",
  "Cameroon",
  "DRC",
];

export default function EcosystemPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="bg-brand-primary text-brand-primary-foreground py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold sm:text-4xl">Ecosystem Activities</h1>
          <p className="mt-4 text-lg opacity-90 max-w-2xl">
            Building the African AI ecosystem through research, networking, and
            targeted support programs.
          </p>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground">Activities</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="border border-brand-neutral rounded-lg p-6 hover:border-brand-primary hover:shadow-md transition-all bg-background"
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{activity.icon}</span>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">
                      {activity.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {activity.description}
                    </p>
                    <p className="mt-2 text-sm font-medium text-brand-primary">
                      {activity.count}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Countries Coverage */}
      <section className="py-12 bg-brand-neutral/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground">
            Countries Covered
          </h2>
          <p className="mt-2 text-muted-foreground">
            Program activities span across {countries.length} African countries.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {countries.map((country) => (
              <span
                key={country}
                className="bg-background border border-brand-neutral px-3 py-1.5 rounded-full text-sm text-foreground"
              >
                {country}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
