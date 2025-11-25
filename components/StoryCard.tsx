import React from 'react';
import { UserStory } from '../types';
import { Clipboard, CheckSquare } from 'lucide-react';

interface StoryCardProps {
  story: UserStory;
}

const StoryCard: React.FC<StoryCardProps> = ({ story }) => {
  const priorityColor = {
    High: 'bg-red-50 text-red-700 border-red-200',
    Medium: 'bg-amber-50 text-amber-700 border-amber-200',
    Low: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  }[story.priority] || 'bg-slate-50 text-slate-700 border-slate-200';

  const copyToClipboard = () => {
    const text = `Title: ${story.title}\nAs a ${story.role}, I want to ${story.goal}, so that ${story.benefit}.\n\nAcceptance Criteria:\n${story.acceptanceCriteria.map(ac => `- ${ac}`).join('\n')}`;
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-5 border-b border-slate-100 flex justify-between items-start gap-3">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-wider">{story.id}</span>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${priorityColor}`}>
              {story.priority}
            </span>
            {story.estimationPoints && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full border bg-slate-100 text-slate-600 border-slate-200">
                {story.estimationPoints} pts
              </span>
            )}
          </div>
          <h3 className="font-semibold text-slate-900 leading-tight">{story.title}</h3>
        </div>
        <button 
          onClick={copyToClipboard}
          className="text-slate-400 hover:text-indigo-600 transition-colors p-1"
          title="Copy Story"
        >
          <Clipboard className="w-4 h-4" />
        </button>
      </div>

      {/* Body */}
      <div className="p-5 flex-grow space-y-4">
        <div className="space-y-1">
          <p className="text-sm text-slate-600"><span className="font-medium text-slate-900">As a</span> {story.role}</p>
          <p className="text-sm text-slate-600"><span className="font-medium text-slate-900">I want to</span> {story.goal}</p>
          <p className="text-sm text-slate-600"><span className="font-medium text-slate-900">So that</span> {story.benefit}</p>
        </div>

        <div className="pt-2">
          <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
            <CheckSquare className="w-3 h-3" /> Acceptance Criteria
          </h4>
          <ul className="space-y-1.5">
            {story.acceptanceCriteria.map((criteria, idx) => (
              <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-indigo-400 flex-shrink-0" />
                <span>{criteria}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;