import React, { useEffect } from 'react';
import { X, Github, CheckCircle2, Code2 } from 'lucide-react';
import { ResumeProject } from '../types';

interface ProjectDetailModalProps {
  project: ResumeProject | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-3xl bg-[#0e111a] border border-[#23283c] rounded-2xl shadow-2xl overflow-hidden my-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1e2336] bg-[#121623]">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="text-emerald-400 font-medium">{project.category}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Resume Project Specification</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-[#1a2033] rounded-lg transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Title & Tech Line */}
          <div>
            <h2 id="project-modal-title" className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {project.title}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-400 font-mono mt-1.5">
              {project.techLine}
            </p>
          </div>

          {/* Resume Project Implementation Bullets */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Project Description & Highlights (From Resume)
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
              {project.bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2.5 bg-[#121624] border border-[#1d2336] p-3.5 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span className="leading-relaxed">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies Listed */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Technologies Used (From Resume)
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs font-medium text-slate-200 bg-[#161b2b] border border-[#232a3e] rounded-md"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Code Snippet if present */}
          {project.codeSnippet && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono text-slate-300 flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                  {project.codeSnippet.filename}
                </span>
                <span className="uppercase font-mono text-slate-500">{project.codeSnippet.language}</span>
              </div>
              <div className="bg-[#090b12] border border-[#1e2336] rounded-xl p-4 overflow-x-auto text-xs font-mono text-slate-300 leading-relaxed">
                <pre>{project.codeSnippet.code}</pre>
              </div>
            </div>
          )}
        </div>

        {/* Modal Action Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#1e2336] bg-[#121623]">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-200 bg-[#191f30] hover:bg-[#222a42] border border-[#2b334e] rounded-lg transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>GitHub Profile: hemanth18gowda01-byte</span>
          </a>

          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-[#1a2033] rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
