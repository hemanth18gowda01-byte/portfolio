import React, { useState, useEffect } from 'react';
import { BlogProvider } from './context/BlogContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { InterestsSection } from './components/InterestsSection';
import { BlogSection } from './components/BlogSection';
import { ContactSection } from './components/ContactSection';
import { PagePagination, PageId, PORTFOLIO_PAGES } from './components/PagePagination';
import { Footer } from './components/Footer';
import { CmsModal } from './components/CmsModal';

export default function App() {
  // Read initial page from URL hash if valid, otherwise default to 'summary'
  const getInitialPage = (): PageId => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const validPage = PORTFOLIO_PAGES.find(p => p.id === hash);
      if (validPage) return validPage.id;
      // Handle aliases
      if (hash === 'competencies' || hash === 'certifications' || hash === 'education') return 'skills';
    }
    return 'summary';
  };

  const [currentPage, setCurrentPage] = useState<PageId>(getInitialPage);

  const handlePageChange = (pageId: PageId) => {
    setCurrentPage(pageId);
    window.location.hash = pageId;
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Sync hash changes (e.g. browser back/forward buttons)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const matched = PORTFOLIO_PAGES.find(p => p.id === hash);
      if (matched) {
        setCurrentPage(matched.id);
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (hash === 'competencies' || hash === 'certifications' || hash === 'education') {
        setCurrentPage('skills');
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Keyboard navigation: Left/Right arrows to flip pages
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger page flipping if user is typing inside an input, textarea, or contentEditable
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable ||
          target.closest('.cms-editor-modal'))
      ) {
        return;
      }

      const currentIndex = PORTFOLIO_PAGES.findIndex(p => p.id === currentPage);

      if (e.key === 'ArrowRight' && currentIndex < PORTFOLIO_PAGES.length - 1) {
        handlePageChange(PORTFOLIO_PAGES[currentIndex + 1].id);
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        handlePageChange(PORTFOLIO_PAGES[currentIndex - 1].id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage]);

  return (
    <BlogProvider>
      <div className="min-h-screen bg-[#090a0f] text-slate-100 flex flex-col selection:bg-emerald-500/20 selection:text-emerald-300">
        {/* Top Sticky Header with Page Tabs */}
        <Navbar currentPage={currentPage} onPageChange={handlePageChange} />

        {/* Main Content: Dedicated Page Views (No infinite scrolling) */}
        <main className="flex-1 w-full flex flex-col justify-start">
          <div key={currentPage} className="w-full animate-fadeIn transition-opacity duration-200">
            {currentPage === 'summary' && <Hero onNavigatePage={handlePageChange} />}
            {currentPage === 'projects' && <ProjectsSection />}
            {currentPage === 'skills' && <SkillsSection />}
            {currentPage === 'interests' && <InterestsSection />}
            {currentPage === 'blog' && <BlogSection />}
            {currentPage === 'contact' && <ContactSection />}
          </div>
        </main>

        {/* Bottom Page-to-Page Navigation Bar */}
        <PagePagination
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />

        {/* Site Footer */}
        <Footer currentPage={currentPage} onPageChange={handlePageChange} />

        {/* CMS Editor Modal */}
        <CmsModal />
      </div>
    </BlogProvider>
  );
}
