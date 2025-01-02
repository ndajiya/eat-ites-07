import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import { Agent } from "@/types/simulator";
import { AgentTable } from "./AgentTable";
import { CommodityTable } from "./CommodityTable";
import { SecuritiesTable } from "./SecuritiesTable";
import { FirmsTab } from "./tabs/FirmsTab";
import { PlaceholderTab } from "./tabs/PlaceholderTab";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { AddAgentDialog } from "./AddAgentDialog";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Bookkeeping } from "@/utils/Bookkeeping";

interface MarketViewProps {
  agents: Agent[];
  commodities: any[];
  securities: any[];
  onAgentEdit: (agent: Agent) => void;
  onAgentDelete: (agentName: string) => void;
  onCommodityEdit: (commodity: any) => void;
  onSecurityTrade: (trade: any) => void;
}

export const MarketView = ({
  agents,
  commodities,
  securities,
  onAgentEdit,
  onAgentDelete,
  onCommodityEdit,
  onSecurityTrade
}: MarketViewProps) => {
  const [newAgent, setNewAgent] = useState<Omit<Agent, "lastRoundDifference">>({
    name: "",
    cash: 1000,
    class: "",
    bookkeeping: new Bookkeeping(),
    inventory: [],
    production: [],
  });
  const { toast } = useToast();

  const handleAddAgent = () => {
    const agentWithDifference = {
      ...newAgent,
      lastRoundDifference: 0,
    };
    onAgentEdit(agentWithDifference);
    setNewAgent({
      name: "",
      cash: 1000,
      class: "",
      bookkeeping: new Bookkeeping(),
      inventory: [],
      production: [],
    });
    toast({
      title: "Agent Added",
      description: `${newAgent.name} has been added to the simulation.`,
    });
  };

  // Helper function to filter agents by class
  const filterAgentsByClass = (agents: Agent[], classes: string[]) => {
    return agents.filter(agent => classes.includes(agent.class));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Market Simulator</h2>
        <div className="flex items-center gap-4">
          <div className="relative w-72">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-8" />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <AddAgentDialog
              newAgent={newAgent}
              onAgentNameChange={(value) => setNewAgent({ ...newAgent, name: value })}
              onAgentCashChange={(value) => setNewAgent({ ...newAgent, cash: value })}
              onAgentClassChange={(value) => setNewAgent({ ...newAgent, class: value })}
              onAddAgent={handleAddAgent}
            />
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="firms" className="w-full">
        <TabsList className="w-full justify-start border-b rounded-none h-12 bg-background">
          <TabsTrigger value="central-banks" className="data-[state=active]:bg-background">
            Central Banks
          </TabsTrigger>
          <TabsTrigger value="governments" className="data-[state=active]:bg-background">
            Governments
          </TabsTrigger>
          <TabsTrigger value="firms" className="data-[state=active]:bg-background">
            Firms
          </TabsTrigger>
          <TabsTrigger value="individuals" className="data-[state=active]:bg-background">
            Individuals
          </TabsTrigger>
          <TabsTrigger value="commodities" className="data-[state=active]:bg-background">
            Commodities
          </TabsTrigger>
          <TabsTrigger value="securities" className="data-[state=active]:bg-background">
            Securities
          </TabsTrigger>
        </TabsList>

        <TabsContent value="central-banks" className="mt-6">
          <AgentTable 
            agents={filterAgentsByClass(agents, ["Central Bank"])}
            onAgentEdit={onAgentEdit}
            onAgentDelete={onAgentDelete}
          />
        </TabsContent>

        <TabsContent value="governments" className="mt-6">
          <AgentTable 
            agents={filterAgentsByClass(agents, ["Government"])}
            onAgentEdit={onAgentEdit}
            onAgentDelete={onAgentDelete}
          />
        </TabsContent>

        <TabsContent value="firms" className="mt-6">
          <AgentTable 
            agents={filterAgentsByClass(agents, ["Firms"])}
            onAgentEdit={onAgentEdit}
            onAgentDelete={onAgentDelete}
          />
        </TabsContent>

        <TabsContent value="individuals" className="mt-6">
          <AgentTable 
            agents={filterAgentsByClass(agents, ["Households", "Traders"])}
            onAgentEdit={onAgentEdit}
            onAgentDelete={onAgentDelete}
          />
        </TabsContent>

        <TabsContent value="commodities" className="mt-6">
          <CommodityTable 
            commodities={commodities}
            onCommodityEdit={onCommodityEdit}
          />
        </TabsContent>

        <TabsContent value="securities" className="mt-6">
          <SecuritiesTable 
            securities={securities}
            agents={agents}
            onTrade={onSecurityTrade}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};