import { Commodity } from "@/types/simulator";
import { useToast } from "@/components/ui/use-toast";
import { useCallback } from "react";

export const useCommodityHandlers = (
  setCommodities: React.Dispatch<React.SetStateAction<Commodity[]>>,
  setNewCommodity: (commodity: Omit<Commodity, "priceTrend">) => void,
) => {
  const { toast } = useToast();

  const handleCommodityEdit = useCallback((updatedCommodity: Commodity) => {
    setCommodities(prevCommodities => 
      prevCommodities.map(commodity => 
        commodity.name === updatedCommodity.name ? updatedCommodity : commodity
      )
    );
    toast({
      title: "Commodity Updated",
      description: `${updatedCommodity.name} has been updated successfully.`,
    });
  }, [setCommodities, toast]);

  const handleAddCommodity = useCallback(() => {
    const newCommodityData = {
      name: "",
      averagePrice: 0,
      priceTrend: "Up" as const,
      class: "Hard" as const,
      type: "Industrial" as const,
      marketType: "Spot" as const
    };

    setCommodities(prev => [...prev, newCommodityData]);
    setNewCommodity({ 
      name: "", 
      averagePrice: 0,
      class: "Hard",
      type: "Industrial",
      marketType: "Spot"
    });
    toast({
      title: "Commodity Added",
      description: "New commodity has been added successfully.",
    });
  }, [setCommodities, setNewCommodity, toast]);

  return {
    handleCommodityEdit,
    handleAddCommodity,
  };
};