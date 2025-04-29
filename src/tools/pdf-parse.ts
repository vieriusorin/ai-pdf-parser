import { z } from 'zod';
import type { ToolFn } from '../../types';
import PDFParser from 'pdf2json';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

export const pdfParseToolDefinition = {
  name: 'pdf_parse',
  description: 'Use this tool to parse a PDF file and return the text',
  parameters: z.object({}),
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

type Args = z.infer<typeof pdfParseToolDefinition.parameters>;

async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();

    pdfParser.on('pdfParser_dataReady', (pdfData) => {
      try {
        const pages = pdfData?.Pages ?? [];

        let text = '';

        for (const page of pages) {
          for (const textBlock of page.Texts) {
            for (const r of textBlock.R) {
              const decodedText = decodeURIComponent(r.T);
              text += decodedText + ' ';
            }
          }
          text += '\n';
        }

        text = text.trim();

        if (!text) {
          console.warn('⚠️ Warning: No text found after decoding.');
        }

        resolve(text);
      } catch (error) {
        reject(new Error('Failed to decode text from PDF'));
      }
    });

    pdfParser.on('pdfParser_dataError', (error: any) => {
      reject(new Error(`PDF parsing error: ${error?.message || error}`));
    });

    pdfParser.parseBuffer(buffer);
  });
}

export const pdfParseTool: ToolFn<Args, string> = async ({ userMessage, toolArgs }) => {
  try {
    const filePath = join(__dirname, '../../data/frontend_dev_resume.pdf');
    const buffer = await readFile(filePath);
    const text = await extractTextFromPDF(buffer);
    return text;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to parse PDF: ${error.message}`);
    }
    throw new Error('Failed to parse PDF: Unknown error');
  }
}
