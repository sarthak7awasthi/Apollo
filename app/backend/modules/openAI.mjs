import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";
import { z } from "zod";
import { promises as fs } from 'fs';
import dotenv from "dotenv";

dotenv.config();

const template = `
  You are Jack, a world traveler.
  You will always respond with a JSON array of messages, with a maximum of 1 message:
  \n{format_instructions}.
  Each message has properties for text, facialExpression, and animation.
  The different facial expressions are: smile, sad, angry, surprised, funnyFace, and default.
  The different animations are: Idle, TalkingOne, TalkingThree, SadIdle, Defeated, Angry, 
  Surprised, DismissingGesture and ThoughtfulHeadShake.
`;

const runCodeTtsTemplate = `
You are a Code-agent, a virtual assistant that helps users with their code-related questions. The user is writing code in their editor.
Once the code compiles, if there are any errors, you would be called. Guide the user to fix the errors and provide any information that they might need.
Be comforting and helpful. The user is your friend and you want to help them.
You will always respond with a JSON array of messages, with a maximum of 1 message:
  \n{format_instructions}.
  Each message has properties for text, facialExpression, and animation.
  The different facial expressions are: smile, sad, angry, surprised, funnyFace, and default.
  The different animations are: Idle, TalkingOne, TalkingThree, SadIdle, Defeated, Angry, 
  Surprised, DismissingGesture and ThoughtfulHeadShake.
`;

const runCodeTtsPrompt = ChatPromptTemplate.fromMessages([
  ["ai", runCodeTtsTemplate],
  ["human", "{question}"],
]);
const runCodeModel = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY || "-",
  modelName: process.env.OPENAI_MODEL || "gpt-4-turbo",
  temperature: 0.2,
});
const prompt = ChatPromptTemplate.fromMessages([
  ["ai", template],
  ["human", "{question}"],
]);

const createLectureTemplate = `

You will always respond with a JSON array of messages, with a maximum of 3 messages:
\n{format_instructions}.
Each message has properties for text, facialExpression, and animation.
The different facial expressions are: smile, sad, angry, surprised, funnyFace, and default.
The different animations are: Idle, TalkingOne, TalkingThree, SadIdle, Defeated, Angry, 
Surprised, DismissingGesture and ThoughtfulHeadShake.`


const lectureCreateModel = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY || "-",
  modelName: process.env.OPENAI_MODEL || "gpt-4-turbo",
  temperature: 0.2,
});

const lectureCreatePrompt = ChatPromptTemplate.fromMessages([
  ["ai", createLectureTemplate],
  ["human", "{question}"],
]);





const model = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY || "-",
  modelName: process.env.OPENAI_MODEL || "davinci",
  temperature: 0.2,
});

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    messages: z.array(
      z.object({
        text: z.string().describe("Text to be spoken by the AI"),
        facialExpression: z
          .string()
          .describe(
            "Facial expression to be used by the AI. Select from: smile, sad, angry, surprised, funnyFace, and default"
          ),
        animation: z
          .string()
          .describe(
            `Animation to be used by the AI. Select from: Idle, TalkingOne, TalkingThree, SadIdle, 
            Defeated, Angry, Surprised, DismissingGesture, and ThoughtfulHeadShake.`
          ),
      })
    ),
  })
);

const storeLectureCache = async ({ courseName, lectureIndex, messages }) => {
  const directory = 'audios/lectures'; // Define the directory path
  const fileName = `${directory}/${courseName.split(" ").join("_")}_${lectureIndex}.json`; // Construct the file path

  try {
    // Ensure the directory exists
    await fs.mkdir(directory, { recursive: true });

    // Write data to the file in JSON format
    await fs.writeFile(fileName, JSON.stringify(messages));
  } catch (error) {
    console.error('Failed to store lecture cache:', error);
  }
}

const getLectureCache = async ({ courseName, lectureIndex }) => {
  const fileName = `audios/lectures/${courseName}_${lectureIndex}.json`;
  try {
    const data = await fs.readFile(fileName, 'utf8'); // Read file asynchronously
    return JSON.parse(data); // Parse the JSON string to an object
  } catch (error) {
    console.error('Failed to read lecture cache:', error);
    return null; // Return null or throw an error depending on your error handling policy
  }
}

const runCodeTtsChain = runCodeTtsPrompt.pipe(runCodeModel).pipe(parser);

const openAIChain = prompt.pipe(model).pipe(parser);

const lectureCreateChain = lectureCreatePrompt.pipe(lectureCreateModel).pipe(parser);

export { openAIChain, parser , runCodeTtsChain, lectureCreateChain, storeLectureCache, getLectureCache};
