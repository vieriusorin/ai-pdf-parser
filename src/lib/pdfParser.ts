import PDFParser from "pdf2json";

/**
 * Core PDF parsing functionality
 * @param {Buffer} buffer - PDF file buffer
 * @returns {Promise<string>} - Extracted text from PDF
 */
export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
	return new Promise((resolve, reject) => {
		const pdfParser = new PDFParser();

		pdfParser.on("pdfParser_dataReady", (pdfData) => {
			try {
				const pages = pdfData?.Pages ?? [];

				let text = "";

				for (const page of pages) {
					for (const textBlock of page.Texts) {
						for (const r of textBlock.R) {
							const decodedText = decodeURIComponent(r.T);
							text += `${decodedText} `;
						}
					}
					text += "\n";
				}

				text = text.trim();

				if (!text) {
					console.warn("⚠️ Warning: No text found after decoding.");
				}

				resolve(text);
			} catch (error) {
				reject(new Error("Failed to decode text from PDF"));
			}
		});

		pdfParser.on("pdfParser_dataError", (errMsg: Record<"parserError", Error>) => {
			reject(new Error(`PDF parsing error: ${errMsg.parserError.message || errMsg}`));
		});

		pdfParser.parseBuffer(buffer);
	});
}