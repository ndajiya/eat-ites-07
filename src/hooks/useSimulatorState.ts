import { useAgentState } from "./simulator/useAgentState";
import { useCommodityState } from "./simulator/useCommodityState";
import { useSecurityState } from "./simulator/useSecurityState";

export const useSimulatorState = () => {
  const { agents, setAgents } = useAgentState();
  const { commodities, setCommodities } = useCommodityState();
  const { securities, setSecurities } = useSecurityState();

  return {
    agents,
    setAgents,
    commodities,
    setCommodities,
    securities,
    setSecurities
  };
};