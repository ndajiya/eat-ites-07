export const DEFAULT_JS_STRATEGY = `// Define your agent's trading strategy here
function tradingStrategy(agent, market) {
  // Example strategy:
  if (agent.cash > 1000) {
    return {
      action: 'buy',
      commodity: 'Commodity1',
      quantity: 10
    };
  }
  return { action: 'hold' };
}`;

export const DEFAULT_YAML_STRATEGY = `# Define your agent's trading strategy here
conditions:
  - if: cash > 1000
    then:
      action: buy
      commodity: Commodity1
      quantity: 10
  - else:
      action: hold`;