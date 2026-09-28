import React, { useEffect, useState } from 'react';
import { X, Calendar, Clock, User, Share2, Check, ArrowLeft, Edit3 } from 'lucide-react';
import { BlogPost } from '../types';
import { useBlog } from '../context/BlogContext';

interface BlogReaderModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export const BlogReaderModal: React.FC<BlogReaderModalProps> = ({ post, onClose }) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const { openCms } = useBlog();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (post) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [post, onClose]);

  if (!post) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Simple Markdown renderer for headings, code blocks, bold text, lists, and paragraphs
  const renderMarkdownContent = (content: string) => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeLanguage = '';
    let codeBuffer: string[] = [];

    lines.forEach((line, index) => {
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          elements.push(
            <div key={`code-${index}`} className="my-5 rounded-xl border border-[#23283c] bg-[#090b12] overflow-x-auto p-4 text-xs font-mono text-emerald-300">
              <pre>{codeBuffer.join('\n')}</pre>
            </div>
          );
          codeBuffer = [];
          inCodeBlock = false;
        } else {
          inCodeBlock = true;
          codeLanguage = line.slice(3).trim();
        }
        return;
      }

      if (inCodeBlock) {
        codeBuffer.push(line);
        return;
      }

      if (line.startsWith('## ')) {
        elements.push(
          <h2 key={index} className="text-xl sm:text-2xl font-bold text-white mt-8 mb-3 tracking-tight">
            {line.replace('## ', '')}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        elements.push(
          <h3 key={index} className="text-lg font-bold text-slate-100 mt-6 mb-2">
            {line.replace('### ', '')}
          </h3>
        );
      } else if (line.startsWith('- ')) {
        elements.push(
          <li key={index} className="text-sm sm:text-base text-slate-300 ml-4 list-disc my-1">
            {line.replace('- ', '')}
          </li>
        );
      } else if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ') || line.startsWith('4. ')) {
        elements.push(
          <li key={index} className="text-sm sm:text-base text-slate-300 ml-4 list-decimal my-1">
            {line.replace(/^[0-9]+\.\s/, '')}
          </li>
        );
      } else if (line === '---') {
        elements.push(<hr key={index} className="my-6 border-[#1e2336]" />);
      } else if (line.trim().length > 0) {
        elements.push(
          <p key={index} className="text-sm sm:text-base text-slate-300 leading-relaxed my-3 font-normal">
            {line}
          </p>
        );
      }
    });

    return elements;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-3xl bg-[#0c0f17] border border-[#202538] rounded-2xl shadow-2xl overflow-hidden my-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="reader-title"
      >
        {/* Top Sticky Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1c2132] bg-[#101420]">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Articles</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                openCms(post);
              }}
              title="Edit this article in CMS"
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white bg-[#191f30] hover:bg-[#222a42] border border-[#262e46] rounded-md transition-colors"
            >
              <Edit3 className="w-3 h-3 text-emerald-400" />
              <span>Edit in CMS</span>
            </button>
            <button
              onClick={handleShare}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-[#1b2133] rounded-md transition-colors"
              title="Share article link"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-[#1b2133] rounded-md transition-colors"
              aria-label="Close article"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Article Body */}
        <div className="p-6 sm:p-10 max-h-[82vh] overflow-y-auto">
          {/* Metadata: Clean unboxed text with typographic separators */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mb-3">
            <span className="text-emerald-400 font-medium">{post.category}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>{post.publishedAt}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>{post.readTime}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>By {post.author}</span>
          </div>

          {/* Title */}
          <h1 id="reader-title" className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-[1.2] mb-5">
            {post.title}
          </h1>

          {/* Excerpt Lead */}
          <p className="text-base text-slate-300 border-l-2 border-emerald-400/80 pl-4 py-1 italic mb-8">
            {post.excerpt}
          </p>

          {/* Cover image if available */}
          {post.coverImage && (
            <div className="mb-8 rounded-xl overflow-hidden border border-[#1e2336] aspect-[16/8] bg-[#121623]">
              <img
                src={post.coverImage}
                alt={post.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Rendered Markdown Content */}
          <div className="prose prose-invert max-w-none text-slate-200">
            {renderMarkdownContent(post.content)}
          </div>

          {/* Tags (clean unboxed text list) */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-10 pt-6 border-t border-[#1c2132] text-xs text-slate-400">
              <span className="text-slate-500 mr-2">Topics:</span>
              <span>{post.tags.join(' · ')}</span>
            </div>
          )}

          {/* Author Card Footer */}
          <div className="mt-8 p-5 bg-[#101420] border border-[#1e2436] rounded-xl flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400">Written by</p>
              <h4 className="text-sm font-bold text-white mt-0.5">{post.author}</h4>
              <p className="text-xs text-slate-400">B.Tech Mathematics & Computing · Blockchain & Cryptography</p>
            </div>
            <a
              href="#contact"
              onClick={onClose}
              className="text-xs font-medium text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
            >
              Discuss with author →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
