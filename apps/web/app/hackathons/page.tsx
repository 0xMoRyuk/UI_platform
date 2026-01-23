const hackathons = [
  {
    id: "abidjan-2024",
    name: "AI for Agriculture",
    location: "Abidjan, Côte d'Ivoire",
    date: "March 2024",
    participants: 45,
    models: 4,
  },
  {
    id: "nairobi-2024",
    name: "HealthTech AI",
    location: "Nairobi, Kenya",
    date: "May 2024",
    participants: 52,
    models: 5,
  },
  {
    id: "lagos-2024",
    name: "Fintech Innovation",
    location: "Lagos, Nigeria",
    date: "July 2024",
    participants: 60,
    models: 6,
  },
  {
    id: "kigali-2024",
    name: "EdTech Solutions",
    location: "Kigali, Rwanda",
    date: "September 2024",
    participants: 38,
    models: 4,
  },
  {
    id: "accra-2024",
    name: "Logistics & Supply Chain",
    location: "Accra, Ghana",
    date: "October 2024",
    participants: 42,
    models: 3,
  },
  {
    id: "dakar-2024",
    name: "Climate & Environment",
    location: "Dakar, Senegal",
    date: "November 2024",
    participants: 35,
    models: 2,
  },
];

export default function HackathonsPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="bg-brand-primary text-brand-primary-foreground py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold sm:text-4xl">Hackathons</h1>
          <p className="mt-4 text-lg opacity-90 max-w-2xl">
            AI hackathons organized across Africa, bringing together developers,
            entrepreneurs, and domain experts.
          </p>
        </div>
      </section>

      {/* Hackathon List */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {hackathons.map((hackathon) => (
              <div
                key={hackathon.id}
                className="border border-brand-neutral rounded-lg overflow-hidden hover:border-brand-primary hover:shadow-md transition-all bg-background"
              >
                {/* Placeholder image */}
                <div className="h-40 bg-brand-secondary/50 flex items-center justify-center">
                  <span className="text-4xl">🚀</span>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-lg text-foreground">
                    {hackathon.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {hackathon.location}
                  </p>
                  <p className="text-sm text-brand-primary font-medium">
                    {hackathon.date}
                  </p>
                  <div className="mt-4 flex gap-4 text-sm text-muted-foreground">
                    <span>{hackathon.participants} participants</span>
                    <span>{hackathon.models} models</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
