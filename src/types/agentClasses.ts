export type AgentClass = {
  name: string;
  description: string;
  roles: string[];
  examples: string[];
};

export const AGENT_CLASSES: Record<string, AgentClass> = {
  Households: {
    name: "Households",
    description: "Individuals or groups of individuals that consume goods and services and supply labor or capital.",
    roles: [
      "Consumers: Purchase goods and services to satisfy needs and wants.",
      "Labor Suppliers: Provide labor in exchange for wages.",
      "Savers/Investors: Save or invest their income in financial markets or assets."
    ],
    examples: [
      "Families buying groceries.",
      "Workers participating in the labor market.",
      "Individuals saving in retirement accounts."
    ]
  },
  Firms: {
    name: "Firms",
    description: "Organizations that produce goods and services for profit.",
    roles: [
      "Producers: Use inputs (labor, capital, raw materials) to create products.",
      "Employers: Hire labor and other resources from households.",
      "Investors: Use profits to reinvest in business operations or distribute to shareholders."
    ],
    examples: [
      "A car manufacturing company producing vehicles.",
      "A software firm offering cloud-based solutions.",
      "A local restaurant serving meals."
    ]
  },
  Governments: {
    name: "Governments",
    description: "Institutions that oversee the economy, regulate markets, and provide public goods and services.",
    roles: [
      "Regulators: Enforce laws, maintain order, and ensure fair competition.",
      "Tax Collectors: Generate revenue through taxes to fund public services.",
      "Service Providers: Offer public goods (e.g., infrastructure, education, healthcare).",
      "Redistributors: Allocate resources through welfare programs and subsidies."
    ],
    examples: [
      "Central governments managing monetary and fiscal policies.",
      "Local governments maintaining public parks and infrastructure."
    ]
  },
  FinancialInstitutions: {
    name: "Financial Institutions",
    description: "Entities that facilitate the flow of money and capital in the economy.",
    roles: [
      "Intermediaries: Connect savers with borrowers.",
      "Investors: Allocate capital to firms, projects, or governments.",
      "Risk Managers: Offer insurance and hedging tools to manage financial risks."
    ],
    examples: [
      "Banks providing loans and accepting deposits.",
      "Investment firms managing portfolios.",
      "Insurance companies mitigating risks for individuals and businesses."
    ]
  },
  NonProfitOrganizations: {
    name: "Non-Profit Organizations",
    description: "Entities that operate for social, cultural, or environmental purposes rather than profit.",
    roles: [
      "Service Providers: Offer goods or services to address specific needs (e.g., education, healthcare).",
      "Advocates: Promote social or environmental causes.",
      "Employers: Hire individuals to carry out their missions."
    ],
    examples: [
      "Charities providing disaster relief.",
      "Environmental NGOs advocating for climate action.",
      "Academic institutions offering scholarships."
    ]
  },
  InternationalOrganizations: {
    name: "International Organizations",
    description: "Multinational or intergovernmental entities that coordinate economic activities on a global scale.",
    roles: [
      "Trade Facilitators: Promote international trade and economic integration.",
      "Lenders: Provide financial assistance to nations.",
      "Standard-Setters: Develop regulations and agreements to stabilize markets."
    ],
    examples: [
      "World Bank funding infrastructure projects in developing countries.",
      "International Monetary Fund (IMF) providing monetary support to nations.",
      "World Trade Organization (WTO) negotiating trade agreements."
    ]
  },
  CentralBanks: {
    name: "Central Banks",
    description: "Institutions that oversee a nation’s monetary system and currency.",
    roles: [
      "Monetary Policy Makers: Control money supply and interest rates.",
      "Lenders of Last Resort: Provide financial stability during crises.",
      "Currency Issuers: Issue and regulate national currencies."
    ],
    examples: [
      "The Federal Reserve in the U.S.",
      "The European Central Bank (ECB).",
      "The Bank of Japan."
    ]
  },
  ForeignEconomicAgents: {
    name: "Foreign Economic Agents",
    description: "Entities operating outside the domestic economy that interact through trade, investment, or financial markets.",
    roles: [
      "Exporters/Importers: Engage in cross-border trade.",
      "Investors: Invest in foreign markets or projects.",
      "Debt Issuers/Borrowers: Issue or purchase debt in international financial markets."
    ],
    examples: [
      "A foreign car manufacturer selling vehicles in another country.",
      "International investors buying government bonds.",
      "Multinational corporations establishing operations abroad."
    ]
  },
  Entrepreneurs: {
    name: "Entrepreneurs",
    description: "Individuals or groups who create businesses and drive innovation in the economy.",
    roles: [
      "Innovators: Develop new products or services.",
      "Risk Takers: Take on financial and operational risks to start businesses.",
      "Job Creators: Contribute to employment and economic growth."
    ],
    examples: [
      "A tech entrepreneur launching a blockchain startup.",
      "A restaurateur opening a new food franchise.",
      "A small business owner providing artisanal goods."
    ]
  },
  ResourceOwners: {
    name: "Resource Owners",
    description: "Entities that own and control natural, physical, or intellectual resources.",
    roles: [
      "Rent Seekers: Lease or sell access to resources.",
      "Suppliers: Provide raw materials or essential inputs to firms.",
      "Preservers: Manage resources sustainably (in some cases)."
    ],
    examples: [
      "Landowners leasing property to businesses.",
      "Energy companies extracting and selling oil or gas.",
      "Intellectual property holders licensing patents."
    ]
  },
  AutonomousAgents: {
    name: "Autonomous Agents (Emerging Class)",
    description: "AI-driven or algorithmic systems that act independently in economic activities.",
    roles: [
      "Market Traders: Algorithmic trading on financial markets.",
      "Service Providers: Offer recommendations or manage resources.",
      "Negotiators: Interact in supply chains or auctions autonomously."
    ],
    examples: [
      "AI bots making real-time investment decisions.",
      "Machine learning algorithms optimizing supply chains.",
      "Autonomous systems negotiating for digital assets."
    ]
  },
};
