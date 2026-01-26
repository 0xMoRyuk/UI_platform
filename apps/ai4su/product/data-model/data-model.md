# Data Model

## Entities

### AIModel
An open-source AI model developed during the AI4Startups program. Each model has a name, description, use case, sector/category, and GitHub repository link. Models are the primary deliverable showcased in the Toolbox section.

### Hackathon
A hackathon event organized as part of the program. Includes dates, location (city and country), theme, challenge brief document, best practices report, results summary, and photo gallery. Hackathons produce AI models and generate reusable resources.

### EcosystemActivity
An ecosystem-building activity such as networking events, research initiatives, or the women founders support program. Each activity has a type, dates, location with GPS coordinates (for map display), description, and associated photos or resources.

### Study
A research document or analysis produced during the program, typically by partners like Briter. Includes title, description, key findings, infographics, and downloadable PDF. Studies provide context and insights for the AI models and hackathons.

### Partner
An organization involved in funding, implementing, or supporting the program. Includes Team Europe members (EU, Expertise France, GIZ), Digital Africa, and service providers (Data354, Briter). Each partner has a name, logo, description, website, and role in the program.

### Country
An African country participating in the AI4Startups program. The program covers 8 countries. Each country has a name, ISO code, flag, and coordinates for map display. Countries link to hackathons and ecosystem activities.

## Relationships

- Hackathon produces many AIModel
- Hackathon occurs in one Country
- Hackathon is implemented by many Partner
- EcosystemActivity occurs in one Country
- EcosystemActivity may be linked to Partner
- Study is produced by one Partner
- AIModel may target many Country (deployment regions)
- Partner may fund or implement many Hackathon
