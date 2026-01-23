import Link from "next/link";

const footerLinks = {
  program: [
    { name: "Hackathons", href: "/hackathons" },
    { name: "Ecosystem Activities", href: "/ecosystem" },
    { name: "Toolbox", href: "/toolbox" },
  ],
  resources: [
    { name: "AI Models", href: "/toolbox#models" },
    { name: "Studies & Research", href: "/toolbox#studies" },
    { name: "Best Practices", href: "/toolbox#practices" },
  ],
  partners: [
    { name: "Our Partners", href: "/partners" },
    { name: "DataGov Initiative", href: "https://d4dhub.eu", external: true },
  ],
};

export function Footer() {
  return (
    <footer className="bg-brand-primary text-brand-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand & Attribution */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold">AI4Startups</h3>
            <p className="mt-2 text-sm opacity-90">
              Open-source AI models and resources for African startups.
            </p>
            <div className="mt-4 flex items-center gap-2">
              {/* EU Flag placeholder - replace with actual SVG */}
              <div className="h-8 w-12 bg-brand-secondary rounded flex items-center justify-center text-xs text-brand-primary font-bold">
                EU
              </div>
            </div>
          </div>

          {/* Program Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider">
              Program
            </h4>
            <ul className="mt-4 space-y-2">
              {footerLinks.program.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm opacity-90 hover:opacity-100 hover:underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider">
              Resources
            </h4>
            <ul className="mt-4 space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm opacity-90 hover:opacity-100 hover:underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Partners Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider">
              Partners
            </h4>
            <ul className="mt-4 space-y-2">
              {footerLinks.partners.map((link) => (
                <li key={link.name}>
                  {"external" in link ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm opacity-90 hover:opacity-100 hover:underline inline-flex items-center gap-1"
                    >
                      {link.name}
                      <svg
                        className="h-3 w-3"
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
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm opacity-90 hover:opacity-100 hover:underline"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* EU Attribution */}
        <div className="mt-8 border-t border-brand-primary-foreground/20 pt-8">
          <p className="text-sm opacity-90 text-center">
            Funded by the European Union under the Global Gateway strategy.
            Implemented by Digital Africa, Enabel, ESTDEV, Expertise France, GIZ
            and HAUS.
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-4 text-center">
          <p className="text-xs opacity-75">
            &copy; {new Date().getFullYear()} DataGov Initiative. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
