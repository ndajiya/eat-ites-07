import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AGENT_CLASSES } from "@/types/agentClasses";
import { COMMODITY_CLASSES, COMMODITY_TYPES } from "@/types/commodityTypes";
import { SECURITY_CLASS_INFO, SECURITY_TYPE_INFO } from "@/components/simulator/SecurityDialog/securityInfo";

export const Documentation = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Simulator Documentation</h1>
      
      <Tabs defaultValue="agents" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="agents">Agent Classes</TabsTrigger>
          <TabsTrigger value="commodities">Commodity Classes</TabsTrigger>
          <TabsTrigger value="markets">Market Types</TabsTrigger>
          <TabsTrigger value="securities">Securities</TabsTrigger>
        </TabsList>

        <TabsContent value="agents" className="mt-6">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Agent Classes</h2>
            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-6">
                {Object.entries(AGENT_CLASSES).map(([key, agent]) => (
                  <div key={key} className="space-y-2">
                    <h3 className="text-xl font-medium">{agent.name}</h3>
                    <p className="text-muted-foreground">{agent.description}</p>
                    
                    <div className="mt-2">
                      <h4 className="font-medium">Roles:</h4>
                      <ul className="list-disc pl-6">
                        {agent.roles.map((role, index) => (
                          <li key={index}>{role}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-2">
                      <h4 className="font-medium">Examples:</h4>
                      <ul className="list-disc pl-6">
                        {agent.examples.map((example, index) => (
                          <li key={index}>{example}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-2">
                      <h4 className="font-medium">Trading Strategy:</h4>
                      <p className="capitalize">{agent.tradingStrategy}</p>
                      <p>Risk Tolerance: {agent.riskTolerance * 100}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </TabsContent>

        <TabsContent value="commodities" className="mt-6">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Commodity Classes and Types</h2>
            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-medium mb-4">Commodity Classes</h3>
                  <div className="space-y-6">
                    {Object.entries(COMMODITY_CLASSES).map(([key, commodity]) => (
                      <div key={key} className="space-y-2">
                        <h4 className="font-medium">{commodity.name}</h4>
                        <p className="text-muted-foreground">{commodity.description}</p>
                        
                        <div>
                          <h5 className="font-medium">Characteristics:</h5>
                          <ul className="list-disc pl-6">
                            {commodity.characteristics.map((char, index) => (
                              <li key={index}>{char}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h5 className="font-medium">Examples:</h5>
                          <ul className="list-disc pl-6">
                            {commodity.examples.map((example, index) => (
                              <li key={index}>{example}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-4">Commodity Types</h3>
                  <div className="space-y-6">
                    {Object.entries(COMMODITY_TYPES).map(([key, type]) => (
                      <div key={key} className="space-y-2">
                        <h4 className="font-medium">{type.name}</h4>
                        <p className="text-muted-foreground">{type.description}</p>
                        
                        <div>
                          <h5 className="font-medium">Market Characteristics:</h5>
                          <ul className="list-disc pl-6">
                            {type.marketCharacteristics.map((char, index) => (
                              <li key={index}>{char}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h5 className="font-medium">Examples:</h5>
                          <ul className="list-disc pl-6">
                            {type.examples.map((example, index) => (
                              <li key={index}>{example}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>
          </Card>
        </TabsContent>

        <TabsContent value="markets" className="mt-6">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Market Types</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-medium">Spot Market</h3>
                <p className="text-muted-foreground">Spot markets involve the immediate exchange of commodities for cash, with delivery typically occurring within a few days.</p>
                <div className="mt-2">
                  <h4 className="font-medium">Characteristics:</h4>
                  <ul className="list-disc pl-6">
                    <li>Immediate or near-immediate delivery</li>
                    <li>Current market prices</li>
                    <li>Direct physical trading</li>
                    <li>Lower price volatility</li>
                    <li>Suitable for immediate needs</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-medium">Futures Market</h3>
                <p className="text-muted-foreground">Futures markets involve contracts for future delivery of commodities at predetermined prices, used for hedging and speculation.</p>
                <div className="mt-2">
                  <h4 className="font-medium">Characteristics:</h4>
                  <ul className="list-disc pl-6">
                    <li>Future delivery dates</li>
                    <li>Price locked in advance</li>
                    <li>Standardized contracts</li>
                    <li>Higher price volatility</li>
                    <li>Used for risk management</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="securities" className="mt-6">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Securities</h2>
            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-medium mb-4">Security Classes</h3>
                  <div className="space-y-6">
                    {Object.entries(SECURITY_CLASS_INFO).map(([key, security]) => (
                      <div key={key} className="space-y-2">
                        <h4 className="font-medium">{key}</h4>
                        <p className="text-muted-foreground">{security.description}</p>
                        
                        <div>
                          <h5 className="font-medium">Characteristics:</h5>
                          <ul className="list-disc pl-6">
                            {security.characteristics.map((char, index) => (
                              <li key={index}>{char}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-4">Security Types</h3>
                  <div className="space-y-6">
                    {Object.entries(SECURITY_TYPE_INFO).map(([key, type]) => (
                      <div key={key} className="space-y-2">
                        <h4 className="font-medium">{key}</h4>
                        <p className="text-muted-foreground">{type.description}</p>
                        
                        <div>
                          <h5 className="font-medium">Characteristics:</h5>
                          <ul className="list-disc pl-6">
                            {type.characteristics.map((char, index) => (
                              <li key={index}>{char}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Documentation;