import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function analyzeEmotionAndAmbience(text) {

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    response_format: { type: "json_object" },
    temperature: 0.3,
    messages: [
      {
        role: "system",
        content:
          "You analyze journal entries and detect emotions."
      },
      {
        role: "user",
        content: `
Analyze the following journal entry.

Return JSON format:

{
 "emotion": "",
 "keywords": [],
 "summary": "",
 "ambience": ""
}

Ambience must be one of:
forest
ocean
mountain

Journal:
${text}
`
      }
    ]
  });

  return JSON.parse(response.choices[0].message.content);
}