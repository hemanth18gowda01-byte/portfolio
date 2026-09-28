import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { RESUME_PROJECTS } from '../data/portfolioData';
import { ResumeProject } from '../types';
import { ProjectDetailModal } from './ProjectDetailModal';
import { FadeIn } from './FadeIn';

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ResumeProject | null>(null);

  return (
    <div id="projects" className="py-12 sm:py-16 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <FadeIn direction="up" delay={50} distance={20} className="mb-10">
          <div>
            <div className="text-xs font-semibold tracking-wider uppercase text-emerald-400 mb-2">
              Resume Section · Projects (5)
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Projects
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl font-normal">
              Decentralized identity, cryptographic randomness testing, RSA secure communications, DES cipher, and stream cipher generator.
            </p>
          </div>
        </FadeIn>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {RESUME_PROJECTS.map((project, idx) => {
            const isFullSpan = idx === 0;

            return (
              <FadeIn
                key={project.id}
                direction="up"
                delay={idx * 80}
                distance={24}
                className={isFullSpan ? 'md:col-span-2' : 'col-span-1'}
              >
                <div
                  onClick={() => setSelectedProject(project)}
                  className="group cursor-pointer bg-[#0e111a] hover:bg-[#121623] border border-[#1e2336] hover:border-[#2f3854] rounded-2xl p-6 transition-all duration-200 flex flex-col justify-between h-full"
                >
                  <div className="space-y-4">
                    {/* Category & Tech Headline */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                        {project.category}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        {project.techLine}
                      </span>
                    </div>

                    {/* Project Title */}
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                        {project.title}
                      </h3>
                      <div className="p-1 text-slate-500 group-hover:text-emerald-400 transition-colors shrink-0">
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Exact Bullets from Resume */}
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                      {project.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2">
                          <span className="text-emerald-400 mt-0.5 font-bold">❖</span>
                          <span className="leading-relaxed">{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Technologies Used */}
                    <div className="pt-2">
                      <p className="text-xs text-slate-400 mb-1.5 font-medium">Technologies:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 text-xs text-slate-300 bg-[#161b2b] border border-[#222a3d] rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer action link */}
                  <div className="pt-4 mt-5 border-t border-[#1a1f2e] flex items-center justify-between text-xs text-slate-400">
                    <span className="text-slate-500 font-mono">
                      Project 0{idx + 1} of 05
                    </span>
                    <span className="text-emerald-400 font-medium group-hover:underline flex items-center gap-1">
                      <span>Inspect Specification</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
};
