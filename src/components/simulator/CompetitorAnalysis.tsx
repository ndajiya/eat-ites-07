import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from "recharts";
import { Agent } from "@/types/simulator";
import { getInventoryStats } from "@/utils/inventoryManagement";

interface CompetitorAnalysisProps {
  agents: Agent[];
}

export const CompetitorAnalysis = ({ agents }: CompetitorAnalysisProps) => {
  const marketShareData = agents.map(agent => ({
    name: agent.name,
    inventoryValue: getInventoryStats(agent.inventory).totalValue,
    cash: agent.cash,
    totalAssets: getInventoryStats(agent.inventory).totalValue + agent.cash
  }));

  const performanceData = agents.map(agent => ({
    name: agent.name,
    lastRoundChange: agent.lastRoundDifference,
    inventoryItems: getInventoryStats(agent.inventory).totalItems,
    uniqueCommodities: getInventoryStats(agent.inventory).uniqueItems
  }));

  return (
    <Card className="glass-card p-4 sm:p-6 space-y-6">
      <h2 className="text-xl sm:text-2xl font-semibold">Competitor Analysis</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Market Share Distribution</h3>
          <ScrollArea className="w-full">
            <div className="min-w-[600px] h-[300px]">
              <BarChart width={600} height={300} data={marketShareData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="inventoryValue" name="Inventory Value" fill="#8884d8" />
                <Bar dataKey="cash" name="Cash" fill="#82ca9d" />
              </BarChart>
            </div>
          </ScrollArea>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Performance Metrics</h3>
          <ScrollArea className="w-full">
            <div className="min-w-[600px] h-[300px]">
              <BarChart width={600} height={300} data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="lastRoundChange" name="Last Round P/L" fill="#ff7300" />
                <Bar dataKey="inventoryItems" name="Total Items" fill="#387908" />
                <Bar dataKey="uniqueCommodities" name="Unique Commodities" fill="#38085f" />
              </BarChart>
            </div>
          </ScrollArea>
        </div>
      </div>
    </Card>
  );
};