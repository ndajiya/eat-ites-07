import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const AgentTableHeader = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Agent</TableHead>
        <TableHead>Cash</TableHead>
        <TableHead>Class</TableHead>
        <TableHead>Last Round</TableHead>
        <TableHead>Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};