import { Bookkeeping } from "@/utils/Bookkeeping";

export interface Agent {
  name: string;
  cash: number;
  class: string;
  lastRoundDifference: number;
  bookkeeping: Bookkeeping;
}

export interface Commodity {
  name: string;
  averagePrice: number;
  priceTrend: "Up" | "Down";
}

export interface RoundData {
  round: number;
  agents: {
    name: string;
    cash: number;
    difference: number;
  }[];
  commodities: {
    name: string;
    price: number;
  }[];
}