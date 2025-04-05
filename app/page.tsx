'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [maxReadyTime, setMaxReadyTime] = useState('');
  const router = useRouter();

  const isFormValid = query || cuisine || maxReadyTime;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      const searchParams = new URLSearchParams({
        ...(query && { query }),
        ...(cuisine && { cuisine }),
        ...(maxReadyTime && { maxReadyTime }),
      });
      router.push(`/recipes?${searchParams.toString()}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Find Your Recipe
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="query"
              className="block text-sm font-medium text-gray-700"
            >
              Recipe Name
            </label>
            <input
              type="text"
              id="query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., pasta"
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label
              htmlFor="cuisine"
              className="block text-sm font-medium text-gray-700"
            >
              Cuisine
            </label>
            <select
              id="cuisine"
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <option value="">Select a cuisine</option>
              <option value="Italian">Italian</option>
              <option value="Mexican">Mexican</option>
              <option value="Chinese">Chinese</option>
              <option value="German">German</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="maxReadyTime"
              className="block text-sm font-medium text-gray-700"
            >
              Max Preparation Time (minutes)
            </label>
            <input
              type="number"
              id="maxReadyTime"
              value={maxReadyTime}
              onChange={(e) => setMaxReadyTime(e.target.value)}
              min="1"
              placeholder="e.g., 30"
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full py-2 rounded-md text-white font-semibold ${
              isFormValid
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
}
