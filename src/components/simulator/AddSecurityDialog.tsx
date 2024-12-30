import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Security } from "@/types/securities";
import { SecurityClassSelect } from "./SecurityDialog/SecurityClassSelect";
import { SecurityTypeSelect } from "./SecurityDialog/SecurityTypeSelect";
import { SecurityDetailsForm } from "./SecurityDialog/SecurityDetailsForm";

interface AddSecurityDialogProps {
  newSecurity: Omit<Security, "id">;
  onSecurityChange: (field: keyof Omit<Security, "id">, value: any) => void;
  onAddSecurity: () => void;
}

export const AddSecurityDialog = ({
  newSecurity,
  onSecurityChange,
  onAddSecurity,
}: AddSecurityDialogProps) => {
  return (
    <DialogContent className="sm:max-w-[425px] max-h-[90vh]">
      <DialogHeader>
        <DialogTitle>Add New Security</DialogTitle>
      </DialogHeader>
      <ScrollArea className="h-[calc(90vh-120px)] pr-4">
        <div className="space-y-4 py-4">
          <SecurityDetailsForm
            newSecurity={newSecurity}
            onSecurityChange={onSecurityChange}
          />
          <SecurityClassSelect
            value={newSecurity.class}
            onChange={(value) => onSecurityChange("class", value)}
          />
          <SecurityTypeSelect
            value={newSecurity.type}
            onChange={(value) => onSecurityChange("type", value)}
          />
          <Button className="w-full" onClick={onAddSecurity}>
            Add Security
          </Button>
        </div>
      </ScrollArea>
    </DialogContent>
  );
};