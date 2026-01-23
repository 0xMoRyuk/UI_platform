export interface AIModel {
  id: string;
  name: string;
  description: string;
  sector: string;
  type: string;
  github: string;
  hackathon?: string;
}

export const models: AIModel[] = [
  {
    id: "agri-yield-predictor",
    name: "AgriYield Predictor",
    description: "ML model for crop yield prediction using satellite imagery and weather data.",
    sector: "Agriculture",
    type: "Computer Vision",
    github: "https://github.com/ai4startups/agri-yield-predictor",
    hackathon: "Abidjan 2024",
  },
  {
    id: "health-diagnosis-nlp",
    name: "HealthDiag NLP",
    description: "Natural language processing for symptom analysis in local languages.",
    sector: "Healthcare",
    type: "NLP",
    github: "https://github.com/ai4startups/health-diagnosis-nlp",
    hackathon: "Nairobi 2024",
  },
  {
    id: "fintech-fraud-detection",
    name: "FraudGuard",
    description: "Real-time fraud detection for mobile money transactions.",
    sector: "Fintech",
    type: "Anomaly Detection",
    github: "https://github.com/ai4startups/fintech-fraud-detection",
    hackathon: "Lagos 2024",
  },
  {
    id: "edu-content-recommender",
    name: "EduMatch",
    description: "Personalized learning content recommendation engine.",
    sector: "Education",
    type: "Recommender System",
    github: "https://github.com/ai4startups/edu-content-recommender",
    hackathon: "Kigali 2024",
  },
  {
    id: "supply-chain-optimizer",
    name: "LogiOptim",
    description: "Supply chain optimization for last-mile delivery in urban areas.",
    sector: "Logistics",
    type: "Optimization",
    github: "https://github.com/ai4startups/supply-chain-optimizer",
    hackathon: "Accra 2024",
  },
  {
    id: "water-quality-monitor",
    name: "AquaSense",
    description: "IoT-based water quality prediction using sensor data.",
    sector: "Environment",
    type: "Time Series",
    github: "https://github.com/ai4startups/water-quality-monitor",
    hackathon: "Dakar 2024",
  },
  {
    id: "speech-to-text-local",
    name: "VoixAfrique",
    description: "Speech recognition for African languages including Wolof, Swahili, and Hausa.",
    sector: "Language",
    type: "Speech Recognition",
    github: "https://github.com/ai4startups/speech-to-text-local",
  },
  {
    id: "solar-forecast",
    name: "SolarCast",
    description: "Solar energy production forecasting for off-grid installations.",
    sector: "Energy",
    type: "Time Series",
    github: "https://github.com/ai4startups/solar-forecast",
  },
];

export const sectors = [...new Set(models.map((m) => m.sector))];
export const types = [...new Set(models.map((m) => m.type))];
