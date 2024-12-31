import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
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
  const [marketVolatility, setMarketVolatility] = useState([50]);
  const [economicGrowth, setEconomicGrowth] = useState([50]);
  const [geopoliticalRisk, setGeopoliticalRisk] = useState([50]);
  const [regulatoryPressure, setRegulatoryPressure] = useState([50]);

  const handleSliderChange = (factor: string, newValue: number[]) => {
    switch (factor) {
      case "Market Volatility":
        setMarketVolatility(newValue);
        break;
      case "Economic Growth":
        setEconomicGrowth(newValue);
        break;
      case "Geopolitical Risk":
        setGeopoliticalRisk(newValue);
        break;
      case "Regulatory Pressure":
        setRegulatoryPressure(newValue);
        break;
    }
    onFactorChange(factor, newValue[0]);
  };

  const factors = [
    {
      name: "Market Volatility",
      value: marketVolatility,
      setValue: (value: number[]) => handleSliderChange("Market Volatility", value),
      tooltip: "Affects price fluctuations and trading patterns",
    },
    {
      name: "Economic Growth",
      value: economicGrowth,
      setValue: (value: number[]) => handleSliderChange("Economic Growth", value),
      tooltip: "Influences overall market expansion and opportunities",
    },
    {
      name: "Geopolitical Risk",
      value: geopoliticalRisk,
      setValue: (value: number[]) => handleSliderChange("Geopolitical Risk", value),
      tooltip: "Impacts market stability and international trade",
    },
    {
      name: "Regulatory Pressure",
      value: regulatoryPressure,
      setValue: (value: number[]) => handleSliderChange("Regulatory Pressure", value),
      tooltip: "Affects compliance costs and market restrictions",
    },
  ];

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <h3 className="text-lg font-semibold">Environmental Controls</h3>
      </CardHeader>
      <CardContent className="space-y-6">
        {factors.map((factor) => (
          <div key={factor.name} className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{factor.name}</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{factor.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Slider
              value={factor.value}
              onValueChange={factor.setValue}
              max={100}
              step={1}
              className="w-full"
            />
            <div className="text-sm text-muted-foreground text-right">
              {factor.value}%
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};