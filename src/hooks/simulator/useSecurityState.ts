
import { useState } from "react";
import { Security } from "@/types/securities";
import { EducationLevel } from "@/types/simulator";

const ASSOCIATES_SECURITIES: Security[] = [
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
];

const BACHELORS_SECURITIES: Security[] = [
  {
    id: "1",
    name: "Growth Fund ETF",
    class: "Equity",
    type: "ETF",
    price: 250,
    volatility: 0.25,
    quantity: 2000000,
    issuer: "Investment Corp",
    description: "Growth-focused ETF tracking tech sector",
    marketCap: 500000000
  },
  {
    id: "2",
    name: "Corporate Bond A",
    class: "Corporate",
    type: "CorporateBond",
    price: 1000,
    volatility: 0.15,
    quantity: 100000,
    issuer: "Major Corp",
    description: "5-year corporate bond",
    interestRate: 0.045,
    maturityDate: "2029-03-15"
  }
];

export const useSecurityState = (level: EducationLevel) => {
  const initialSecurities = level === 'ASSOCIATES' 
    ? ASSOCIATES_SECURITIES 
    : BACHELORS_SECURITIES;
    
  const [securities, setSecurities] = useState<Security[]>(initialSecurities);

  return { securities, setSecurities };
};
