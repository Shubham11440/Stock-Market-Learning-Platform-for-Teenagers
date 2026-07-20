async function listModels() {
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.models) {
    console.log("Available models:");
    data.models.forEach(m => console.log(m.name, m.supportedGenerationMethods));
  } else {
    console.log(data);
  }
}
listModels();
