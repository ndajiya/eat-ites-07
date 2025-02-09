
import { Agent, Commodity } from "@/types/simulator";
import { Security } from "@/types/securities";
import { useAgentHandlers } from "./handlers/useAgentHandlers";
import { useCommodityHandlers } from "./handlers/useCommodityHandlers";
import { useSecurityHandlers } from "./handlers/useSecurityHandlers";

export const useEntityHandlers = (
  setAgents: React.Dispatch<React.SetStateAction<Agent[]>>,
  setCommodities: React.Dispatch<React.SetStateAction<Commodity[]>>,
  setSecurities: React.Dispatch<React.SetStateAction<Security[]>>,
  setNewAgent: (agent: Omit<Agent, "lastRoundDifference">) => void,
  setNewCommodity: (commodity: Omit<Commodity, "priceTrend">) => void,
  setNewSecurity: (security: Omit<Security, "id">) => void,
) => {
  const { handleAgentEdit, handleAgentDelete, handleAddAgent } = useAgentHandlers(setAgents, setNewAgent);
  const { handleCommodityEdit, handleAddCommodity, handleCommodityDelete } = useCommodityHandlers(setCommodities, setNewCommodity);
  const { handleAddSecurity, handleSecurityDelete } = useSecurityHandlers(setSecurities, setNewSecurity);

  return {
    handleAgentEdit,
    handleAgentDelete,
    handleCommodityEdit,
    handleAddAgent,
    handleAddCommodity,
    handleAddSecurity,
    handleCommodityDelete,
    handleSecurityDelete,
  };
};
