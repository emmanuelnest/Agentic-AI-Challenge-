import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Task Manager - Agentic AI Challenge
        </h1>
        <p className="text-gray-600 mb-4">
          This is the initial setup. Features will be implemented using AI
          agents!
        </p>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCount((count) => count + 1)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Count: {count}
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          Built with React + TypeScript + Vite + Tailwind CSS
        </p>
      </div>
    </div>
  );
}

export default App;
