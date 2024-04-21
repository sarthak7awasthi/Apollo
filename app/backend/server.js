import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { openAIChain, parser, runCodeTtsChain , lectureCreateChain, storeLectureCache, getLectureCache } from "./modules/openAI.mjs";
import { lipSync } from "./modules/lip-sync.mjs";
import { sendDefaultMessages } from "./modules/defaultMessages.mjs";
import { convertAudioToText } from "./modules/whisper.mjs";

dotenv.config();

const elevenLabsApiKey = process.env.ELEVEN_LABS_API_KEY;

const app = express();
app.use(express.json());
app.use(cors());
const port = 3000;

app.post("/addLectures", async (req, res) => {
  const { courseName, lectureIndex, courseContent } = await req.body;
  let openAImessages = await lectureCreateChain.invoke({
    question: courseContent,
    format_instructions: parser.getFormatInstructions(),
  });
  openAImessages = await lipSync({ messages: openAImessages.messages });
  await storeLectureCache({ courseName, lectureIndex, messages: openAImessages });
  res.send("Lecture added successfully");
});

app.get("/getLectures/:courseName/:lectureIndex", async (req, res) => {
  const { courseName, lectureIndex } = req.params;
  const lectures = await getLectureCache({ courseName, lectureIndex });
  res.send({messages: lectures});
});

app.get("/voices", async (req, res) => {
  res.send(await voice.getVoices(elevenLabsApiKey));
});

app.post("/runCodeTts", async (req, res) => {
  const userMessage = await req.body.message;
  if (await sendDefaultMessages({ userMessage })) return;
  let openAImessages = await runCodeTtsChain.invoke({
    question: userMessage,
    format_instructions: parser.getFormatInstructions(),
  });
  openAImessages = await lipSync({ messages: openAImessages.messages });
  res.send({ messages: openAImessages });
});

app.post("/tts", async (req, res) => {
  const userMessage = await req.body.message;
  if (await sendDefaultMessages({ userMessage })) return;
  let openAImessages = await openAIChain.invoke({
    question: userMessage,
    format_instructions: parser.getFormatInstructions(),
  });
  openAImessages = await lipSync({ messages: openAImessages.messages });
  res.send({ messages: openAImessages });
});

app.post("/sts", async (req, res) => {
  const base64Audio = req.body.audio;
  const audioData = Buffer.from(base64Audio, "base64");
  const userMessage = await convertAudioToText({ audioData });
  let openAImessages = await openAIChain.invoke({
    question: userMessage,
    format_instructions: parser.getFormatInstructions(),
  });
  openAImessages = await lipSync({ messages: openAImessages.messages });
  res.send({ messages: openAImessages });
});

app.listen(port, () => {
  console.log(`Jack are listening on port ${port}`);
});
