import React, { useState } from 'react';
import { LucideBot, LucideSend, LucideInfo, LucideLoader, LucideX } from 'lucide-react';
import { askAI } from '@/features/ai-assistant/geminiService';

export const AIAssistant = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const systemPrompt = `Anda adalah seorang Konsultan Pajak profesional di Indonesia. Berikan jawaban yang akurat, informatif, dan mudah dipahami dalam Bahasa Indonesia mengenai PPh Pasal 21, 4(2), 23, atau pertanyaan umum perpajakan. Jika Anda menggunakan data real-time, pastikan untuk menyebutkannya.`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setResponse(null);
    setIsLoading(true);

    try {
      const aiResponse = await askAI(query, systemPrompt);
      setResponse(aiResponse);
    } catch (error) {
      setResponse("Terjadi kesalahan fatal saat menghubungi AI. Coba lagi nanti.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 p-4 rounded-full bg-indigo-600 text-white shadow-2xl hover:bg-indigo-700 transition duration-300 z-50 transform hover:scale-105"
        aria-label="Buka Asisten AI"
      >
        <LucideBot className="w-7 h-7" />
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 flex items-center justify-center font-spartan">
          <div className="bg-white rounded-xl w-full max-w-lg mx-4 shadow-2xl flex flex-col h-[85vh] border border-slate-300">
            <header className="p-4 bg-indigo-600 text-white rounded-t-xl flex justify-between items-center">
              <h2 className="text-xl font-bold flex items-center">
                <LucideBot className="w-6 h-6 mr-2" />
                Asisten Pajak Digital (AI)
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-full hover:bg-indigo-500 transition">
                <LucideX className="w-6 h-6" />
              </button>
            </header>

            <div className="flex-grow p-4 space-y-4 overflow-y-auto bg-slate-50">
              {/* Pesan Selamat Datang */}
              <div className="flex justify-start">
                <div className="bg-indigo-100 p-3 rounded-xl max-w-[85%] shadow-sm text-sm text-indigo-900">
                  <p className="font-semibold mb-1">Halo! Saya adalah Konsultan Pajak AI Anda.</p>
                  <p>Tanyakan apa pun tentang PPh 21, PPh 4(2), atau PPh 23. Saya akan memberikan informasi akurat dari sumber terpercaya.</p>
                </div>
              </div>
              
              {/* Respon AI */}
              {response && (
                <div className="flex justify-start">
                  <div className="bg-white p-3 rounded-xl max-w-[85%] shadow-md border border-slate-200 text-sm whitespace-pre-wrap">
                    <p className="font-bold text-indigo-700 mb-1 flex items-center"><LucideBot className="w-4 h-4 mr-1"/> AI Response:</p>
                    {response}
                  </div>
                </div>
              )}

              {/* Loading Indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-200 p-3 rounded-xl max-w-[85%] shadow-sm text-sm text-slate-700 flex items-center animate-pulse">
                    <LucideLoader className="w-4 h-4 mr-2 animate-spin" />
                    Memproses permintaan...
                  </div>
                </div>
              )}

              {/* Tips */}
              {!isLoading && !response && (
                <div className="flex justify-start">
                    <div className="bg-yellow-100/60 p-3 rounded-xl max-w-[85%] shadow-sm text-xs text-yellow-800 flex items-center">
                        <LucideInfo className="w-4 h-4 mr-2 flex-shrink-0" />
                        Coba tanyakan: "Apa perbedaan antara PPh 4(2) dan PPh 23?"
                    </div>
                </div>
              )}

            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-slate-200 bg-white rounded-b-xl">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Tanyakan tentang PPh 21, 4(2), atau 23..."
                  className="flex-grow rounded-lg border-slate-300 p-3 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition duration-150"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !query.trim()}
                  className={`p-3 rounded-lg text-white transition duration-300 flex items-center justify-center
                    ${isLoading || !query.trim() ? 'bg-indigo-300' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                >
                  <LucideSend className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};