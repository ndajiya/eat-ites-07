import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { SimulatorDashboard } from "@/components/simulator/SimulatorDashboard";
import { Agent, Commodity, RoundData } from "@/types/simulator";
import { Security, Trade } from "@/types/securities";
import { Bookkeeping } from "@/utils/Bookkeeping";
import { calculateMarketImpact, updateSecurityPrice } from "@/utils/marketOperations";
import { simulateRound } from "@/utils/simulationOperations";

const Index = () => {
  const { toast } = useToast();
  
  const [agents, setAgents] = useState<Agent[]>([
    { 
      name: "Producer", 
      cash: 1000, 
      class: "Firms", 
      lastRoundDifference: 0,
      bookkeeping: new Bookkeeping(),
      inventory: [],
      production: [
        {
          commodityName: "Commodity1",
          rate: 10,
          cost: 30
        }
      ]
    },
    { 
      name: "Trader", 
      cash: 800, 
      class: "Firms", 
      lastRoundDifference: 0,
      bookkeeping: new Bookkeeping(),
      inventory: [
        {
          commodityName: "Commodity1",
          quantity: 50,
          averagePurchasePrice: 45
        }
      ]
    },
  ]);

  const [commodities, setCommodities] = useState<Commodity[]>([
    { 
      name: "Commodity1", 
      averagePrice: 50, 
      priceTrend: "Up" as const,
      class: "Hard",
      type: "Industrial",
      marketType: "Spot"
    },
    { 
      name: "Commodity2", 
      averagePrice: 30, 
      priceTrend: "Down" as const,
      class: "Soft",
      type: "Food",
      marketType: "Futures"
    },
  ]);

  const [roundsHistory, setRoundsHistory] = useState<RoundData[]>([]);
  const [currentRound, setCurrentRound] = useState(1);

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

  const handleSecurityTrade = (trade: Omit<Trade, "id" | "timestamp">) => {
    const security = securities.find(s => s.id === trade.securityId);
    if (!security) return;

    const impact = calculateMarketImpact(security, trade);
    const updatedSecurity = updateSecurityPrice(security, impact);

    setSecurities(securities.map(s => 
      s.id === security.id ? updatedSecurity : s
    ));

    const tradeValue = trade.price * trade.quantity;
    setAgents(agents.map(agent => {
      if (agent.name === trade.buyerId) {
        return { ...agent, cash: agent.cash - tradeValue };
      }
      if (agent.name === trade.sellerId) {
        return { ...agent, cash: agent.cash + tradeValue };
      }
      return agent;
    }));
  };

  const simulateNewRound = () => {
    const {
      updatedSecurities,
      updatedCommodities,
      updatedAgents,
      newRoundData
    } = simulateRound(currentRound, agents, commodities, securities, roundsHistory);

    setRoundsHistory(prev => [...prev, newRoundData]);
    setCurrentRound(prev => prev + 1);
    setAgents(updatedAgents);
    setCommodities(updatedCommodities);
    setSecurities(updatedSecurities);

    toast({
      title: "Simulation Round Complete",
      description: "Market conditions have been updated.",
    });
  };

  const handleAgentEdit = (updatedAgent: Agent) => {
    setAgents(agents.map(agent => 
      agent.name === updatedAgent.name ? updatedAgent : agent
    ));
    toast({
      title: "Agent Updated",
      description: `${updatedAgent.name} has been updated successfully.`,
    });
  };

  const handleCommodityEdit = (updatedCommodity: Commodity) => {
    setCommodities(commodities.map(commodity => 
      commodity.name === updatedCommodity.name ? updatedCommodity : commodity
    ));
    toast({
      title: "Commodity Updated",
      description: `${updatedCommodity.name} has been updated successfully.`,
    });
  };

  const handleAddAgent = () => {
    if (!newAgent.name || !newAgent.class) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const agent: Agent = {
      ...newAgent,
      lastRoundDifference: 0,
      bookkeeping: new Bookkeeping(),
    };

    setAgents([...agents, agent]);
    setNewAgent({ name: "", cash: 1000, class: "", bookkeeping: new Bookkeeping(), inventory: [], production: [] });
    toast({
      title: "Agent Added",
      description: `${agent.name} has been added successfully.`,
    });
  };

  const handleAddCommodity = () => {
    if (!newCommodity.name) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const commodity: Commodity = {
      ...newCommodity,
      priceTrend: "Up",
    };

    setCommodities([...commodities, commodity]);
    setNewCommodity({ 
      name: "", 
      averagePrice: 0,
      class: "Hard",
      type: "Industrial",
      marketType: "Spot"
    });
    toast({
      title: "Commodity Added",
      description: `${commodity.name} has been added successfully.`,
    });
  };

  return (
    <SimulatorDashboard
      agents={agents}
      commodities={commodities}
      securities={securities}
      roundsHistory={roundsHistory}
      newAgent={newAgent}
      newCommodity={newCommodity}
      onSimulate={simulateNewRound}
      onAgentEdit={handleAgentEdit}
      onCommodityEdit={handleCommodityEdit}
      onSecurityTrade={handleSecurityTrade}
      onAddAgent={handleAddAgent}
      onAddCommodity={handleAddCommodity}
      setNewAgent={setNewAgent}
      setNewCommodity={setNewCommodity}
    />
  );
};

export default Index;