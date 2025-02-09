
import { Security } from "@/types/securities";
import { useToast } from "@/components/ui/use-toast";
import { useCallback } from "react";

export const useSecurityHandlers = (
  setSecurities: React.Dispatch<React.SetStateAction<Security[]>>,
  setNewSecurity: (security: Omit<Security, "id">) => void,
) => {
  const { toast } = useToast();

  const handleAddSecurity = useCallback(() => {
    const newSecurityData = {
      id: Date.now().toString(),
      name: "",
      class: "Equity" as const,
      type: "CommonStock" as const,
      price: 0,
      volatility: 0.3,
      quantity: 0,
      issuer: "",
      description: "",
    };

    setSecurities(prev => [...prev, newSecurityData]);
    setNewSecurity({
      name: "",
      class: "Equity",
      type: "CommonStock",
      price: 0,
      volatility: 0.3,
      quantity: 0,
      issuer: "",
      description: "",
    });
    toast({
      title: "Security Added",
      description: "New security has been added successfully.",
    });
  }, [setSecurities, setNewSecurity, toast]);

  const handleSecurityDelete = useCallback((securityId: string) => {
    setSecurities(prevSecurities => 
      prevSecurities.filter(security => security.id !== securityId)
    );
    toast({
      title: "Security Deleted",
      description: "Security has been deleted successfully.",
    });
  }, [setSecurities, toast]);

  return {
    handleAddSecurity,
    handleSecurityDelete,
  };
};
