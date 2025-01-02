import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

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

export const MarketView = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Market Simulator</h2>
        <div className="relative w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search..." className="pl-8" />
        </div>
      </div>

      <Tabs defaultValue="firms" className="w-full">
        <TabsList className="w-full justify-start border-b rounded-none h-12 bg-background">
          <TabsTrigger value="central-banks" className="data-[state=active]:bg-background">
            Central Banks
          </TabsTrigger>
          <TabsTrigger value="governments" className="data-[state=active]:bg-background">
            Governments
          </TabsTrigger>
          <TabsTrigger value="firms" className="data-[state=active]:bg-background">
            Firms
          </TabsTrigger>
          <TabsTrigger value="individuals" className="data-[state=active]:bg-background">
            Individuals
          </TabsTrigger>
        </TabsList>

        <TabsContent value="central-banks" className="mt-6">
          <div className="text-center text-muted-foreground py-8">
            Central Banks data will be implemented in the next phase
          </div>
        </TabsContent>

        <TabsContent value="governments" className="mt-6">
          <div className="text-center text-muted-foreground py-8">
            Governments data will be implemented in the next phase
          </div>
        </TabsContent>

        <TabsContent value="firms" className="mt-6">
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
                    <TableCell className={parseFloat(firm.growthRate) > 10 ? "trend-up" : ""}>{firm.growthRate}</TableCell>
                    <TableCell className={parseFloat(firm.profitMargin) > 20 ? "trend-up" : ""}>{firm.profitMargin}</TableCell>
                    <TableCell>{firm.sector}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="individuals" className="mt-6">
          <div className="text-center text-muted-foreground py-8">
            Individuals data will be implemented in the next phase
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};