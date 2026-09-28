import React, { useState } from 'react';
import { Search, ArrowUpRight, Plus, BookOpen } from 'lucide-react';
import { useBlog } from '../context/BlogContext';
import { BlogReaderModal } from './BlogReaderModal';
import { FadeIn } from './FadeIn';

export const BlogSection: React.FC = () => {
  const { posts, openCms, activePost, setActivePost } = useBlog();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Filter only published posts
  const publishedPosts = posts.filter(p => p.published);

  const categories = ['All', 'Blockchain Development', 'Cryptography', 'Network Security', 'Stream Ciphers'];

  const filteredPosts = publishedPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.tags && post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  return (
    <div id="blog" className="py-12 sm:py-16 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <FadeIn direction="up" delay={50} distance={20} className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-semibold tracking-wider uppercase text-emerald-400 mb-2">
                Engineering Notes & Research
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Technical Blog & Project Research
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Articles and notes covering our blockchain, cryptography, and network security projects.
              </p>
            </div>

            {/* CMS Fast Action Button */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                onClick={() => openCms()}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-[#121623] hover:bg-[#1b2133] border border-[#23283c] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-emerald-400" />
                <span>Write Post (CMS)</span>
              </button>
            </div>
          </div>
        </FadeIn>

        {/* Filter & Search Bar */}
        <FadeIn direction="up" delay={120} distance={15} className="mb-10">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Category Tabs */}
            <div className="flex items-center gap-1 p-1 bg-[#121623] border border-[#1f2538] rounded-lg overflow-x-auto">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#1e2538] text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search articles by topic, project, or keyword..."
                className="w-full bg-[#0e111a] border border-[#1e2336] focus:border-emerald-400 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none transition-colors"
              />
            </div>
          </div>
        </FadeIn>

        {/* Articles Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 bg-[#0e111a] border border-[#1e2336] rounded-2xl p-6">
            <BookOpen className="w-8 h-8 text-slate-500 mx-auto mb-3" />
            <p className="text-sm font-medium text-slate-300">No articles matched your filter criteria.</p>
            <p className="text-xs text-slate-500 mt-1">Try resetting the category filter or searching for another keyword.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPosts.map((post, idx) => (
              <FadeIn key={post.id} direction="up" delay={idx * 80} distance={20}>
                <article
                  onClick={() => setActivePost(post)}
                  className="group cursor-pointer bg-[#0e111a] hover:bg-[#121623] border border-[#1e2336] hover:border-[#2f3854] rounded-2xl p-6 transition-all duration-200 flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-2.5">
                      <span className="text-emerald-400 font-medium">{post.category}</span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span>{post.publishedAt}</span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span>{post.readTime}</span>
                    </div>

                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                        {post.title}
                      </h3>
                      <div className="p-1 text-slate-500 group-hover:text-emerald-400 transition-colors shrink-0">
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed font-normal">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-5 mt-5 border-t border-[#1a1f2e] flex items-center justify-between text-xs text-slate-400">
                    <div className="truncate max-w-[80%]">
                      {post.tags && post.tags.length > 0 && (
                        <span>{post.tags.join(' · ')}</span>
                      )}
                    </div>
                    <span className="text-emerald-400 font-medium hover:underline shrink-0">
                      Read Article →
                    </span>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        )}
      </div>

      {/* Reader Modal */}
      <BlogReaderModal post={activePost} onClose={() => setActivePost(null)} />
    </div>
  );
};
