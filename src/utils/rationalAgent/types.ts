export interface NeurotransmitterWeights {
  GABA: number;      // Safety/Risk management
  vasopressin: number; // Resource management
  oxytocin: number;    // Market interaction
  serotonin: number;   // Position evaluation
  dopamine: number;    // Growth optimization
  cortisol: number;    // Stress level
}

export interface MarketInteraction {
  source: number;
  target: number;
  connectionWeight: number;
}

export interface UtilityParameters {
  weights: NeurotransmitterWeights;
  values: NeurotransmitterWeights;
  marketInteractions: MarketInteraction[];
}