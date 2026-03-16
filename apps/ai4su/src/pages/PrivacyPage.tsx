export function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-stone-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-brand-primary dark:text-white font-[Barlow] mb-8">
          Privacy Policy
        </h1>
        <div className="prose prose-stone dark:prose-invert max-w-none">
          <p className="text-lg text-stone-600 dark:text-stone-300 mb-8">
            The AI4Startups project, as part of the Digital for Development (D4D)
            Hub initiative, is committed to protecting your privacy. This policy
            explains how we handle your personal data when you visit this website.
          </p>

          <h2 className="text-2xl font-semibold text-brand-primary dark:text-white font-[Barlow] mt-10 mb-4">
            Data Controller
          </h2>
          <p>
            Deutsche Gesellschaft für Internationale Zusammenarbeit (GIZ) GmbH
            <br />
            Friedrich-Ebert-Allee 36 + 40
            <br />
            53113 Bonn, Germany
            <br />
            Email:{' '}
            <a
              href="mailto:datenschutzbeauftragter@giz.de"
              className="text-brand-accent hover:underline"
            >
              datenschutzbeauftragter@giz.de
            </a>
          </p>

          <h2 className="text-2xl font-semibold text-brand-primary dark:text-white font-[Barlow] mt-10 mb-4">
            Data We Collect
          </h2>
          <p>
            When you visit this website, certain data is automatically collected
            by our hosting provider for technical reasons:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>IP address (anonymised)</li>
            <li>Date and time of access</li>
            <li>Pages visited</li>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Referring URL</li>
          </ul>
          <p>
            This data is processed to ensure the security and functionality of
            the website and is deleted after 7 days.
          </p>

          <h2 className="text-2xl font-semibold text-brand-primary dark:text-white font-[Barlow] mt-10 mb-4">
            Analytics
          </h2>
          <p>
            We use{' '}
            <a
              href="https://usefathom.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-accent hover:underline"
            >
              Fathom Analytics
            </a>
            , a privacy-friendly analytics tool. Fathom does not use cookies,
            does not collect personal data, and is fully compliant with GDPR, ePrivacy,
            PECR, CCPA, and COPPA. No consent banner is required.
          </p>

          <h2 className="text-2xl font-semibold text-brand-primary dark:text-white font-[Barlow] mt-10 mb-4">
            Cookies
          </h2>
          <p>
            This website uses only essential session cookies required for the
            website to function. These cookies do not track you and are deleted
            when you close your browser. We do not use any tracking or
            advertising cookies.
          </p>

          <h2 className="text-2xl font-semibold text-brand-primary dark:text-white font-[Barlow] mt-10 mb-4">
            Legal Basis for Processing
          </h2>
          <p>We process your data based on the following legal grounds:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Article 6(1)(b) GDPR</strong> — Processing necessary for
              the performance of a contract or pre-contractual measures
            </li>
            <li>
              <strong>Article 6(1)(f) GDPR</strong> — Processing necessary for
              the purposes of legitimate interests (website security and
              functionality)
            </li>
            <li>
              <strong>Article 6(1)(a) GDPR</strong> — Where you have given
              consent for specific processing activities
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-brand-primary dark:text-white font-[Barlow] mt-10 mb-4">
            Your Rights
          </h2>
          <p>
            Under GDPR Articles 15–21, you have the following rights regarding
            your personal data:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Right of access</strong> (Art. 15) — Obtain confirmation
              and a copy of your personal data
            </li>
            <li>
              <strong>Right to rectification</strong> (Art. 16) — Correct
              inaccurate personal data
            </li>
            <li>
              <strong>Right to erasure</strong> (Art. 17) — Request deletion of
              your personal data
            </li>
            <li>
              <strong>Right to restriction</strong> (Art. 18) — Restrict the
              processing of your data
            </li>
            <li>
              <strong>Right to data portability</strong> (Art. 20) — Receive
              your data in a machine-readable format
            </li>
            <li>
              <strong>Right to object</strong> (Art. 21) — Object to processing
              based on legitimate interests
            </li>
          </ul>
          <p>
            To exercise your rights, contact the GIZ Data Protection Officer at{' '}
            <a
              href="mailto:datenschutzbeauftragter@giz.de"
              className="text-brand-accent hover:underline"
            >
              datenschutzbeauftragter@giz.de
            </a>
            .
          </p>
          <p>
            You also have the right to lodge a complaint with a supervisory
            authority, in particular in the EU Member State of your habitual
            residence, place of work, or place of the alleged infringement.
          </p>

          <h2 className="text-2xl font-semibold text-brand-primary dark:text-white font-[Barlow] mt-10 mb-4">
            Hosting
          </h2>
          <p>
            This website is hosted by netclusive GmbH, Germany. Server log files
            are stored for security purposes and deleted automatically after 7
            days.
          </p>

          <h2 className="text-2xl font-semibold text-brand-primary dark:text-white font-[Barlow] mt-10 mb-4">
            Changes to This Policy
          </h2>
          <p>
            We may update this privacy policy from time to time. The current
            version is always available on this page.
          </p>

          <p className="mt-10 text-sm text-stone-500 dark:text-stone-400">
            Last updated: March 2026
          </p>
        </div>
      </div>
    </div>
  )
}
