import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { LanguageSelector } from "./LanguageSelector";
import { DEFAULT_JS_STRATEGY, DEFAULT_TS_STRATEGY, DEFAULT_YAML_STRATEGY, DEFAULT_PYTHON_STRATEGY } from "./defaultStrategies";

interface AgentCodeEditorProps {
  agentName: string;
  onSaveStrategy: (strategy: string) => void;
}

export const AgentCodeEditor = ({ agentName, onSaveStrategy }: AgentCodeEditorProps) => {
  const [language, setLanguage] = useState<"javascript" | "typescript" | "python" | "yaml">("javascript");
  const [code, setCode] = useState(DEFAULT_JS_STRATEGY);
  const { toast } = useToast();

  const handleLanguageChange = (newLanguage: "javascript" | "typescript" | "python" | "yaml") => {
    try {
      switch (newLanguage) {
        case "javascript":
          setCode(DEFAULT_JS_STRATEGY);
          break;
        case "typescript":
          setCode(DEFAULT_TS_STRATEGY);
          break;
        case "python":
          setCode(DEFAULT_PYTHON_STRATEGY);
          break;
        case "yaml":
          setCode(DEFAULT_YAML_STRATEGY);
          break;
      }
      setLanguage(newLanguage);
    } catch (error) {
      toast({
        title: "Error Converting Strategy",
        description: "Could not convert between formats. Using default strategy.",
        variant: "destructive"
      });
    }
  };

  const getMonacoLanguage = (lang: string) => {
    switch (lang) {
      case "javascript":
        return "javascript";
      case "typescript":
        return "typescript";
      case "python":
        return "python";
      case "yaml":
        return "yaml";
      default:
        return "javascript";
    }
  };

  const validateStrategy = (code: string, language: string) => {
    try {
      if (language === "yaml") {
        yaml.load(code);
      } else {
        // For other languages, basic syntax check
        new Function(code);
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleSave = () => {
    if (validateStrategy(code, language)) {
      onSaveStrategy(JSON.stringify({ language, code }));
      toast({
        title: "Strategy Saved",
        description: `Trading strategy for ${agentName} has been updated.`
      });
    } else {
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
          Write a trading strategy using {language} that receives agent and market information and returns trading decisions.
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="flex justify-between items-center">
          <LanguageSelector value={language} onChange={handleLanguageChange} />
        </div>
        <Editor
          height="400px"
          defaultLanguage={getMonacoLanguage(language)}
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