import { Bookkeeping } from "@/utils/Bookkeeping";
import { CommodityClass, CommodityType, MarketType } from "./commodityTypes";

export interface Inventory {
  commodityName: string;
  quantity: number;
  averagePurchasePrice: number;
}

export interface Production {
  commodityName: string;
  rate: number; // units per round
  cost: number; // cost per unit
}

export interface MonetaryPolicy {
  interestRate: number;
  reserveRequirement: number;
}

export interface Agent {
  name: string;
  cash: number;
  class: string;
  lastRoundDifference: number;
  bookkeeping: Bookkeeping;
  inventory: Inventory[];
  production?: Production[];
  monetaryPolicy?: MonetaryPolicy;
  tradingStrategy?: string;
}

export interface Commodity {
  name: string;
  averagePrice: number;
  priceTrend: "Up" | "Down";
  class: CommodityClass;
  type: CommodityType;
  marketType: MarketType;
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
