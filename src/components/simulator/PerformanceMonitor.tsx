import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { RoundData } from "@/types/simulator";

interface PerformanceMetrics {
  round: number;
  averageAgentCash: number;
  totalMarketValue: number;
  transactionVolume: number;
  volatilityIndex: number;
}

interface PerformanceMonitorProps {
  roundsHistory: RoundData[];
}

export const PerformanceMonitor = ({ roundsHistory }: PerformanceMonitorProps) => {
  const performanceData: PerformanceMetrics[] = roundsHistory.map(round => {
    const agentCashValues = round.agents.map(a => a.cash);
    const averageAgentCash = agentCashValues.reduce((a, b) => a + b, 0) / agentCashValues.length || 0;
    const totalMarketValue = round.commodities.reduce((sum, c) => sum + c.price, 0);
    
    // Calculate a simple volatility index based on price changes
    const volatilityIndex = round.agents.reduce((sum, agent) => 
      sum + Math.abs(agent.difference || 0), 0) / round.agents.length;

    return {
      round: round.round,
      averageAgentCash,
      totalMarketValue,
      transactionVolume: round.agents.length * round.commodities.length, // Simplified volume metric
      volatilityIndex
    };
  });

  return (
    <Card className="glass-card p-4 sm:p-6 space-y-6">
      <h2 className="text-xl sm:text-2xl font-semibold">Performance Metrics</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Market Overview</h3>
          <ScrollArea className="w-full">
            <div className="min-w-[600px] h-[300px]">
              <LineChart width={600} height={300} data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="round" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="averageAgentCash" 
                  name="Avg Agent Cash" 
                  stroke="#8884d8" 
                />
                <Line 
                  type="monotone" 
                  dataKey="totalMarketValue" 
                  name="Total Market Value" 
                  stroke="#82ca9d" 
                />
                <Line 
                  type="monotone" 
                  dataKey="volatilityIndex" 
                  name="Volatility Index" 
                  stroke="#ffc658" 
                />
              </LineChart>
            </div>
          </ScrollArea>
        </div>
      </div>
    </Card>
  );
};