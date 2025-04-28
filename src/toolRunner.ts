import type OpenAI from 'openai'
import { pdfParseToolDefinition, pdfParseTool} from './tools/pdf-parse'

export const runTool = async (
  toolCall: OpenAI.Chat.Completions.ChatCompletionMessageToolCall,
  userMessage: string
) => {
  const input = {
    userMessage,
    toolArgs: JSON.parse(toolCall.function.arguments || '{}'),
  }

  switch (toolCall.function.name) {
    case pdfParseToolDefinition.name:
      return pdfParseTool(input)

    default:
      return `Never run this tool: ${toolCall.function.name} again, or else!`
  }
}
