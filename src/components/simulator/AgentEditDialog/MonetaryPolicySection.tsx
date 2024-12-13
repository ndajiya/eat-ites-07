import { Agent } from "@/types/simulator";
import { Slider } from "@/components/ui/slider";

interface MonetaryPolicySectionProps {
  agent: Agent;
  onAgentChange: (agent: Agent) => void;
}

export const MonetaryPolicySection = ({ agent, onAgentChange }: MonetaryPolicySectionProps) => {
  if (agent.class !== "CentralBanks") return null;

  const handleInterestRateChange = (value: number[]) => {
    onAgentChange({
      ...agent,
      monetaryPolicy: {
        ...agent.monetaryPolicy,
        interestRate: value[0]
      }
    });
  };

  const handleReserveRequirementChange = (value: number[]) => {
    onAgentChange({
      ...agent,
      monetaryPolicy: {
        ...agent.monetaryPolicy,
        reserveRequirement: value[0]
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label>Interest Rate (%)</label>
        <Slider
          defaultValue={[agent.monetaryPolicy?.interestRate || 2]}
          max={10}
          min={0}
          step={0.25}
          onValueChange={handleInterestRateChange}
        />
        <div className="text-sm text-muted-foreground">
          Current: {agent.monetaryPolicy?.interestRate || 2}%
        </div>
      </div>

      <div className="space-y-2">
        <label>Reserve Requirement (%)</label>
        <Slider
          defaultValue={[agent.monetaryPolicy?.reserveRequirement || 10]}
          max={20}
          min={0}
          step={0.5}
          onValueChange={handleReserveRequirementChange}
        />
        <div className="text-sm text-muted-foreground">
          Current: {agent.monetaryPolicy?.reserveRequirement || 10}%
        </div>
      </div>
    </div>
  );
};