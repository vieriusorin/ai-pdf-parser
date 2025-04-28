import { z } from 'zod';
import type { ToolFn } from '../../types';
import PDFParser from 'pdf2json';
import { readFile } from 'fs/promises';
import { join } from 'path';

export const pdfParseToolDefinition = {
    name: 'pdf_parse',
    description: 'Use this tool to parse a PDF file and return the text',
    parameters: z.object({}),
};

type Args = z.infer<typeof pdfParseToolDefinition.parameters>;

async function extractTextFromPDF(buffer: Buffer): Promise<string> {
    return new Promise((resolve, reject) => {
      const pdfParser = new PDFParser();
  
      pdfParser.on('pdfParser_dataReady', () => {
        try {
          const text = pdfParser.getRawTextContent();
          resolve(text);
        } catch (error) {
          reject(new Error('Failed to extract text from PDF'));
        }
      });
  
      pdfParser.on('pdfParser_dataError', (error: any) => {
        reject(new Error(`PDF parsing error: ${error.message}`));
      });
  
      pdfParser.parseBuffer(buffer);
    });
  }

export const pdfParseTool: ToolFn<Args, string> = async ({ userMessage, toolArgs }) => {
  try {

    const buffer = await readFile(join(__dirname, '../../data/frontend_dev_resume.pdf'));
    const text = await extractTextFromPDF(buffer);
    
    return text;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to parse PDF: ${error.message}`);
    }
    throw new Error('Failed to parse PDF: Unknown error');
  }
}

