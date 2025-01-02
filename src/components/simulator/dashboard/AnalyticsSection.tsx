import { CompetitorAnalysis } from "../CompetitorAnalysis";
import { PerformanceMonitor } from "../PerformanceMonitor";
import { StatsDashboard } from "../StatsDashboard";
import { Agent, Commodity, RoundData } from "@/types/simulator";

interface AnalyticsSectionProps {
  agents: Agent[];
  commodities: Commodity[];
  roundsHistory: RoundData[];
}

export const AnalyticsSection = ({
  agents,
  commodities,
  roundsHistory,
}: AnalyticsSectionProps) => {
  if (roundsHistory.length === 0) {
    return <CompetitorAnalysis agents={agents} />;
  }

  return (
    <>
      <CompetitorAnalysis agents={agents} />
      <PerformanceMonitor roundsHistory={roundsHistory} />
      <StatsDashboard
        roundsHistory={roundsHistory}
        agents={agents}
        commodities={commodities}
      />
    </>
  );
};