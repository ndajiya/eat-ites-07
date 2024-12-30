import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface EnvironmentalControlsProps {
  onFactorChange: (factor: string, value: number) => void;
}

export const EnvironmentalControls = ({ onFactorChange }: EnvironmentalControlsProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Environmental Factors
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Adjust market conditions to influence simulation outcomes</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label>Market Volatility</label>
            <span className="text-sm text-muted-foreground">Affects price fluctuations</span>
          </div>
          <Slider
            defaultValue={[50]}
            max={100}
            step={1}
            onValueChange={(value) => onFactorChange("volatility", value[0])}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label>Economic Growth Rate</label>
            <span className="text-sm text-muted-foreground">Influences market expansion</span>
          </div>
          <Slider
            defaultValue={[30]}
            max={100}
            step={1}
            onValueChange={(value) => onFactorChange("growth", value[0])}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label>Geopolitical Risk</label>
            <span className="text-sm text-muted-foreground">Impacts market stability</span>
          </div>
          <Slider
            defaultValue={[20]}
            max={100}
            step={1}
            onValueChange={(value) => onFactorChange("risk", value[0])}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label>Regulatory Pressure</label>
            <span className="text-sm text-muted-foreground">Affects market constraints</span>
          </div>
          <Slider
            defaultValue={[40]}
            max={100}
            step={1}
            onValueChange={(value) => onFactorChange("regulation", value[0])}
          />
        </div>
      </CardContent>
    </Card>
  );
};