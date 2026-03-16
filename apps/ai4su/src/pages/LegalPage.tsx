export function LegalPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-stone-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-brand-primary dark:text-white font-[Barlow] mb-8">
          Legal Notice (Impressum)
        </h1>
        <div className="prose prose-stone dark:prose-invert max-w-none">
          <h2 className="text-2xl font-semibold text-brand-primary dark:text-white font-[Barlow] mt-10 mb-4">
            Publisher
          </h2>
          <p>
            Deutsche Gesellschaft für Internationale Zusammenarbeit (GIZ) GmbH
          </p>
          <p>
            Registered offices:
            <br />
            Bonn and Eschborn, Germany
          </p>
          <p>
            Friedrich-Ebert-Allee 36 + 40
            <br />
            53113 Bonn, Germany
          </p>
          <p>
            Phone:{' '}
            <a href="tel:+4922844600" className="text-brand-accent hover:underline">
              +49 228 44 60-0
            </a>
            <br />
            Fax: +49 228 4460-17 66
            <br />
            Email:{' '}
            <a href="mailto:info@giz.de" className="text-brand-accent hover:underline">
              info@giz.de
            </a>
            <br />
            Website:{' '}
            <a
              href="https://www.giz.de"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-accent hover:underline"
            >
              www.giz.de
            </a>
          </p>

          <h2 className="text-2xl font-semibold text-brand-primary dark:text-white font-[Barlow] mt-10 mb-4">
            Authorised Representatives
          </h2>
          <p>
            GIZ is a public-benefit federal enterprise and is registered in the
            district court of Bonn under registration number HRB 18384 and in
            the district court of Frankfurt am Main under HRB 12394.
          </p>
          <p>
            <strong>Management Board:</strong>
            <br />
            Thorsten Schäfer-Gümbel (Chair of the Management Board)
            <br />
            Ingrid-Gabriela Hoven
          </p>
          <p>
            <strong>Chair of the Supervisory Board:</strong>
            <br />
            Niels Annen
          </p>

          <h2 className="text-2xl font-semibold text-brand-primary dark:text-white font-[Barlow] mt-10 mb-4">
            VAT Identification Number
          </h2>
          <p>DE 113891176</p>

          <h2 className="text-2xl font-semibold text-brand-primary dark:text-white font-[Barlow] mt-10 mb-4">
            Editorial Responsibility
          </h2>
          <p>
            GIZ — Digitalisation for Sustainable Development
            <br />
            Email:{' '}
            <a
              href="mailto:secretariat@d4dhub.eu"
              className="text-brand-accent hover:underline"
            >
              secretariat@d4dhub.eu
            </a>
          </p>

          <h2 className="text-2xl font-semibold text-brand-primary dark:text-white font-[Barlow] mt-10 mb-4">
            EU Funding Disclaimer
          </h2>
          <div className="bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <span className="text-3xl" role="img" aria-label="European Union flag">
                🇪🇺
              </span>
              <p className="text-stone-700 dark:text-stone-300 m-0">
                This website is funded by the European Union. Its contents are
                the sole responsibility of the AI4Startups project and do not
                necessarily reflect the views of the European Union.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-brand-primary dark:text-white font-[Barlow] mt-10 mb-4">
            Liability for Content
          </h2>
          <p>
            The contents of this website have been created with the utmost care.
            However, we cannot guarantee the accuracy, completeness, or
            timeliness of the content. As a service provider, we are responsible
            for our own content on these pages in accordance with general
            legislation. However, we are not obligated to monitor transmitted or
            stored third-party information or to investigate circumstances that
            indicate illegal activity.
          </p>

          <h2 className="text-2xl font-semibold text-brand-primary dark:text-white font-[Barlow] mt-10 mb-4">
            Liability for Links
          </h2>
          <p>
            Our website contains links to external third-party websites over
            whose content we have no influence. We therefore cannot assume any
            liability for this external content. The respective provider or
            operator of the pages is always responsible for the content of the
            linked pages. The linked pages were checked for possible legal
            violations at the time of linking. Illegal content was not
            identifiable at the time of linking.
          </p>

          <h2 className="text-2xl font-semibold text-brand-primary dark:text-white font-[Barlow] mt-10 mb-4">
            Copyright
          </h2>
          <p>
            The content and works on this website created by the site operators
            are subject to German copyright law. Duplication, processing,
            distribution, and any form of commercialisation of such material
            beyond the scope of copyright law require the prior written consent
            of the respective author or creator. Downloads and copies of this
            site are only permitted for private, non-commercial use.
          </p>
        </div>
      </div>
    </div>
  )
}
