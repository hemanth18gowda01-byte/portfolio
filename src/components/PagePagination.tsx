import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export type PageId = 'summary' | 'projects' | 'skills' | 'interests' | 'blog' | 'contact';

export interface PageDefinition {
  id: PageId;
  title: string;
  shortLabel: string;
  resumeRef: string;
}

export const PORTFOLIO_PAGES: PageDefinition[] = [
  { id: 'summary', title: 'Profile & Summary', shortLabel: 'Summary', resumeRef: 'Page 1' },
  { id: 'projects', title: 'Projects (5)', shortLabel: 'Projects', resumeRef: 'Pages 1–3' },
  { id: 'skills', title: 'Skills & Certifications', shortLabel: 'Skills', resumeRef: 'Page 4' },
  { id: 'interests', title: 'Areas of Interest', shortLabel: 'Interests', resumeRef: 'Page 5' },
  { id: 'blog', title: 'Technical Blog & Research', shortLabel: 'Blog', resumeRef: 'Notes' },
  { id: 'contact', title: 'Contact & Inquiries', shortLabel: 'Contact', resumeRef: 'Page 5' },
];

interface PagePaginationProps {
  currentPage: PageId;
  onPageChange: (page: PageId) => void;
}

export const PagePagination: React.FC<PagePaginationProps> = ({
  currentPage,
  onPageChange,
}) => {
  const currentIndex = PORTFOLIO_PAGES.findIndex(p => p.id === currentPage);
  const prevPage = currentIndex > 0 ? PORTFOLIO_PAGES[currentIndex - 1] : null;
  const nextPage = currentIndex < PORTFOLIO_PAGES.length - 1 ? PORTFOLIO_PAGES[currentIndex + 1] : null;

  return (
    <div className="border-t border-[#181d2a] bg-[#0b0d15]/80 backdrop-blur-sm py-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Previous Page Button */}
          <div className="w-full sm:w-auto flex justify-start">
            {prevPage ? (
              <button
                onClick={() => onPageChange(prevPage.id)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#121623] hover:bg-[#1a2033] border border-[#21273c] text-xs font-semibold text-slate-200 hover:text-white transition-all cursor-pointer group"
                title={`Go to ${prevPage.title} (or press Left Arrow)`}
              >
                <ChevronLeft className="w-4 h-4 text-emerald-400 group-hover:-translate-x-0.5 transition-transform" />
                <div className="text-left">
                  <div className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">Previous</div>
                  <div>{prevPage.shortLabel}</div>
                </div>
              </button>
            ) : (
              <div className="h-10 invisible" />
            )}
          </div>

          {/* Center Page Dots & Counter */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-1.5 sm:gap-2">
              {PORTFOLIO_PAGES.map((page, idx) => {
                const isActive = page.id === currentPage;
                return (
                  <button
                    key={page.id}
                    onClick={() => onPageChange(page.id)}
                    className={`h-7 px-2.5 sm:px-3 rounded-md text-xs font-mono font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm shadow-emerald-500/10'
                        : 'bg-[#121623] text-slate-400 hover:text-slate-200 hover:bg-[#181d2d] border border-transparent'
                    }`}
                    title={`Switch to Page ${idx + 1}: ${page.title}`}
                  >
                    <span>{idx + 1}</span>
                    <span className="hidden md:inline text-[11px] font-sans font-normal opacity-80">{page.shortLabel}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
              <span>Page {currentIndex + 1} of {PORTFOLIO_PAGES.length}</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-300 font-sans">{PORTFOLIO_PAGES[currentIndex].title}</span>
              <span className="hidden lg:inline text-slate-600">·</span>
              <span className="hidden lg:inline text-slate-500">keys: [← / →]</span>
            </div>
          </div>

          {/* Next Page Button */}
          <div className="w-full sm:w-auto flex justify-end">
            {nextPage ? (
              <button
                onClick={() => onPageChange(nextPage.id)}
                className="flex items-center justify-end gap-2 px-4 py-2.5 rounded-lg bg-[#121623] hover:bg-[#1a2033] border border-[#21273c] text-xs font-semibold text-slate-200 hover:text-white transition-all cursor-pointer group"
                title={`Go to ${nextPage.title} (or press Right Arrow)`}
              >
                <div className="text-right">
                  <div className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">Next</div>
                  <div>{nextPage.shortLabel}</div>
                </div>
                <ChevronRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
              </button>
            ) : (
              <div className="h-10 invisible" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
