import { getModelById } from '@/domain/models'

export const getModelTool = {
  name: 'get-model',
  description: 'Retrieve a single AI model by its ID.',
  parameters: {
    id: { type: 'string' as const, description: 'The model ID (e.g., model-001)' },
  },
  execute(params: { id: string }) {
    return getModelById(params.id)
  },
}
