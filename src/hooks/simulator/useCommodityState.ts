import { useState } from "react";
import { Commodity } from "@/types/simulator";

export const useCommodityState = () => {
  const [commodities, setCommodities] = useState<Commodity[]>([
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
  ]);

  return { commodities, setCommodities };
};