export type CommodityClass = 
  | "Hard"
  | "Soft" 
  | "Digital"
  | "Intangible"
  | "Financial";

export type CommodityType = 
  | "Industrial"
  | "Food"
  | "Energy"
  | "Luxury"
  | "Environmental"
  | "Technology"
  | "Cultural";

export type MarketType = "Spot" | "Futures";

export interface CommodityClassInfo {
  name: CommodityClass;
  description: string;
  characteristics: string[];
  examples: string[];
}

export interface CommodityTypeInfo {
  name: CommodityType;
  description: string;
  examples: string[];
  marketCharacteristics: string[];
}

export const COMMODITY_CLASSES: Record<CommodityClass, CommodityClassInfo> = {
  Hard: {
    name: "Hard",
    description: "Natural resources that are extracted or mined",
    characteristics: [
      "Tend to be non-renewable",
      "Heavily influenced by geopolitical factors and supply constraints"
    ],
    examples: ["Metals (Gold, silver)", "Energy (Crude oil, gas)", "Precious Gems"]
  },
  Soft: {
    name: "Soft",
    description: "Agricultural or renewable resources that are grown or cultivated",
    characteristics: [
      "Renewable and seasonal",
      "Heavily impacted by weather, climate, and farming practices"
    ],
    examples: ["Grains", "Livestock", "Dairy", "Soft Beverages", "Cotton"]
  },
  Digital: {
    name: "Digital",
    description: "Intangible digital assets that hold economic value",
    characteristics: [
      "Not physical but traded in financial and digital markets",
      "Heavily reliant on technological infrastructure"
    ],
    examples: ["Cryptocurrencies", "Cloud computing resources", "Data"]
  },
  Intangible: {
    name: "Intangible",
    description: "Non-physical assets or rights that can be traded",
    characteristics: [
      "Often regulated or specialized markets",
      "Increasing relevance in the digital economy"
    ],
    examples: ["Carbon credits", "Intellectual property", "Bandwidth rights"]
  },
  Financial: {
    name: "Financial",
    description: "Financial instruments or assets treated as tradable commodities",
    characteristics: [
      "Serve as hedging tools or speculative assets",
      "Traded in financial markets"
    ],
    examples: ["Currencies", "Bonds and derivatives", "Equity indices"]
  }
};

export const COMMODITY_TYPES: Record<CommodityType, CommodityTypeInfo> = {
  Industrial: {
    name: "Industrial",
    description: "Commodities used in manufacturing and production",
    examples: ["Metals", "Energy resources"],
    marketCharacteristics: ["Heavily influenced by global industrial output"]
  },
  Food: {
    name: "Food",
    description: "Consumables used for human or animal consumption",
    examples: ["Fruits", "Vegetables", "Grains", "Livestock"],
    marketCharacteristics: ["Tied to agricultural yields and consumption patterns"]
  },
  Energy: {
    name: "Energy",
    description: "Resources used for fuel or power generation",
    examples: ["Oil", "Natural gas", "Coal", "Renewable energy"],
    marketCharacteristics: ["Affected by geopolitical events and regulations"]
  },
  Luxury: {
    name: "Luxury",
    description: "High-value commodities often used for investment",
    examples: ["Gold", "Diamonds", "Rare wines"],
    marketCharacteristics: ["Acts as a hedge against inflation"]
  },
  Environmental: {
    name: "Environmental",
    description: "Assets associated with environmental sustainability",
    examples: ["Carbon credits", "Renewable energy certificates"],
    marketCharacteristics: ["Gaining prominence due to climate initiatives"]
  },
  Technology: {
    name: "Technology",
    description: "Commodities tied to technological industries",
    examples: ["Rare earth elements", "Semiconductors"],
    marketCharacteristics: ["Essential for the tech industry"]
  },
  Cultural: {
    name: "Cultural",
    description: "Products tied to cultural or creative output",
    examples: ["NFTs", "Digital art", "Copyrighted media"],
    marketCharacteristics: ["Emerging alongside digital economy"]
  }
};