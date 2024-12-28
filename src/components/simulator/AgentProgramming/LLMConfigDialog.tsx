import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"

type LLMProvider = "openai" | "perplexity" | "huggingface"

interface LLMConfigDialogProps {
  onSave: (config: LLMConfig) => void
}

export interface LLMConfig {
  provider: LLMProvider
  model: string
  apiKey?: string
}

export const LLMConfigDialog = ({ onSave }: LLMConfigDialogProps) => {
  const [provider, setProvider] = useState<LLMProvider>("openai")
  const [model, setModel] = useState("")
  const [apiKey, setApiKey] = useState("")
  const { toast } = useToast()

  const getModelsForProvider = (provider: LLMProvider) => {
    switch (provider) {
      case "openai":
        return ["gpt-4o", "gpt-4o-mini"]
      case "perplexity":
        return [
          "llama-3.1-sonar-small-128k-online",
          "llama-3.1-sonar-large-128k-online",
          "llama-3.1-sonar-huge-128k-online",
        ]
      case "huggingface":
        return ["mixedbread-ai/mxbai-embed-xsmall-v1"]
      default:
        return []
    }
  }

  const handleSave = () => {
    if (!model) {
      toast({
        title: "Error",
        description: "Please select a model",
        variant: "destructive",
      })
      return
    }

    if (!apiKey) {
      toast({
        title: "Error",
        description: "Please enter an API key",
        variant: "destructive",
      })
      return
    }

    onSave({
      provider,
      model,
      apiKey,
    })

    toast({
      title: "Success",
      description: "LLM configuration saved",
    })
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Configure LLM</DialogTitle>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <label>Provider</label>
          <Select
            value={provider}
            onValueChange={(value) => {
              setProvider(value as LLMProvider)
              setModel("")
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select provider" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="openai">OpenAI</SelectItem>
              <SelectItem value="perplexity">Perplexity</SelectItem>
              <SelectItem value="huggingface">Hugging Face</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label>Model</label>
          <Select value={model} onValueChange={setModel}>
            <SelectTrigger>
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent>
              {getModelsForProvider(provider).map((model) => (
                <SelectItem key={model} value={model}>
                  {model}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label>API Key</label>
          <Input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your API key"
          />
        </div>

        <Button onClick={handleSave} className="w-full">
          Save Configuration
        </Button>
      </div>
    </DialogContent>
  )
}