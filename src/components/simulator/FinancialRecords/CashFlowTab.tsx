import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Agent } from "@/types/simulator";

interface CashFlowTabProps {
  agent: Agent;
}

export const CashFlowTab = ({ agent }: CashFlowTabProps) => {
  const cashFlows = agent.bookkeeping.generateCashFlows();

  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell className="font-semibold">Operating Activities</TableCell>
          <TableCell>${cashFlows.operating.toLocaleString()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-semibold">Investing Activities</TableCell>
          <TableCell>${cashFlows.investing.toLocaleString()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-semibold">Financing Activities</TableCell>
          <TableCell>${cashFlows.financing.toLocaleString()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-semibold">Net Cash Flow</TableCell>
          <TableCell className={cashFlows.netCashFlow >= 0 ? "text-green-500" : "text-red-500"}>
            ${cashFlows.netCashFlow.toLocaleString()}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};