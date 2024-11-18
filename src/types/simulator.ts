export interface Agent {
  name: string;
  cash: number;
  class: string;
  lastRoundDifference: number;
}

export interface Commodity {
  name: string;
  averagePrice: number;
  priceTrend: "Up" | "Down";
}