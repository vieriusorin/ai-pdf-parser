import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Utility functions for file operations
 */
export function getFilePath(relativePath: string, importMetaUrl: string) {
  const __filename = fileURLToPath(importMetaUrl);
  const __dirname = dirname(__filename);
  return join(__dirname, relativePath);
}

export async function readPdfFile(path: string) {
  try {
    return await readFile(path);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to read PDF file: ${error.message}`);
    }
    throw new Error("Failed to read PDF file: Unknown error");
  }
}