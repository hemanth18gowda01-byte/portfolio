import React, { useState } from 'react';
import { Menu, X, Settings, ArrowUpRight } from 'lucide-react';
import { useBlog } from '../context/BlogContext';
import { PageId, PORTFOLIO_PAGES } from './PagePagination';

interface NavbarProps {
  currentPage: PageId;
  onPageChange: (page: PageId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onPageChange }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openCms } = useBlog();

  const handleSelectPage = (pageId: PageId) => {
    onPageChange(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#1e2230] bg-[#090a0f]/95 backdrop-blur-md transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Wordmark (Clicking returns to Summary Page) */}
        <button
          onClick={() => handleSelectPage('summary')}
          className="text-left group cursor-pointer focus:outline-none"
        >
          <div className="text-base sm:text-lg font-bold tracking-tight text-slate-100 group-hover:text-emerald-400 transition-colors whitespace-nowrap">
            HEMANTH GOWDA A
          </div>
          <div className="text-[10px] text-slate-400 font-mono tracking-wider uppercase group-hover:text-slate-300">
            Portfolio & Resume
          </div>
        </button>

        {/* Page-to-Page Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1 text-xs sm:text-sm font-medium">
          {PORTFOLIO_PAGES.map((page, idx) => {
            const isActive = page.id === currentPage;
            return (
              <button
                key={page.id}
                onClick={() => handleSelectPage(page.id)}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-[#131724]'
                }`}
              >
                <span className={`text-[10px] font-mono ${isActive ? 'text-emerald-400' : 'text-slate-500'}`}>
                  0{idx + 1}
                </span>
                <span>{page.shortLabel}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => openCms()}
            title="Open Content Management System to publish and update articles"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-[#131622] hover:bg-[#1b2030] border border-[#24293d] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
          >
            <Settings className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">CMS Editor</span>
            <span className="sm:hidden">CMS</span>
          </button>

          <button
            onClick={() => handleSelectPage('contact')}
            className={`hidden sm:inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              currentPage === 'contact'
                ? 'text-[#090a0f] bg-emerald-400 shadow-sm shadow-emerald-500/30'
                : 'text-slate-200 bg-[#161a29] hover:bg-emerald-400 hover:text-[#090a0f] border border-[#242a3d]'
            }`}
          >
            <span>Contact</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="lg:hidden p-2 text-slate-400 hover:text-slate-100 hover:bg-[#131622] rounded-lg transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer with page selection */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#1e2230] bg-[#0c0e16] px-4 py-4 space-y-2">
          <div className="text-[10px] text-slate-400 uppercase font-mono px-3 mb-1">Select Page</div>
          <div className="grid grid-cols-2 gap-2">
            {PORTFOLIO_PAGES.map((page, idx) => {
              const isActive = page.id === currentPage;
              return (
                <button
                  key={page.id}
                  onClick={() => handleSelectPage(page.id)}
                  className={`text-left px-3 py-2.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between cursor-pointer ${
                    isActive
                      ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-semibold'
                      : 'text-slate-300 hover:text-white bg-[#131724]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-emerald-400">0{idx + 1}</span>
                    <span>{page.shortLabel}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">{page.resumeRef}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#1e2230] flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openCms();
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-medium text-slate-200 bg-[#151928] rounded-lg border border-[#24293d] cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5 text-emerald-400" />
              <span>Open Content Management System (CMS)</span>
            </button>
            <button
              onClick={() => handleSelectPage('contact')}
              className="flex items-center justify-center gap-1.5 w-full py-2.5 text-xs font-semibold text-[#090a0f] bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors cursor-pointer"
            >
              <span>Contact Hemanth</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
