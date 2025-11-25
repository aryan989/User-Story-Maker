import React from 'react';
import { BRDData } from '../types';
import { FileText, ShieldAlert, Target, ListChecks, Layout } from 'lucide-react';

interface BRDViewProps {
  data: BRDData;
}

const BRDView: React.FC<BRDViewProps> = ({ data }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
      
      {/* Title Header */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">{data.title}</h1>
        <div className="text-sm text-slate-500 font-mono">Business Requirements Document</div>
      </div>

      {/* Exec Summary */}
      <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center gap-2">
          <FileText className="w-5 h-5 text-indigo-600" />
          <h2 className="font-semibold text-slate-900">Executive Summary</h2>
        </div>
        <div className="p-6 text-slate-700 leading-relaxed">
          {data.executiveSummary}
        </div>
      </section>

      {/* Scope */}
      <div className="grid md:grid-cols-2 gap-6">
        <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-emerald-50 px-6 py-4 border-b border-emerald-100 flex items-center gap-2">
            <Target className="w-5 h-5 text-emerald-600" />
            <h2 className="font-semibold text-emerald-900">In Scope</h2>
          </div>
          <ul className="p-6 space-y-2">
            {data.scope.inScope.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-slate-700 text-sm">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-rose-50 px-6 py-4 border-b border-rose-100 flex items-center gap-2">
            <Target className="w-5 h-5 text-rose-600 rotate-45" />
            <h2 className="font-semibold text-rose-900">Out of Scope</h2>
          </div>
          <ul className="p-6 space-y-2">
            {data.scope.outOfScope.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-slate-700 text-sm">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rose-500 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Functional Requirements */}
      <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center gap-2">
          <Layout className="w-5 h-5 text-indigo-600" />
          <h2 className="font-semibold text-slate-900">Functional Requirements</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-3 w-24">ID</th>
                <th className="px-6 py-3">Requirement</th>
                <th className="px-6 py-3 w-32">Priority</th>
              </tr>
            </thead>
            <tbody>
              {data.functionalRequirements.map((req, i) => (
                <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/50">
                  <td className="px-6 py-4 font-mono text-slate-500">{req.id}</td>
                  <td className="px-6 py-4 text-slate-700">{req.description}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                      req.priority === 'High' || req.priority === 'Must Have' 
                      ? 'bg-indigo-50 text-indigo-700 border-indigo-100' 
                      : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}>
                      {req.priority}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Non-Functional & Risks */}
      <div className="grid md:grid-cols-2 gap-6">
        <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center gap-2">
            <ListChecks className="w-5 h-5 text-indigo-600" />
            <h2 className="font-semibold text-slate-900">Non-Functional Req.</h2>
          </div>
          <ul className="p-6 space-y-3">
             {data.nonFunctionalRequirements.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-slate-700 text-sm">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-amber-50 px-6 py-4 border-b border-amber-100 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-600" />
            <h2 className="font-semibold text-amber-900">Risks & Mitigation</h2>
          </div>
          <div className="p-6 space-y-4">
             {data.risksAndMitigation.map((item, i) => (
              <div key={i} className="bg-amber-50/50 p-3 rounded-lg border border-amber-100">
                <div className="text-sm font-semibold text-amber-900 mb-1">⚠️ Risk: {item.risk}</div>
                <div className="text-sm text-amber-800">🛡️ Mitigation: {item.mitigation}</div>
              </div>
            ))}
          </div>
        </section>
      </div>

    </div>
  );
};

export default BRDView;