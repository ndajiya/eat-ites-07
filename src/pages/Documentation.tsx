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
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="agents">Agent Classes</TabsTrigger>
          <TabsTrigger value="commodities">Commodities</TabsTrigger>
          <TabsTrigger value="securities">Securities</TabsTrigger>
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
      </Tabs>
    </div>
  );
};

export default Documentation;