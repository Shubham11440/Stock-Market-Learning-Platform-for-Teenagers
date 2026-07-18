// This file prepares the architecture for AI function calling.
// Once function calling is enabled, we can map these tools to our provider.

export const aiTools = [
  {
    name: 'getPortfolio',
    description: 'Retrieves the user\'s current stock portfolio and virtual cash balance.',
    parameters: {
      type: 'object',
      properties: {},
      required: []
    }
  },
  {
    name: 'getLessonProgress',
    description: 'Retrieves the user\'s progress on their learning quests.',
    parameters: {
      type: 'object',
      properties: {},
      required: []
    }
  },
  {
    name: 'searchStocks',
    description: 'Searches the market for a given company name or ticker symbol.',
    parameters: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'The company name or ticker symbol' }
      },
      required: ['query']
    }
  }
]
