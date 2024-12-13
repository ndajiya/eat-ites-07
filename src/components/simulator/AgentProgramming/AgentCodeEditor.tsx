import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const DEFAULT_CODE = `// Define your agent's trading strategy here
function tradingStrategy(agent, market) {
  // Example strategy:
  if (agent.cash > 1000) {
    return {
      action: 'buy',
      commodity: 'Commodity1',
      quantity: 10
    };
  }
  return { action: 'hold' };
}`;

interface AgentCodeEditorProps {
  agentName: string;
  onSaveStrategy: (strategy: string) => void;
}

export const AgentCodeEditor = ({ agentName, onSaveStrategy }: AgentCodeEditorProps) => {
  const [code, setCode] = useState(DEFAULT_CODE);
  const { toast } = useToast();

  const handleSave = () => {
    try {
      // Validate the code by attempting to create a function
      new Function("agent", "market", code);
      
      onSaveStrategy(code);
      toast({
        title: "Strategy Saved",
        description: `Trading strategy for ${agentName} has been updated.`
      });
    } catch (error) {
      toast({
        title: "Invalid Code",
        description: "Please check your code for syntax errors.",
        variant: "destructive"
      });
    }
  };

  return (
    <DialogContent className="sm:max-w-[800px]">
      <DialogHeader>
        <DialogTitle>Program Trading Strategy: {agentName}</DialogTitle>
        <DialogDescription>
          Write a trading strategy function that receives agent and market information and returns trading decisions.
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <Editor
          height="400px"
          defaultLanguage="javascript"
          value={code}
          onChange={(value) => setCode(value || "")}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
        <Button onClick={handleSave} className="w-full">
          Save Strategy
        </Button>
      </div>
    </DialogContent>
  );
};