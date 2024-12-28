import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Brain } from "lucide-react";
import { useState } from "react";
import { Agent } from "@/types/simulator";
import { LLMConfigDialog, LLMConfig } from "../AgentProgramming/LLMConfigDialog";
import { useToast } from "@/components/ui/use-toast";

interface LLMSectionProps {
  agent: Agent;
  onAgentChange: (agent: Agent) => void;
}

export const LLMSection = ({ agent, onAgentChange }: LLMSectionProps) => {
  const [showLLMConfig, setShowLLMConfig] = useState(false);
  const { toast } = useToast();

  const handleLLMConfigSave = (config: LLMConfig) => {
    onAgentChange({
      ...agent,
      llmConfig: config
    });
    setShowLLMConfig(false);
    toast({
      title: "LLM Configuration Saved",
      description: `Successfully configured ${config.provider} for ${agent.name}`,
    });
  };

  return (
    <div className="space-y-2">
      <Button 
        variant="outline" 
        className="w-full flex items-center justify-center"
        onClick={() => setShowLLMConfig(true)}
      >
        <Brain className="w-4 h-4 mr-2" />
        Configure LLM
      </Button>

      <Dialog open={showLLMConfig} onOpenChange={setShowLLMConfig}>
        <DialogContent>
          <LLMConfigDialog onSave={handleLLMConfigSave} />
        </DialogContent>
      </Dialog>
    </div>
  );
};