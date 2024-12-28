import { useState, useCallback } from "react";
import { Agent, Commodity, RoundData } from "@/types/simulator";
import { Security, Trade } from "@/types/securities";
import { calculateMarketImpact, updateSecurityPrice } from "@/utils/marketOperations";
import { simulateRound } from "@/utils/simulationOperations";

export const useSimulatorActions = (
  agents: Agent[],
  setAgents: React.Dispatch<React.SetStateAction<Agent[]>>,
  commodities: Commodity[],
  setCommodities: React.Dispatch<React.SetStateAction<Commodity[]>>,
  securities: Security[],
  setSecurities: React.Dispatch<React.SetStateAction<Security[]>>
) => {
  const [roundsHistory, setRoundsHistory] = useState<RoundData[]>([]);
  const [currentRound, setCurrentRound] = useState(1);

  const handleSecurityTrade = useCallback((trade: Omit<Trade, "id" | "timestamp">) => {
    const security = securities.find(s => s.id === trade.securityId);
    if (!security) return;

    const impact = calculateMarketImpact(security, trade);
    const updatedSecurity = updateSecurityPrice(security, impact);

    setSecurities((prevSecurities: Security[]) => 
      prevSecurities.map(s => s.id === security.id ? updatedSecurity : s)
    );

    const tradeValue = trade.price * trade.quantity;
    setAgents((prevAgents: Agent[]) => prevAgents.map(agent => {
      if (agent.name === trade.buyerId) {
        return { ...agent, cash: agent.cash - tradeValue };
      }
      if (agent.name === trade.sellerId) {
        return { ...agent, cash: agent.cash + tradeValue };
      }
      return agent;
    }));
  }, [securities]);

  const simulateNewRound = useCallback(async () => {
    const {
      updatedSecurities,
      updatedCommodities,
      updatedAgents,
      newRoundData
    } = await simulateRound(currentRound, agents, commodities, securities, roundsHistory);

    setRoundsHistory(prev => [...prev, newRoundData]);
    setCurrentRound(prev => prev + 1);
    setAgents(updatedAgents);
    setCommodities(updatedCommodities);
    setSecurities(updatedSecurities);
  }, [
    currentRound,
    agents,
    commodities,
    securities,
    roundsHistory,
    setAgents,
    setCommodities,
    setSecurities
  ]);

  return {
    roundsHistory,
    currentRound,
    handleSecurityTrade,
    simulateNewRound
  };
};