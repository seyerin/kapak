// Konfigurasi API (API Key akan disediakan oleh lingkungan runtime)
const apiKey = ""; 
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

// Fungsi untuk melakukan panggilan API dengan Exponential Backoff
const fetchWithExponentialBackoff = async (url, options, maxRetries = 5) => {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        return response;
      } else if (response.status === 429 && attempt < maxRetries - 1) {
        // Too Many Requests (429), retry after delay
        const delay = Math.pow(2, attempt) * 1000 + Math.random() * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      } else {
        // Non-recoverable error
        const errorBody = await response.text();
        throw new Error(`API returned status ${response.status}: ${errorBody}`);
      }
    } catch (error) {
      if (attempt === maxRetries - 1) {
        throw new Error(`Failed to fetch after ${maxRetries} attempts: ${error.message}`);
      }
      // Delay for next retry
      const delay = Math.pow(2, attempt) * 1000 + Math.random() * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  throw new Error("Exceeded max retries without successful response.");
};


// Fungsi utama untuk interaksi dengan AI
export const askAI = async (prompt, systemPrompt) => {
  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    tools: [{ "google_search": {} }], // Menggunakan Google Search untuk grounding data real-time
    systemInstruction: {
        parts: [{ text: systemPrompt }]
    },
  };

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  };

  try {
    const response = await fetchWithExponentialBackoff(GEMINI_API_URL, options);
    const result = await response.json();
    const candidate = result.candidates?.[0];

    if (candidate && candidate.content?.parts?.[0]?.text) {
      return candidate.content.parts[0].text;
    }
    console.error("AI response structure missing:", result);
    return "Maaf, saya tidak dapat memproses permintaan Anda saat ini. Coba lagi.";
  } catch (error) {
    console.error("Error communicating with AI:", error);
    return "Terjadi kesalahan koneksi dengan server AI. Mohon coba beberapa saat lagi.";
  }
};