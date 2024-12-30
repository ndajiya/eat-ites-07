import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AgentClassesSection } from "@/components/documentation/AgentClassesSection";
import { CommoditiesSection } from "@/components/documentation/CommoditiesSection";
import { SecuritiesSection } from "@/components/documentation/SecuritiesSection";

export const Documentation = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Simulator Documentation</h1>
      
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