
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Agent } from "@/types/simulator";

interface BalanceSheetTabProps {
  agent: Agent;
}

export const BalanceSheetTab = ({ agent }: BalanceSheetTabProps) => {
  const balanceSheet = agent.bookkeeping.generateBalanceSheet();
  const totalAssets = balanceSheet.assets.reduce((sum, { balance }) => sum + balance, 0);
  const totalLiabilities = balanceSheet.liabilities.reduce((sum, { balance }) => sum + Math.abs(balance), 0);
  const totalEquity = balanceSheet.equity.reduce((sum, { balance }) => sum + Math.abs(balance), 0);

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
            {balanceSheet.assets.map(({ account, balance }, index) => (
              <TableRow key={index}>
                <TableCell>{account}</TableCell>
                <TableCell>${balance.toLocaleString()}</TableCell>
              </TableRow>
            ))}
            <TableRow className="font-semibold">
              <TableCell>Total Assets</TableCell>
              <TableCell>${totalAssets.toLocaleString()}</TableCell>
            </TableRow>
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
            {balanceSheet.liabilities.map(({ account, balance }, index) => (
              <TableRow key={index}>
                <TableCell>{account}</TableCell>
                <TableCell>${Math.abs(balance).toLocaleString()}</TableCell>
              </TableRow>
            ))}
            <TableRow className="font-semibold">
              <TableCell>Total Liabilities</TableCell>
              <TableCell>${totalLiabilities.toLocaleString()}</TableCell>
            </TableRow>
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
            {balanceSheet.equity.map(({ account, balance }, index) => (
              <TableRow key={index}>
                <TableCell>{account}</TableCell>
                <TableCell>${Math.abs(balance).toLocaleString()}</TableCell>
              </TableRow>
            ))}
            <TableRow className="font-semibold">
              <TableCell>Total Equity</TableCell>
              <TableCell>${totalEquity.toLocaleString()}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
