import ElevenLabs from "elevenlabs-node";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import OpenAI from "openai";

dotenv.config();

const elevenLabsApiKey = process.env.ELEVEN_LABS_API_KEY;
const voiceID = process.env.ELEVEN_LABS_VOICE_ID;
const modelID = process.env.ELEVEN_LABS_MODEL_ID;

const voice = new ElevenLabs({
  apiKey: elevenLabsApiKey,
  voiceId: voiceID,
});
const openai = new OpenAI();






async function main() {
 
}

async function convertTextToSpeechOpenAi({ text, fileName }) {
  const speechFile = path.resolve(fileName);
  const mp3 = await openai.audio.speech.create({
    model: "tts-1",
    voice: "alloy",
    input: text,
  });
  console.log(speechFile);
  const buffer = Buffer.from(await mp3.arrayBuffer());
  await fs.promises.writeFile(speechFile, buffer);
}



async function convertTextToSpeech({ text, fileName }) {
  const speechFile = path.resolve("./speech.mp3");
  await voice.textToSpeech({
    fileName: fileName,
    textInput: text,
    voiceId: voiceID,
    stability: 0.5,
    similarityBoost: 0.5,
    modelId: modelID,
    style: 1,
    speakerBoost: true,
  });
}

export { convertTextToSpeech, voice , convertTextToSpeechOpenAi};
