import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface FirmData {
  name: string;
  revenue: string;
  marketShare: string;
  size: number;
  growthRate: string;
  profitMargin: string;
  sector: string;
}

const firmData: FirmData[] = [
  {
    name: "Tech Innovations Inc",
    revenue: "$1.5B",
    marketShare: "15.5%",
    size: 5000,
    growthRate: "12.3%",
    profitMargin: "25.4%",
    sector: "Technology"
  },
  {
    name: "Global Manufacturing Co",
    revenue: "$2.8B",
    marketShare: "22.3%",
    size: 12000,
    growthRate: "8.7%",
    profitMargin: "18.9%",
    sector: "Manufacturing"
  },
  {
    name: "Financial Solutions Ltd",
    revenue: "$950.0M",
    marketShare: "8.2%",
    size: 2500,
    growthRate: "15.1%",
    profitMargin: "32.6%",
    sector: "Finance"
  }
];

export const FirmsTab = () => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead>Company Name</TableHead>
            <TableHead>Revenue</TableHead>
            <TableHead>Market Share</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Growth Rate</TableHead>
            <TableHead>Profit Margin</TableHead>
            <TableHead>Sector</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {firmData.map((firm) => (
            <TableRow key={firm.name}>
              <TableCell className="font-medium">{firm.name}</TableCell>
              <TableCell>{firm.revenue}</TableCell>
              <TableCell>{firm.marketShare}</TableCell>
              <TableCell>{firm.size.toLocaleString()}</TableCell>
              <TableCell className={parseFloat(firm.growthRate) > 10 ? "text-green-500" : ""}>{firm.growthRate}</TableCell>
              <TableCell className={parseFloat(firm.profitMargin) > 20 ? "text-green-500" : ""}>{firm.profitMargin}</TableCell>
              <TableCell>{firm.sector}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};