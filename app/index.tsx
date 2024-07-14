'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Page() {
  const [text, setText] = useState<string>('');
  const [aiLikelihoodScore, setAiLikelihoodScore] = useState<number | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setDarkMode(storedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleThemeSwitch = () => {
    setDarkMode(!darkMode);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAiLikelihoodScore(null);

    try {
      console.log('Submitting text:', text);
      const response = await axios.post('/api/detect', { text });
      console.log('API response:', response.data);
      setAiLikelihoodScore(response.data.aiLikelihoodScore);
    } catch (error) {
      console.error('Error during API call:', error);
      alert(
        'An error occurred during the API call. Check the console for more details.'
      );
    } finally {
      setLoading(false);
    }
  };

  const getGradientColor = (score: number): string => {
    if (score >= 75) return 'from-red-500 to-red-700';
    if (score >= 50) return 'from-yellow-500 to-yellow-700';
    return 'from-green-500 to-green-700';
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-center text-indigo-600 dark:text-indigo-400">
            EduGuard - AI Detection for Teachers
          </h1>
          <button
            onClick={handleThemeSwitch}
            className="bg-indigo-600 dark:bg-indigo-400 text-white dark:text-gray-900 px-4 py-2 rounded-lg shadow-md hover:bg-indigo-700 dark:hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
        <form onSubmit={handleSubmit} className="mb-4">
          <textarea
            className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-900"
            rows={5}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to detect"
            required
          />
          <button
            type="submit"
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 text-white mr-3"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 2.042.636 3.937 1.709 5.291l1.291-1.291z"
                  ></path>
                </svg>
                Detecting...
              </div>
            ) : (
              'Detect'
            )}
          </button>
        </form>
        {aiLikelihoodScore !== null && (
          <div
            className={`mt-4 p-4 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm bg-gradient-to-r ${getGradientColor(
              aiLikelihoodScore
            )} text-white text-center text-2xl font-bold`}
          >
            Likelihood of Being AI-generated: {aiLikelihoodScore}%
          </div>
        )}
      </div>
    </div>
  );
}
