import { SimulationControls } from "../SimulationControls";
import { Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { EnvironmentalControls } from "../EnvironmentalControls";
import { useToast } from "@/components/ui/use-toast";

export const DashboardHeader = ({ onSimulate }: { onSimulate: () => Promise<void> }) => {
  const { toast } = useToast();

  const handleEnvironmentalFactorChange = (factor: string, value: number) => {
    toast({
      title: "Environmental Factor Updated",
      description: `${factor} has been set to ${value}%`,
    });
  };

  return (
    <div className="flex justify-between items-center">
      <SimulationControls onSimulate={onSimulate} />
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon" className="ml-2">
            <Settings2 className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <EnvironmentalControls onFactorChange={handleEnvironmentalFactorChange} />
        </PopoverContent>
      </Popover>
    </div>
  );
};