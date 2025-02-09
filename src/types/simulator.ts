import { Bookkeeping } from "@/utils/Bookkeeping"
import { CommodityClass, CommodityType, MarketType } from "./commodityTypes"

export interface Inventory {
  commodityName: string
  quantity: number
  averagePurchasePrice: number
}

export interface Production {
  commodityName: string
  rate: number
  cost: number
}

export interface MonetaryPolicy {
  interestRate: number
  reserveRequirement: number
}

export interface LLMConfig {
  provider: "openai" | "perplexity" | "huggingface"
  model: string
  apiKey?: string
}

export interface Agent {
  name: string
  cash: number
  class: string
  lastRoundDifference: number
  bookkeeping: Bookkeeping
  inventory: Inventory[]
  production?: Production[]
  monetaryPolicy?: MonetaryPolicy
  tradingStrategy?: string
  llmConfig?: LLMConfig
}

export interface Commodity {
  name: string
  averagePrice: number
  priceTrend: "Up" | "Down"
  class: CommodityClass
  type: CommodityType
  marketType: MarketType
}

export interface RoundData {
  round: number
  agents: {
    name: string
    cash: number
    difference: number
  }[]
  commodities: {
    name: string
    price: number
  }[]
}

export type EducationLevel = 'ASSOCIATES' | 'BACHELORS';
