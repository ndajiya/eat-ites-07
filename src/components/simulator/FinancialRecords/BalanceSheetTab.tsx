import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Agent } from "@/types/simulator";

interface BalanceSheetTabProps {
  agent: Agent;
}

export const BalanceSheetTab = ({ agent }: BalanceSheetTabProps) => {
  const balanceSheet = agent.bookkeeping.generateBalanceSheet();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-2">Assets</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Account</TableHead>
              <TableHead>Balance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {balanceSheet.assets.map(({ account, balance }) => (
              <TableRow key={account}>
                <TableCell>{account}</TableCell>
                <TableCell>${balance.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Liabilities</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Account</TableHead>
              <TableHead>Balance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {balanceSheet.liabilities.map(({ account, balance }) => (
              <TableRow key={account}>
                <TableCell>{account}</TableCell>
                <TableCell>${Math.abs(balance).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Equity</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Account</TableHead>
              <TableHead>Balance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {balanceSheet.equity.map(({ account, balance }) => (
              <TableRow key={account}>
                <TableCell>{account}</TableCell>
                <TableCell>${Math.abs(balance).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};