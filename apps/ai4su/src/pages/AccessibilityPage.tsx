export function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-stone-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-brand-primary dark:text-white font-[Barlow] mb-8">
          Accessibility Statement
        </h1>
        <div className="prose prose-stone dark:prose-invert max-w-none">
          <p className="text-lg text-stone-600 dark:text-stone-300 mb-8">
            The AI4Startups project is committed to ensuring digital
            accessibility for people with disabilities. We are continually
            improving the user experience for everyone and applying the relevant
            accessibility standards.
          </p>

          <h2 className="text-2xl font-semibold text-brand-primary dark:text-white font-[Barlow] mt-10 mb-4">
            Conformance Status
          </h2>
          <p>
            This website aims to conform to the{' '}
            <a
              href="https://www.w3.org/TR/WCAG21/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-accent hover:underline"
            >
              Web Content Accessibility Guidelines (WCAG) 2.1
            </a>{' '}
            at Level AA. These guidelines explain how to make web content more
            accessible to people with a wide range of disabilities.
          </p>

          <h2 className="text-2xl font-semibold text-brand-primary dark:text-white font-[Barlow] mt-10 mb-4">
            Technologies Used
          </h2>
          <p>
            The accessibility of this website relies on the following
            technologies:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>HTML</li>
            <li>WAI-ARIA</li>
            <li>CSS</li>
            <li>JavaScript</li>
          </ul>
          <p>
            These technologies are relied upon for conformance with the
            accessibility standards used.
          </p>

          <h2 className="text-2xl font-semibold text-brand-primary dark:text-white font-[Barlow] mt-10 mb-4">
            Accessibility Features
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Semantic HTML structure for screen readers</li>
            <li>ARIA labels and roles for interactive elements</li>
            <li>Keyboard navigation support throughout the site</li>
            <li>Sufficient colour contrast ratios</li>
            <li>Responsive design that adapts to different screen sizes</li>
            <li>Text alternatives for non-text content</li>
            <li>Focus indicators for keyboard users</li>
            <li>Skip navigation links</li>
          </ul>

          <h2 className="text-2xl font-semibold text-brand-primary dark:text-white font-[Barlow] mt-10 mb-4">
            Known Limitations
          </h2>
          <p>
            Despite our best efforts, some content may not yet be fully
            accessible. We are actively working to identify and resolve
            accessibility issues. Known limitations include:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Some older PDF documents may not be fully accessible to screen
              readers
            </li>
            <li>
              Third-party embedded content may not meet all accessibility
              requirements
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-brand-primary dark:text-white font-[Barlow] mt-10 mb-4">
            GIZ Commitment to Digital Inclusion
          </h2>
          <p>
            As part of Deutsche Gesellschaft für Internationale Zusammenarbeit
            (GIZ) GmbH, we are committed to digital inclusion and ensuring our
            digital services are accessible to all users, regardless of their
            abilities. An accessibility officer is available to oversee our
            compliance efforts and address accessibility concerns.
          </p>

          <h2 className="text-2xl font-semibold text-brand-primary dark:text-white font-[Barlow] mt-10 mb-4">
            Feedback
          </h2>
          <p>
            We welcome your feedback on the accessibility of this website. If
            you encounter accessibility barriers or have suggestions for
            improvement, please contact us:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Email:{' '}
              <a
                href="mailto:secretariat@d4dhub.eu"
                className="text-brand-accent hover:underline"
              >
                secretariat@d4dhub.eu
              </a>
            </li>
          </ul>
          <p>
            We aim to respond to accessibility feedback within 5 business days
            and to propose a solution within 10 business days.
          </p>

          <h2 className="text-2xl font-semibold text-brand-primary dark:text-white font-[Barlow] mt-10 mb-4">
            Enforcement Procedure
          </h2>
          <p>
            If you are not satisfied with our response to your accessibility
            concern, you have the right to file a complaint with the relevant
            supervisory authority in your country.
          </p>

          <p className="mt-10 text-sm text-stone-500 dark:text-stone-400">
            This statement was last reviewed on March 2026.
          </p>
        </div>
      </div>
    </div>
  )
}
