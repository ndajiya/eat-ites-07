
import { useAgentState } from "./simulator/useAgentState";
import { useCommodityState } from "./simulator/useCommodityState";
import { useSecurityState } from "./simulator/useSecurityState";
import { EducationLevel } from "@/types/simulator";

export const useSimulatorState = (level: EducationLevel) => {
  const { agents, setAgents } = useAgentState(level);
  const { commodities, setCommodities } = useCommodityState(level);
  const { securities, setSecurities } = useSecurityState(level);

  return {
    agents,
    setAgents,
    commodities,
    setCommodities,
    securities,
    setSecurities
  };
};
