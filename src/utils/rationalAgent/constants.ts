export const BASE_WEIGHTS = {
  GABA: 0.35,        // Safety
  vasopressin: 0.25, // Resource management
  oxytocin: 0.15,    // Social/Market interaction
  serotonin: 0.15,   // Position evaluation
  dopamine: 0.10,    // Growth optimization
  cortisol: 0.20     // Stress response
};

export const SYNERGY_SCALING_FACTOR = 0.1;

export const STRESS_MODIFIERS = {
  HIGH_STRESS: {
    GABA: 1.5,        // Increased focus on safety
    vasopressin: 1.3, // Higher resource priority
    oxytocin: 0.7,    // Reduced social interaction
    serotonin: 0.8,   // Reduced position optimization
    dopamine: 0.6,    // Reduced growth seeking
    cortisol: 1.5     // Increased stress response
  },
  LOW_STRESS: {
    GABA: 0.8,        // Reduced safety focus
    vasopressin: 0.9, // Normal resource management
    oxytocin: 1.2,    // Increased social interaction
    serotonin: 1.2,   // Increased position optimization
    dopamine: 1.3,    // Increased growth seeking
    cortisol: 0.7     // Reduced stress response
  }
};