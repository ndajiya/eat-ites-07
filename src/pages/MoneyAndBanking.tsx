import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const MoneyAndBanking = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/considerations">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Considerations
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-primary">Money and Banking Concepts</h1>
      </div>

      <div className="grid gap-6">
        <Card className="p-6 bg-[#F1F0FB]">
          <h2 className="text-2xl font-semibold text-[#1A1F2C] mb-4">Five Core Principles of Money and Banking</h2>
          <div className="space-y-3 text-[#8E9196]">
            <p className="flex items-center gap-2">
              <span className="text-[#1976D2] font-semibold">1.</span>
              Time has value
            </p>
            <p className="flex items-center gap-2">
              <span className="text-[#388E3C] font-semibold">2.</span>
              Risk requires compensation
            </p>
            <p className="flex items-center gap-2">
              <span className="text-[#FBC02D] font-semibold">3.</span>
              Information is the basis for decisions
            </p>
            <p className="flex items-center gap-2">
              <span className="text-[#1976D2] font-semibold">4.</span>
              Markets determine prices and allocate resources
            </p>
            <p className="flex items-center gap-2">
              <span className="text-[#388E3C] font-semibold">5.</span>
              Stability improves welfare
            </p>
          </div>
        </Card>

        <ScrollArea className="h-[600px] rounded-md border">
          <div className="p-6">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="money-payments">
                <AccordionTrigger className="text-xl font-semibold text-[#1976D2]">
                  Money and the Payments System
                </AccordionTrigger>
                <AccordionContent className="text-[#8E9196] space-y-2">
                  <p>Understanding what money is, how it is used, and the mechanisms for making payments is fundamental to money and banking. This includes:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Different types of money (commodity, fiat, etc.)</li>
                    <li>Evolution of payment systems (checks, electronic payments)</li>
                    <li>Measures of money (M1, M2)</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="financial-instruments">
                <AccordionTrigger className="text-xl font-semibold text-[#388E3C]">
                  Financial Instruments, Markets, and Institutions
                </AccordionTrigger>
                <AccordionContent className="text-[#8E9196] space-y-2">
                  <p>This encompasses understanding different types of financial instruments, markets, and institutions:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Bonds, stocks, and derivatives</li>
                    <li>Trading markets and mechanisms</li>
                    <li>Financial institutions and their roles</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="interest-rates">
                <AccordionTrigger className="text-xl font-semibold text-[#FBC02D]">
                  Interest Rates
                </AccordionTrigger>
                <AccordionContent className="text-[#8E9196] space-y-2">
                  <p>Interest rates play a crucial role in determining financial value and investment decisions:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Types of interest rates (nominal, real)</li>
                    <li>Interest rate determination</li>
                    <li>Impact on economic activity</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="bank-management">
                <AccordionTrigger className="text-xl font-semibold text-[#1976D2]">
                  Bank Management
                </AccordionTrigger>
                <AccordionContent className="text-[#8E9196] space-y-2">
                  <p>Banks are key players in the financial system. Key aspects include:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Balance sheet management</li>
                    <li>Risk assessment and management</li>
                    <li>Operational principles</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="central-banking">
                <AccordionTrigger className="text-xl font-semibold text-[#388E3C]">
                  Central Banking
                </AccordionTrigger>
                <AccordionContent className="text-[#8E9196] space-y-2">
                  <p>Central banks maintain financial stability through monetary policy:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Functions and objectives</li>
                    <li>Tools for influencing money supply</li>
                    <li>Central bank independence</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="monetary-theory">
                <AccordionTrigger className="text-xl font-semibold text-[#FBC02D]">
                  Monetary Theory
                </AccordionTrigger>
                <AccordionContent className="text-[#8E9196] space-y-2">
                  <p>Explores the relationship between money and the real economy:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Effects of money supply changes</li>
                    <li>Impact on output and inflation</li>
                    <li>Interest rate relationships</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="financial-crises">
                <AccordionTrigger className="text-xl font-semibold text-[#D32F2F]">
                  Financial Crises
                </AccordionTrigger>
                <AccordionContent className="text-[#8E9196] space-y-2">
                  <p>Understanding causes and consequences of financial crises:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Asset bubbles and leverage</li>
                    <li>Role of lender of last resort</li>
                    <li>Government bailouts</li>
                    <li>Lessons from 2007-2008 crisis</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default MoneyAndBanking;