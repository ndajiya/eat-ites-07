import { useState } from "react";
import { SimulatorHeader } from "./SimulatorHeader";
import { useToast } from "@/components/ui/use-toast";

interface SimulationControlsProps {
  onSimulate: () => Promise<void>;
}

export const SimulationControls = ({ onSimulate }: SimulationControlsProps) => {
  const [isSimulating, setIsSimulating] = useState(false);
  const { toast } = useToast();

  const handleSimulate = async () => {
    try {
      setIsSimulating(true);
      await onSimulate();
      toast({
        title: "Simulation Complete",
        description: "The market has been updated with new data.",
      });
    } catch (error) {
      toast({
        title: "Simulation Failed",
        description: "An error occurred during simulation.",
        variant: "destructive",
      });
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <SimulatorHeader onSimulate={handleSimulate} isSimulating={isSimulating} />
  );
};