import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Agent, Commodity } from "@/types/simulator";

interface RoundData {
  round: number;
  agents: {
    name: string;
    cash: number;
    difference: number;
  }[];
  commodities: {
    name: string;
    price: number;
  }[];
}

interface StatsDashboardProps {
  roundsHistory: RoundData[];
  agents: Agent[];
  commodities: Commodity[];
}

export const StatsDashboard = ({ roundsHistory, agents, commodities }: StatsDashboardProps) => {
  const agentData = agents.map(agent => ({
    name: agent.name,
    data: roundsHistory.map(round => ({
      round: round.round,
      cash: round.agents.find(a => a.name === agent.name)?.cash || 0,
    })),
  }));

  const commodityData = commodities.map(commodity => ({
    name: commodity.name,
    data: roundsHistory.map(round => ({
      round: round.round,
      price: round.commodities.find(c => c.name === commodity.name)?.price || 0,
    })),
  }));

  return (
    <Card className="glass-card p-4 sm:p-6 space-y-4">
      <h2 className="text-xl sm:text-2xl font-semibold">Statistics Dashboard</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Agent Cash Over Time</h3>
          <ScrollArea className="w-full">
            <div className="min-w-[600px] h-[300px]">
              <LineChart width={600} height={300} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="round" />
                <YAxis />
                <Tooltip />
                <Legend />
                {agentData.map((agent, index) => (
                  <Line
                    key={agent.name}
                    type="monotone"
                    data={agent.data}
                    dataKey="cash"
                    name={agent.name}
                    stroke={`hsl(${index * 60}, 70%, 50%)`}
                  />
                ))}
              </LineChart>
            </div>
          </ScrollArea>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Commodity Prices Over Time</h3>
          <ScrollArea className="w-full">
            <div className="min-w-[600px] h-[300px]">
              <LineChart width={600} height={300} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="round" />
                <YAxis />
                <Tooltip />
                <Legend />
                {commodityData.map((commodity, index) => (
                  <Line
                    key={commodity.name}
                    type="monotone"
                    data={commodity.data}
                    dataKey="price"
                    name={commodity.name}
                    stroke={`hsl(${index * 60 + 120}, 70%, 50%)`}
                  />
                ))}
              </LineChart>
            </div>
          </ScrollArea>
        </div>
      </div>
    </Card>
  );
};