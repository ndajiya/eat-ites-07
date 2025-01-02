import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Agent } from "@/types/simulator";
import { AgentTable } from "./AgentTable";
import { CommodityTable } from "./CommodityTable";
import { SecuritiesTable } from "./SecuritiesTable";
import { FirmsTab } from "./tabs/FirmsTab";
import { PlaceholderTab } from "./tabs/PlaceholderTab";

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
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Market Simulator</h2>
        <div className="relative w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search..." className="pl-8" />
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
          <PlaceholderTab message="Central Banks data will be implemented in the next phase" />
        </TabsContent>

        <TabsContent value="governments" className="mt-6">
          <PlaceholderTab message="Governments data will be implemented in the next phase" />
        </TabsContent>

        <TabsContent value="firms" className="mt-6">
          <FirmsTab />
        </TabsContent>

        <TabsContent value="individuals" className="mt-6">
          <AgentTable 
            agents={agents.filter(agent => agent.class === "Households")}
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