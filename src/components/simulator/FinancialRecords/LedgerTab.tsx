
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Agent } from "@/types/simulator";

interface LedgerTabProps {
  agent: Agent;
}

export const LedgerTab = ({ agent }: LedgerTabProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Account Type</TableHead>
          <TableHead>Account</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Description</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {agent.bookkeeping.getLedger().map((transaction, index) => (
          <TableRow key={index}>
            <TableCell>{transaction.date}</TableCell>
            <TableCell>{transaction.accountType}</TableCell>
            <TableCell>{transaction.account}</TableCell>
            <TableCell className={transaction.amount >= 0 ? "text-green-500" : "text-red-500"}>
              ${Math.abs(transaction.amount).toLocaleString()}
            </TableCell>
            <TableCell>{transaction.entryType}</TableCell>
            <TableCell>{transaction.description}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
