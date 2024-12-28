import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Agent } from "@/types/simulator"
import { BasicInfoSection } from "./BasicInfoSection"
import { InventorySection } from "./InventorySection"
import { MonetaryPolicySection } from "./MonetaryPolicySection"
import { StrategySection } from "./StrategySection"
import { Dialog } from "@/components/ui/dialog"
import { LLMConfigDialog, LLMConfig } from "../AgentProgramming/LLMConfigDialog"
import { Brain } from "lucide-react"
import { useState } from "react"

interface AgentEditDialogProps {
  agent: Agent | null
  onAgentChange: (agent: Agent) => void
  onSave: (agent: Agent) => void
}

export const AgentEditDialog = ({ agent, onAgentChange, onSave }: AgentEditDialogProps) => {
  const [showLLMConfig, setShowLLMConfig] = useState(false)
  
  if (!agent) return null

  const handleLLMConfigSave = (config: LLMConfig) => {
    onAgentChange({
      ...agent,
      llmConfig: config
    })
    setShowLLMConfig(false)
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Agent</DialogTitle>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <BasicInfoSection agent={agent} onAgentChange={onAgentChange} />
        <InventorySection agent={agent} onAgentChange={onAgentChange} />
        <MonetaryPolicySection agent={agent} onAgentChange={onAgentChange} />
        <StrategySection agentName={agent.name} onSaveStrategy={(strategy) => {
          onAgentChange({
            ...agent,
            tradingStrategy: strategy
          })
        }} />
        
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => setShowLLMConfig(true)}
        >
          <Brain className="w-4 h-4 mr-2" />
          Configure LLM
        </Button>

        <Button 
          className="w-full" 
          onClick={() => onSave(agent)}
        >
          Save Changes
        </Button>
      </div>

      <Dialog open={showLLMConfig} onOpenChange={setShowLLMConfig}>
        <LLMConfigDialog onSave={handleLLMConfigSave} />
      </Dialog>
    </DialogContent>
  )
}