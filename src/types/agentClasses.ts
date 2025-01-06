import { AgentClass } from './agents/baseTypes';
import { HouseholdsClass } from './agents/households';
import { FirmsClass } from './agents/firms';
import { GovernmentsClass } from './agents/governments';
import { CentralBanksClass } from './agents/centralBanks';

export type { AgentClass } from './agents/baseTypes';

export const AGENT_CLASSES: Record<string, AgentClass> = {
  Households: HouseholdsClass,
  Firms: FirmsClass,
  Governments: GovernmentsClass,
  CentralBanks: CentralBanksClass,
};