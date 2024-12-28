import { useState, useCallback } from "react";
import { Agent, Commodity } from "@/types/simulator";
import { Security } from "@/types/securities";
import { Bookkeeping } from "@/utils/Bookkeeping";
import { useToast } from "@/components/ui/use-toast";

export const useNewEntityState = () => {
  const { toast } = useToast();
  
  const [newAgent, setNewAgent] = useState<Omit<Agent, "lastRoundDifference">>({
    name: "",
    cash: 1000,
    class: "",
    bookkeeping: new Bookkeeping(),
    inventory: [],
    production: [],
  });

  const [newCommodity, setNewCommodity] = useState<Omit<Commodity, "priceTrend">>({
    name: "",
    averagePrice: 0,
    class: "Hard",
    type: "Industrial",
    marketType: "Spot"
  });

  const [newSecurity, setNewSecurity] = useState<Omit<Security, "id">>({
    name: "",
    class: "Equity",
    type: "CommonStock",
    price: 0,
    volatility: 0.3,
    quantity: 0,
    issuer: "",
    description: "",
  });

  const handleSecurityChange = useCallback((field: keyof Omit<Security, "id">, value: any) => {
    setNewSecurity(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  return {
    newAgent,
    setNewAgent,
    newCommodity,
    setNewCommodity,
    newSecurity,
    setNewSecurity,
    handleSecurityChange
  };
};