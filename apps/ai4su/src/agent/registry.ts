import { searchModelsTool } from './tools/search-models.tool'
import { getModelTool } from './tools/get-model.tool'
import { searchHackathonsTool } from './tools/search-hackathons.tool'
import { getHackathonTool } from './tools/get-hackathon.tool'
import { searchActivitiesTool } from './tools/search-activities.tool'
import { getPartnersTool } from './tools/get-partners.tool'
import { getKpisTool } from './tools/get-kpis.tool'

export interface ToolDefinition {
  name: string
  description: string
  parameters: Record<string, { type: string; description: string }>
  execute: (params: never) => unknown
}

export const toolRegistry: ToolDefinition[] = [
  searchModelsTool as unknown as ToolDefinition,
  getModelTool as unknown as ToolDefinition,
  searchHackathonsTool as unknown as ToolDefinition,
  getHackathonTool as unknown as ToolDefinition,
  searchActivitiesTool as unknown as ToolDefinition,
  getPartnersTool as unknown as ToolDefinition,
  getKpisTool as unknown as ToolDefinition,
]

export function getToolByName(name: string): ToolDefinition | undefined {
  return toolRegistry.find((t) => t.name === name)
}

export function listTools() {
  return toolRegistry.map(({ name, description, parameters }) => ({
    name,
    description,
    parameters,
  }))
}
