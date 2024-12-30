import { ScrollArea } from "@/components/ui/scroll-area";
import { AGENT_CLASSES } from "@/types/agentClasses";

export const AgentClassesSection = () => {
  return (
    <ScrollArea className="h-[600px] pr-4">
      <div className="space-y-6">
        {Object.entries(AGENT_CLASSES).map(([key, agent]) => (
          <div key={key} className="space-y-2 border-b pb-4 last:border-0">
            <h3 className="text-xl font-medium text-primary">{agent.name}</h3>
            <div className="rounded-lg bg-muted p-4">
              <code className="text-sm">{key}</code>
            </div>
            <p className="text-muted-foreground">{agent.description}</p>
            
            <div className="mt-4">
              <h4 className="font-medium text-primary">Properties</h4>
              <div className="mt-2 space-y-2">
                <div>
                  <span className="font-mono text-sm">roles</span>
                  <ul className="list-disc pl-6 text-muted-foreground">
                    {agent.roles.map((role, index) => (
                      <li key={index}>{role}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="font-mono text-sm">examples</span>
                  <ul className="list-disc pl-6 text-muted-foreground">
                    {agent.examples.map((example, index) => (
                      <li key={index}>{example}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="font-mono text-sm">tradingStrategy</span>
                  <p className="text-muted-foreground capitalize">{agent.tradingStrategy}</p>
                </div>
                <div>
                  <span className="font-mono text-sm">riskTolerance</span>
                  <p className="text-muted-foreground">{agent.riskTolerance * 100}%</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};