import { GoogleGenerativeAI } from '@google/generative-ai'

async function run() {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || '');
  
  const modelsToTest = [
    'gemini-3.5-flash',
    'gemini-2.5-flash',
    'gemini-2.0-flash',
    'gemini-2.0-flash-lite',
  ];

  for (const modelName of modelsToTest) {
    try {
      console.log(`Testing ${modelName}...`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const res = await model.generateContent('Hi');
      console.log(`✅ ${modelName} success:`, res.response.text());
      break; // Stop on first success
    } catch (e) {
      console.error(`❌ ${modelName} failed:`, e.message);
    }
  }
}
run();
