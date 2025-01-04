import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AgentClassesSection } from "@/components/documentation/AgentClassesSection";
import { CommoditiesSection } from "@/components/documentation/CommoditiesSection";
import { SecuritiesSection } from "@/components/documentation/SecuritiesSection";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Documentation = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Simulator Documentation</h1>
        <Link to="/simulator">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            Launch Simulator
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
      
      <Tabs defaultValue="agents" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="agents">Agent Classes</TabsTrigger>
          <TabsTrigger value="commodities">Commodities</TabsTrigger>
          <TabsTrigger value="securities">Securities</TabsTrigger>
          <TabsTrigger value="trading">Trading</TabsTrigger>
        </TabsList>

        <TabsContent value="agents" className="mt-6">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Agent Classes</h2>
            <AgentClassesSection />
          </Card>
        </TabsContent>

        <TabsContent value="commodities" className="mt-6">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Commodities</h2>
            <CommoditiesSection />
          </Card>
        </TabsContent>

        <TabsContent value="securities" className="mt-6">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Securities</h2>
            <SecuritiesSection />
          </Card>
        </TabsContent>

        <TabsContent value="trading" className="mt-6">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Trading System</h2>
            <div className="space-y-6">
              <section>
                <h3 className="text-xl font-semibold mb-3">Trade Processing</h3>
                <p className="text-gray-700 mb-4">
                  The trading system uses a combination of rational agent behavior modeling and market dynamics to simulate realistic trading patterns. Here's how it works:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Agents make trading decisions based on current prices, average prices, and their trading strategy (aggressive, conservative, or balanced)</li>
                  <li>Each agent's decisions are influenced by their available cash, current inventory, and risk tolerance based on their class</li>
                  <li>The system calculates optimal trade quantities considering portfolio diversification and utility maximization</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-3">Price Impact</h3>
                <p className="text-gray-700 mb-4">
                  Trading activities influence commodity prices through various factors:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Market factors including seasonality, geopolitical risk, and supply constraints</li>
                  <li>Trading volume and historical price trends</li>
                  <li>Specific characteristics of commodity classes and types</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-3">Transaction Recording</h3>
                <p className="text-gray-700 mb-4">
                  All trades are recorded in the agent's bookkeeping system with detailed information:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Transaction date and time</li>
                  <li>Trade amount and type (buy/sell)</li>
                  <li>Detailed description for audit purposes</li>
                  <li>Impact on agent's inventory and cash position</li>
                </ul>
              </section>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Documentation;