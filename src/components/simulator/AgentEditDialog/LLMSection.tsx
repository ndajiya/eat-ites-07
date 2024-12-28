import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Brain } from "lucide-react";
import { useState } from "react";
import { Agent } from "@/types/simulator";
import { LLMConfigDialog, LLMConfig } from "../AgentProgramming/LLMConfigDialog";

interface LLMSectionProps {
  agent: Agent;
  onAgentChange: (agent: Agent) => void;
}

export const LLMSection = ({ agent, onAgentChange }: LLMSectionProps) => {
  const [showLLMConfig, setShowLLMConfig] = useState(false);

  const handleLLMConfigSave = (config: LLMConfig) => {
    onAgentChange({
      ...agent,
      llmConfig: config
    });
    setShowLLMConfig(false);
  };

  return (
    <div className="space-y-2">
      <Button 
        variant="outline" 
        className="w-full"
        onClick={() => setShowLLMConfig(true)}
      >
        <Brain className="w-4 h-4 mr-2" />
        Configure LLM
      </Button>

      <Dialog open={showLLMConfig} onOpenChange={setShowLLMConfig}>
        <LLMConfigDialog onSave={handleLLMConfigSave} />
      </Dialog>
    </div>
  );
};