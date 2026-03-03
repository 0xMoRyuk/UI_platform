import { Hono } from 'hono'
import { searchHackathons } from '../../domain/hackathons'
import { seoPage, escapeHtml, COUNTRY_NAMES } from '../html'

export const hackathonsSeo = new Hono()

hackathonsSeo.get('/s/hackathons', (c) => {
  const baseUrl = new URL(c.req.url).origin
  const { data: hackathons, total } = searchHackathons({ limit: 100 })

  const totalParticipants = hackathons.reduce((s, h) => s + h.participantCount, 0)
  const totalModels = hackathons.reduce((s, h) => s + h.modelsProduced, 0)

  let listHtml = ''
  for (const h of hackathons) {
    const dates = `${h.startDate} — ${h.endDate}`
    listHtml += `<div class="hackathon-card">
<h2><a href="${escapeHtml(baseUrl)}/hackathons/${escapeHtml(h.slug)}">${escapeHtml(h.name)}</a></h2>
<p>${escapeHtml(h.description)}</p>
<p><strong>Dates:</strong> ${escapeHtml(dates)} | <strong>Location:</strong> ${escapeHtml(h.location.venue)}, ${escapeHtml(h.location.city)}, ${escapeHtml(COUNTRY_NAMES[h.location.countryCode] ?? h.location.country)}</p>
<p><strong>Participants:</strong> ${h.participantCount} | <strong>Teams:</strong> ${h.teamCount} | <strong>Models produced:</strong> ${h.modelsProduced}</p>
${h.outcomes.length > 0 ? `<p><strong>Outcomes:</strong> ${h.outcomes.map((o) => escapeHtml(o)).join('; ')}</p>` : ''}
</div>\n`
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'AI4Startups Hackathon Series',
    numberOfItems: total,
    itemListElement: hackathons.map((h, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Event',
        name: h.name,
        description: h.description,
        startDate: h.startDate,
        endDate: h.endDate,
        location: {
          '@type': 'Place',
          name: h.location.venue,
          address: {
            '@type': 'PostalAddress',
            addressLocality: h.location.city,
            addressCountry: h.location.countryCode,
          },
        },
        organizer: { '@type': 'Organization', name: 'AI4Startups' },
      },
    })),
  }

  const html = seoPage({
    title: `AI Hackathons Across Africa — AI4Startups`,
    description: `${total} hackathons, ${totalParticipants} participants, ${totalModels} AI models produced across Africa. Building open-source AI solutions for agriculture and sustainability.`,
    canonicalPath: '/hackathons',
    jsonLd,
    body: `<h1>AI Hackathons Across Africa</h1>
<p>Building open-source AI solutions for agriculture and sustainability.</p>
<div>
  <span class="stat"><strong>${total}</strong> hackathons</span>
  <span class="stat"><strong>${totalParticipants}</strong> participants</span>
  <span class="stat"><strong>${totalModels}</strong> models produced</span>
</div>
${listHtml}`,
    baseUrl,
  })

  return c.html(html)
})
