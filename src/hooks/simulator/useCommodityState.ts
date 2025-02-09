
import { useState } from "react";
import { Commodity, EducationLevel } from "@/types/simulator";

const ASSOCIATES_COMMODITIES: Commodity[] = [
  { 
    name: "Commodity1", 
    averagePrice: 50, 
    priceTrend: "Up" as const,
    class: "Hard",
    type: "Industrial",
    marketType: "Spot"
  },
  { 
    name: "Commodity2", 
    averagePrice: 30, 
    priceTrend: "Down" as const,
    class: "Soft",
    type: "Food",
    marketType: "Futures"
  },
];

const BACHELORS_COMMODITIES: Commodity[] = [
  { 
    name: "Gold", 
    averagePrice: 1800, 
    priceTrend: "Up" as const,
    class: "Hard",
    type: "Precious",
    marketType: "Spot"
  },
  { 
    name: "Crude Oil", 
    averagePrice: 75, 
    priceTrend: "Down" as const,
    class: "Hard",
    type: "Energy",
    marketType: "Futures"
  },
];

export const useCommodityState = (level: EducationLevel) => {
  const initialCommodities = level === 'ASSOCIATES' 
    ? ASSOCIATES_COMMODITIES 
    : BACHELORS_COMMODITIES;
    
  const [commodities, setCommodities] = useState<Commodity[]>(initialCommodities);

  return { commodities, setCommodities };
};
