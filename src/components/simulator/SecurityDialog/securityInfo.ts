import { SecurityClass, SecurityType } from "@/types/securities";

export const SECURITY_CLASS_INFO: Record<SecurityClass, { description: string; characteristics: string[] }> = {
  Equity: {
    description: "Represents ownership in a company",
    characteristics: ["Voting rights", "Dividend potential", "Capital appreciation"]
  },
  Debt: {
    description: "Fixed income instruments that represent borrowed money",
    characteristics: ["Regular interest payments", "Principal repayment", "Credit risk"]
  },
  Hybrid: {
    description: "Securities that combine characteristics of both equity and debt",
    characteristics: ["Convertibility options", "Variable returns", "Complex structures"]
  },
  Derivative: {
    description: "Financial instruments whose value derives from underlying assets",
    characteristics: ["Leverage potential", "Risk hedging", "Time decay"]
  },
  Government: {
    description: "Securities issued by government entities",
    characteristics: ["High credit quality", "Regular interest payments", "Tax advantages"]
  },
  Fund: {
    description: "Pooled investment vehicles",
    characteristics: ["Professional management", "Diversification", "Economies of scale"]
  }
};

export const SECURITY_TYPE_INFO: Record<SecurityType, { description: string; characteristics: string[] }> = {
  CommonStock: {
    description: "Basic ownership shares in a company",
    characteristics: ["Voting rights", "Variable dividends", "Residual claim on assets"]
  },
  PreferredStock: {
    description: "Higher-priority shares with fixed dividends",
    characteristics: ["Fixed dividends", "Priority over common stock", "Limited voting rights"]
  },
  CorporateBond: {
    description: "Debt issued by corporations",
    characteristics: ["Fixed interest payments", "Maturity date", "Credit risk exposure"]
  },
  GovernmentBond: {
    description: "Debt issued by government entities",
    characteristics: ["Sovereign backing", "Regular interest", "High liquidity"]
  },
  ConvertibleBond: {
    description: "Bonds that can be converted to equity",
    characteristics: ["Conversion option", "Fixed income", "Equity upside"]
  },
  Future: {
    description: "Contracts for future delivery of assets",
    characteristics: ["Standardized terms", "Leverage", "Daily settlement"]
  },
  Option: {
    description: "Rights to buy or sell assets at set prices",
    characteristics: ["Time decay", "Strike price", "Premium payment"]
  },
  ETF: {
    description: "Exchange-traded investment funds",
    characteristics: ["Intraday trading", "Index tracking", "Transparency"]
  },
  MutualFund: {
    description: "Professionally managed investment pools",
    characteristics: ["Daily NAV pricing", "Professional management", "Diversification"]
  }
};