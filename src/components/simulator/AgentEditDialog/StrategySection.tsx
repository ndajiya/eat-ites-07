import { Button } from "@/components/ui/button";
import { Code } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { AgentCodeEditor } from "../AgentProgramming/AgentCodeEditor";
import { useState } from "react";

interface StrategySectionProps {
  agentName: string;
  onSaveStrategy: (strategy: string) => void;
}

export const StrategySection = ({ agentName, onSaveStrategy }: StrategySectionProps) => {
  const [showCodeEditor, setShowCodeEditor] = useState(false);

  return (
    <>
      <Button 
        variant="outline" 
        className="w-full"
        onClick={() => setShowCodeEditor(true)}
      >
        <Code className="w-4 h-4 mr-2" />
        Program Trading Strategy
      </Button>

      <Dialog open={showCodeEditor} onOpenChange={setShowCodeEditor}>
        <AgentCodeEditor
          agentName={agentName}
          onSaveStrategy={(strategy) => {
            onSaveStrategy(strategy);
            setShowCodeEditor(false);
          }}
        />
      </Dialog>
    </>
  );
};