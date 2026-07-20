import { GoogleGenerativeAI } from '@google/generative-ai'

async function run() {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || '');
  
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const res = await model.generateContent('Hi');
    console.log(res.response.text());
  } catch (e) {
    console.error('gemini-1.5-flash failed:', e.message);
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });
    const res = await model.generateContent('Hi');
    console.log(res.response.text());
  } catch (e) {
    console.error('gemini-1.5-flash-latest failed:', e.message);
  }
}
run();
