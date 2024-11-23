import { Commodity, RoundData } from "@/types/simulator";
import { COMMODITY_CLASSES, COMMODITY_TYPES } from "@/types/commodityTypes";

interface MarketFactors {
  seasonality: number;
  geopoliticalRisk: number;
  supplyConstraint: number;
  demandGrowth: number;
}

const getBaseVolatility = (commodity: Commodity): number => {
  // Different commodity classes have different inherent volatility
  const classVolatility = {
    Hard: 0.15, // More volatile due to extraction/mining constraints
    Soft: 0.20, // Highly affected by weather and seasons
    Digital: 0.25, // Most volatile due to rapid technological changes
    Intangible: 0.12, // Moderate volatility
    Financial: 0.18, // Affected by market sentiment
  };

  return classVolatility[commodity.class] || 0.15;
};

const calculateMarketFactors = (commodity: Commodity): MarketFactors => {
  const baseFactors: MarketFactors = {
    seasonality: 1.0,
    geopoliticalRisk: 1.0,
    supplyConstraint: 1.0,
    demandGrowth: 1.0,
  };

  // Adjust factors based on commodity type
  switch (commodity.type) {
    case "Food":
      baseFactors.seasonality = 1.3;
      baseFactors.supplyConstraint = 1.2;
      break;
    case "Energy":
      baseFactors.geopoliticalRisk = 1.4;
      baseFactors.demandGrowth = 1.2;
      break;
    case "Industrial":
      baseFactors.supplyConstraint = 1.3;
      baseFactors.demandGrowth = 1.1;
      break;
    case "Technology":
      baseFactors.demandGrowth = 1.3;
      baseFactors.geopoliticalRisk = 1.1;
      break;
    // ... other types maintain default factors
  }

  // Market type influences
  if (commodity.marketType === "Futures") {
    baseFactors.seasonality *= 1.2; // Future expectations amplify seasonal effects
    baseFactors.geopoliticalRisk *= 1.1; // Slightly more sensitive to geopolitical risks
  }

  return baseFactors;
};

export const calculateNewPrice = (
  commodity: Commodity,
  currentRound: number,
  previousRounds: RoundData[]
): number => {
  const baseVolatility = getBaseVolatility(commodity);
  const marketFactors = calculateMarketFactors(commodity);
  
  // Calculate composite market pressure
  const marketPressure = 
    marketFactors.seasonality * 
    marketFactors.geopoliticalRisk * 
    marketFactors.supplyConstraint * 
    marketFactors.demandGrowth;

  // Add some randomness based on volatility
  const randomFactor = 1 + (Math.random() - 0.5) * 2 * baseVolatility;
  
  // Calculate trend based on previous rounds
  let trendFactor = 1.0;
  if (previousRounds.length > 0) {
    const recentPrices = previousRounds
      .slice(-3) // Look at last 3 rounds
      .map(round => 
        round.commodities.find(c => c.name === commodity.name)?.price || 
        commodity.averagePrice
      );
    
    const avgRecentPrice = recentPrices.reduce((a, b) => a + b, 0) / recentPrices.length;
    trendFactor = avgRecentPrice / commodity.averagePrice;
  }

  // Calculate new price
  const newPrice = commodity.averagePrice * marketPressure * randomFactor * trendFactor;
  
  // Ensure price doesn't change too drastically
  const maxChange = commodity.averagePrice * baseVolatility;
  const minPrice = Math.max(commodity.averagePrice - maxChange, 0);
  const maxPrice = commodity.averagePrice + maxChange;
  
  return Math.min(Math.max(newPrice, minPrice), maxPrice);
};

export const determinePriceTrend = (
  oldPrice: number,
  newPrice: number
): "Up" | "Down" => {
  return newPrice >= oldPrice ? "Up" : "Down";
};
