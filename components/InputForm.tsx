import React from 'react';
import { Sparkles } from 'lucide-react';

interface InputFormProps {
  problem: string;
  solution: string;
  setProblem: (val: string) => void;
  setSolution: (val: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ 
  problem, 
  solution, 
  setProblem, 
  setSolution, 
  onGenerate,
  isGenerating
}) => {
  const isFormValid = problem.trim().length > 10 && solution.trim().length > 10;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
        <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 text-sm font-bold">1</span>
          Define the Problem
        </h2>
        <p className="text-slate-500 mb-3 text-sm">What user pain point or business inefficiency are you trying to solve?</p>
        <textarea
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          placeholder="e.g., Users struggle to track their daily water intake because current apps are too complex and require too many clicks..."
          className="w-full h-32 p-4 rounded-lg border border-slate-600 bg-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all resize-none text-white placeholder:text-slate-400"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
        <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
           <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 text-sm font-bold">2</span>
          Proposed Solution
        </h2>
        <p className="text-slate-500 mb-3 text-sm">Briefly describe your idea, product, or feature set.</p>
        <textarea
          value={solution}
          onChange={(e) => setSolution(e.target.value)}
          placeholder="e.g., A minimalist mobile app with a one-tap widget for logging water, daily goals, and simple hydration history charts..."
          className="w-full h-32 p-4 rounded-lg border border-slate-600 bg-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all resize-none text-white placeholder:text-slate-400"
        />
      </div>

      <div className="flex justify-center pt-4">
        <button
          onClick={onGenerate}
          disabled={!isFormValid || isGenerating}
          className={`
            group relative flex items-center gap-3 px-8 py-4 rounded-full text-lg font-medium transition-all duration-200 shadow-lg
            ${!isFormValid || isGenerating 
              ? 'bg-slate-300 text-slate-500 cursor-not-allowed' 
              : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-indigo-500/30 hover:-translate-y-1'
            }
          `}
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Crafting Specs...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Generate Specs
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default InputForm;