import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Agent } from "@/types/simulator";

interface IncomeStatementTabProps {
  agent: Agent;
}

export const IncomeStatementTab = ({ agent }: IncomeStatementTabProps) => {
  const income = agent.bookkeeping.generateIncomeStatement();

  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell className="font-semibold">Revenue</TableCell>
          <TableCell>${income.revenue.toLocaleString()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-semibold">Expenses</TableCell>
          <TableCell>${income.expenses.toLocaleString()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-semibold">Net Income</TableCell>
          <TableCell className={income.netIncome >= 0 ? "text-green-500" : "text-red-500"}>
            ${income.netIncome.toLocaleString()}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};