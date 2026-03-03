import { toolRegistry } from './registry'

/**
 * Register tools via the WebMCP API if available.
 * Feature-detects navigator.agent?.registerTool() and registers silently.
 * No-ops if WebMCP is not supported by the browser/agent.
 */
export function registerWebMCPTools(): void {
  // Feature detect WebMCP
  const agent = (navigator as { agent?: { registerTool?: (tool: unknown) => void } }).agent
  if (!agent?.registerTool) return

  for (const tool of toolRegistry) {
    try {
      agent.registerTool({
        name: tool.name,
        description: tool.description,
        parameters: tool.parameters,
        handler: tool.execute,
      })
    } catch {
      // Silently skip tools that fail to register
    }
  }
}
