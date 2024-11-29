import { google } from "@ai-sdk/google";
import { streamObject } from "ai";
import { z } from "zod";

// Define a schema for the summary
const summarySchema = z.object({
  summary: z.string(),
});

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Extract files from the prompt object
    const { prompt } = body;
    const { files } = prompt;
    
    if (!files || !files[0] || !files[0].data) {
      throw new Error("No file data provided");
    }

    const firstFile = files[0].data;

    const result = await streamObject({
      model: google("gemini-1.5-flash"),
      messages: [
        {
          role: "system",
          content: 
            "You are an expert at creating clear, well-structured summaries. Create a comprehensive summary that includes:\n" +
            "1. Key Points (3-5 main ideas)\n" +
            "2. Important Details\n" +
            "3. Conclusions\n\n" +
            "Use markdown formatting to make the summary beautiful and easy to read. Include appropriate headings, bullet points, and emphasis where needed.",
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Please create a well-structured summary of this document.",
            },
            {
              type: "file",
              data: firstFile,
              mimeType: "application/pdf",
            },
          ],
        },
      ],
      schema: summarySchema,
      output: "object",
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('Error in generate-summary:', error);
    return new Response(
      JSON.stringify({ error: "Failed to generate summary" }),
      { status: 500 }
    );
  }
} 