import React, { useState, useCallback } from 'react';
import InputForm from './components/InputForm';
import StoryCard from './components/StoryCard';
import BRDView from './components/BRDView';
import { generateUserStories, generateBRD } from './services/geminiService';
import { UserStory, BRDData } from './types';
import { BookOpen, Layers, PenTool, LayoutTemplate } from 'lucide-react';

const App: React.FC = () => {
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedStories, setGeneratedStories] = useState<UserStory[]>([]);
  const [generatedBRD, setGeneratedBRD] = useState<BRDData | null>(null);
  const [activeTab, setActiveTab] = useState<'input' | 'stories' | 'brd'>('input');
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!problem.trim() || !solution.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      // Execute both generations in parallel to save time
      const [stories, brd] = await Promise.all([
        generateUserStories(problem, solution),
        generateBRD(problem, solution)
      ]);

      setGeneratedStories(stories);
      setGeneratedBRD(brd);
      setActiveTab('stories'); // Auto switch to stories view on success
    } catch (err) {
      setError("Failed to generate content. Please try again later or check your inputs.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [problem, solution]);

  const reset = () => {
    setGeneratedStories([]);
    setGeneratedBRD(null);
    setActiveTab('input');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2" onClick={reset} role="button">
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-slate-800 tracking-tight">SpecSmith AI</span>
          </div>

          {generatedBRD && (
            <nav className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab('input')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'input' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <PenTool className="w-4 h-4" />
                <span className="hidden sm:inline">Edit</span>
              </button>
              <button
                onClick={() => setActiveTab('stories')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'stories' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LayoutTemplate className="w-4 h-4" />
                <span className="hidden sm:inline">Stories</span>
              </button>
              <button
                onClick={() => setActiveTab('brd')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'brd' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span className="hidden sm:inline">BRD</span>
              </button>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-4 sm:p-6 lg:p-8">
        {error && (
           <div className="max-w-4xl mx-auto mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
            <strong className="font-bold">Error! </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* Input Tab */}
        {activeTab === 'input' && (
          <div className="animate-fade-in">
             <div className="max-w-4xl mx-auto mb-10 text-center">
                <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Turn Ideas into Specs, Instantly.</h1>
                <p className="text-lg text-slate-600">Enter your problem and solution below. Our AI will craft professional User Stories and a Business Requirements Document for you.</p>
             </div>
             <InputForm 
               problem={problem} 
               solution={solution} 
               setProblem={setProblem} 
               setSolution={setSolution}
               onGenerate={handleGenerate}
               isGenerating={isLoading}
             />
          </div>
        )}

        {/* Stories Tab */}
        {activeTab === 'stories' && (
          <div className="max-w-7xl mx-auto animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-800">User Stories</h2>
              <div className="text-sm text-slate-500">
                Generated {generatedStories.length} stories
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {generatedStories.map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>
          </div>
        )}

        {/* BRD Tab */}
        {activeTab === 'brd' && generatedBRD && (
          <div className="animate-fade-in">
            <BRDView data={generatedBRD} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-400 text-sm">
          <p>© {new Date().getFullYear()} SpecSmith AI. Powered by Google Gemini.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;