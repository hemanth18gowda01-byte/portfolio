import React from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { RESUME_PERSONAL_INFO, RESUME_CONTACT_DETAILS } from '../data/portfolioData';
import { useBlog } from '../context/BlogContext';
import { PageId, PORTFOLIO_PAGES } from './PagePagination';

interface FooterProps {
  currentPage?: PageId;
  onPageChange?: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ currentPage, onPageChange }) => {
  const { openCms } = useBlog();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#181d2a] bg-[#07080d] py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[#141824]">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              {RESUME_PERSONAL_INFO.name}
            </h3>
            <p className="text-xs text-emerald-400 mt-1">
              {RESUME_PERSONAL_INFO.subtitle}
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              {RESUME_PERSONAL_INFO.location} · {RESUME_PERSONAL_INFO.education.degree} ({RESUME_PERSONAL_INFO.education.institution})
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-slate-400">
            {PORTFOLIO_PAGES.map(page => (
              <button
                key={page.id}
                onClick={() => onPageChange?.(page.id)}
                className={`transition-colors cursor-pointer ${
                  currentPage === page.id
                    ? 'text-emerald-400 font-semibold'
                    : 'hover:text-emerald-400'
                }`}
              >
                {page.shortLabel}
              </button>
            ))}
            <span className="text-slate-600">·</span>
            <button
              onClick={() => openCms()}
              className="text-emerald-400 hover:underline cursor-pointer"
            >
              CMS Editor
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-xs text-slate-500">
          <div className="flex items-center gap-4">
            <span>Verified Portfolio & Resume</span>
            <span>·</span>
            <a
              href={`mailto:${RESUME_CONTACT_DETAILS.email}`}
              className="hover:text-slate-300 transition-colors"
            >
              {RESUME_CONTACT_DETAILS.email}
            </a>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={RESUME_CONTACT_DETAILS.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-300 transition-colors"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={RESUME_CONTACT_DETAILS.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-300 transition-colors"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${RESUME_CONTACT_DETAILS.email}`}
              className="hover:text-slate-300 transition-colors"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-emerald-400 transition-colors ml-2 cursor-pointer"
              title="Scroll to top of current page"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
