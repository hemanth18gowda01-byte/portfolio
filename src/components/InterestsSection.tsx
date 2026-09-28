import React from 'react';
import { Compass } from 'lucide-react';
import { RESUME_AREAS_OF_INTEREST } from '../data/portfolioData';
import { FadeIn } from './FadeIn';

export const InterestsSection: React.FC = () => {
  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        <div>
          <FadeIn direction="up" delay={50} distance={20}>
            <div className="text-xs font-semibold tracking-wider uppercase text-emerald-400 mb-2">
              Resume Section · Page 5
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Areas of Interest
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-2xl leading-relaxed">
              Academic and technical interests spanning blockchain protocols, smart contract security auditing,
              modern cryptography, zero-knowledge proofs, and computational mathematics.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {RESUME_AREAS_OF_INTEREST.map((area, idx) => (
            <FadeIn key={idx} direction="up" delay={idx * 60} distance={20}>
              <div className="bg-[#0e111a] border border-[#1e2336] hover:border-emerald-500/40 rounded-xl p-6 space-y-3 flex flex-col justify-between h-full transition-all group">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 font-mono mb-2">
                    <span className="text-emerald-400 font-semibold">0{idx + 1}</span>
                    <Compass className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                    {area.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {area.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
};
