import { NeurotransmitterWeights, MarketInteraction, UtilityParameters } from './types';
import { BASE_WEIGHTS, SYNERGY_SCALING_FACTOR, STRESS_MODIFIERS } from './constants';

export class UtilityCalculator {
  private calculateNeurotransmitterComponent(
    weights: NeurotransmitterWeights,
    values: NeurotransmitterWeights
  ): number {
    return Object.entries(weights).reduce((sum, [key, weight]) => {
      return sum + weight * (values[key as keyof NeurotransmitterWeights] || 0);
    }, 0);
  }

  private calculateSynergyComponent(interactions: MarketInteraction[]): number {
    return interactions.reduce((sum, { source, target, connectionWeight }) => {
      return sum + source * target * connectionWeight * SYNERGY_SCALING_FACTOR;
    }, 0);
  }

  private adjustWeightsForStress(
    weights: NeurotransmitterWeights,
    stressLevel: number
  ): NeurotransmitterWeights {
    const modifiers = stressLevel > 0.7 ? STRESS_MODIFIERS.HIGH_STRESS : STRESS_MODIFIERS.LOW_STRESS;
    
    return Object.entries(weights).reduce((adjusted, [key, weight]) => ({
      ...adjusted,
      [key]: weight * (modifiers[key as keyof NeurotransmitterWeights] || 1)
    }), {} as NeurotransmitterWeights);
  }

  calculateUtility(params: UtilityParameters, stressLevel: number = 0): number {
    const adjustedWeights = this.adjustWeightsForStress(params.weights, stressLevel);
    
    const neurotransmitterUtility = this.calculateNeurotransmitterComponent(
      adjustedWeights,
      params.values
    );
    
    const synergyUtility = this.calculateSynergyComponent(params.marketInteractions);
    
    return neurotransmitterUtility + synergyUtility;
  }

  getBaseWeights(): NeurotransmitterWeights {
    return { ...BASE_WEIGHTS };
  }

  calculateOptimalDecision(
    options: UtilityParameters[],
    stressLevel: number = 0
  ): { optimalIndex: number; utility: number } {
    const utilities = options.map(option => this.calculateUtility(option, stressLevel));
    const maxUtility = Math.max(...utilities);
    const optimalIndex = utilities.indexOf(maxUtility);
    
    return {
      optimalIndex,
      utility: maxUtility
    };
  }
}

export const createUtilityCalculator = () => new UtilityCalculator();