import { useState } from "react";
import { Security } from "@/types/securities";

export const useSecurityState = () => {
  const [securities, setSecurities] = useState<Security[]>([
    {
      id: "1",
      name: "Tech Corp Common Stock",
      class: "Equity",
      type: "CommonStock",
      price: 100,
      volatility: 0.3,
      quantity: 1000000,
      issuer: "Tech Corporation",
      description: "Common stock of leading tech company",
      marketCap: 100000000
    },
    {
      id: "2",
      name: "Gov 10Y Bond",
      class: "Government",
      type: "GovernmentBond",
      price: 1000,
      volatility: 0.1,
      quantity: 500000,
      issuer: "Federal Government",
      description: "10-year government bond",
      interestRate: 0.035,
      maturityDate: "2034-03-15"
    }
  ]);

  return { securities, setSecurities };
};