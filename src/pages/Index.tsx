import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { SimulatorDashboard } from "@/components/simulator/SimulatorDashboard";
import { Agent, Commodity, RoundData } from "@/types/simulator";
import { Security, Trade } from "@/types/securities";
import { Bookkeeping } from "@/utils/Bookkeeping";
import { calculateMarketImpact, updateSecurityPrice, generateRandomPriceFluctuation } from "@/utils/marketOperations";

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

    // Update securities
    setSecurities(securities.map(s => 
      s.id === security.id ? updatedSecurity : s
    ));

    // Update agent cash
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

  const simulateRound = () => {
    // Update security prices based on volatility
    const updatedSecurities = securities.map(security => ({
      ...security,
      price: security.price + generateRandomPriceFluctuation(security)
    }));
    setSecurities(updatedSecurities);

    const updatedAgents = agents.map((agent) => {
      const cashChange = Math.floor(Math.random() * 201) - 100;
      const newCash = agent.cash + cashChange;
      
      // Record the transaction in the agent's books
      agent.bookkeeping.addTransaction(
        new Date().toISOString().split('T')[0],
        cashChange >= 0 ? "Revenue" : "Expenses",
        cashChange >= 0 ? "Trading Income" : "Trading Expenses",
        Math.abs(cashChange),
        `Round ${currentRound} trading result`,
        "Increase"
      );

      // Update cash balance
      agent.bookkeeping.addTransaction(
        new Date().toISOString().split('T')[0],
        "Assets",
        "Cash",
        Math.abs(cashChange),
        `Round ${currentRound} cash adjustment`,
        cashChange >= 0 ? "Increase" : "Decrease"
      );

      return {
        ...agent,
        cash: newCash,
        lastRoundDifference: cashChange,
      };
    });

    // Record round history
    const roundData: RoundData = {
      round: currentRound,
      agents: updatedAgents.map(agent => ({
        name: agent.name,
        cash: agent.cash,
        difference: agent.lastRoundDifference,
      })),
      commodities: commodities.map(commodity => ({
        name: commodity.name,
        price: commodity.averagePrice,
      })),
    };

    setRoundsHistory(prev => [...prev, roundData]);
    setCurrentRound(prev => prev + 1);
    setAgents(updatedAgents);
    setCommodities(commodities);

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
      onSimulate={simulateRound}
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
