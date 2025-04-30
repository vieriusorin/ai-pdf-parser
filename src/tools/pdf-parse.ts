import { readFile } from "node:fs/promises";
import { z } from "zod";
import type { ToolFn } from "../../types";
import { extractTextFromPDF } from "../lib/pdfParser";
import { getFilePath } from "../lib/fileUtils";

export const pdfParseToolDefinition = {
	name: "pdf_parse",
	description: "Use this tool to parse a PDF file and return the text",
	parameters: z.object({}),
};

type Args = z.infer<typeof pdfParseToolDefinition.parameters>;

export const pdfParseTool: ToolFn<Args, string> = async ({ userMessage, toolArgs }) => {
	try {
		const filePath = getFilePath("../../data/frontend_dev_resume.pdf", import.meta.url);
		const buffer = await readFile(filePath);
		const text = await extractTextFromPDF(buffer);
		return text;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(`Failed to parse PDF: ${error.message}`);
		}
		throw new Error("Failed to parse PDF: Unknown error");
	}
};
