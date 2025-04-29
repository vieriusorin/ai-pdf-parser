# AI Chat Application

## Overview

This project is an AI-powered chat application that leverages OpenAI's models to generate intelligent responses. The application provides a seamless interface for interacting with language models like GPT-4o-mini, with support for various features including tool integration, custom system prompts, and memory management.

## Features

- Interactive AI chat interface
- Support for custom system prompts
- Tool/function calling capabilities
- Temperature control for response randomness
- Memory management for conversation context
- Configurable model parameters

## Technical Architecture

The application is built using TypeScript and integrates with OpenAI's API. Here's a breakdown of the key components:

### Core Components

- **LLM Integration** (`src/llm.ts`): Handles communication with OpenAI's API
- **Agent** (`src/agent.ts`): Manages the AI agent's behavior and capabilities
- **Memory** (`src/memory.ts`): Handles conversation history and context
- **System Prompt** (`src/systemPrompt.ts`): Defines the AI's personality and behavior
- **Tool Runner** (`src/toolRunner.ts`): Executes tools/functions called by the AI
- **UI** (`src/ui.ts`): Manages the user interface components
- **AI Configuration** (`src/ai.ts`): Configures the OpenAI client

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenAI API key

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Set up your OpenAI API key in an environment variable:
   ```
   export OPENAI_API_KEY=your_api_key_here
   ```
4. Start the application:
   ```
   npm start "your message here"
   ```

## Usage

### Basic Usage

The core functionality is provided by the `runLLM` function


## Configuration Options

The `runLLM` function accepts the following parameters:

| Parameter | Type | Description |
|-----------|------|-------------|
| messages | AIMessage[] | Array of messages in the conversation |
| tools | any[] | Optional array of tools/functions the AI can use |
| temperature | number | Controls randomness (0.0-1.0, default: 0.1) |
| systemPrompt | string | Optional custom system prompt |

## Project Structure

src/
├── agent.ts # AI agent management
├── ai.ts # OpenAI client configuration
├── llm.ts # Core LLM integration
├── memory.ts # Conversation memory management
├── systemPrompt.ts # Default system prompt
├── toolRunner.ts # Tool execution logic
└── ui.ts # User interface components
types.ts # TypeScript type definitions


## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT License](LICENSE)
