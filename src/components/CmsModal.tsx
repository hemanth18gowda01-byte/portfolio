import React, { useState, useEffect } from 'react';
import {
  X,
  Plus,
  Trash2,
  Edit,
  Save,
  Download,
  Upload,
  RotateCcw,
  Eye,
  CheckCircle,
  FileText,
  AlertCircle,
  Bold,
  Italic,
  Code,
  List,
  Quote,
  Heading2,
} from 'lucide-react';
import { useBlog } from '../context/BlogContext';
import { BlogPost } from '../types';

export const CmsModal: React.FC = () => {
  const {
    isCmsOpen,
    closeCms,
    posts,
    addPost,
    updatePost,
    deletePost,
    resetPostsToDefault,
    exportPostsJson,
    importPostsJson,
    editingPost,
    setEditingPost,
  } = useBlog();

  const [activeTab, setActiveTab] = useState<'list' | 'editor'>('list');
  const [editorMode, setEditorMode] = useState<'write' | 'preview'>('write');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [importJsonText, setImportJsonText] = useState('');
  const [showImportBox, setShowImportBox] = useState(false);

  // Form fields
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<string>('Blockchain Development');
  const [readTime, setReadTime] = useState('5 min read');
  const [coverImage, setCoverImage] = useState('/src/assets/images/project_blockchain_identity_1790601160807.jpg');
  const [tags, setTags] = useState('Solidity, Web3');
  const [published, setPublished] = useState(true);
  const [formError, setFormError] = useState<string | null>(null);

  // Load editing post data when editingPost changes
  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title);
      setSlug(editingPost.slug);
      setExcerpt(editingPost.excerpt);
      setContent(editingPost.content);
      setCategory(editingPost.category);
      setReadTime(editingPost.readTime);
      setCoverImage(editingPost.coverImage || '');
      setTags(editingPost.tags ? editingPost.tags.join(', ') : '');
      setPublished(editingPost.published);
      setActiveTab('editor');
    }
  }, [editingPost]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleStartCreateNew = () => {
    setEditingPost(null);
    setTitle('');
    setSlug('');
    setExcerpt('');
    setContent(`## Executive Overview\n\nExplain the cryptographic or blockchain problem here.\n\n---\n\n## Implementation Architecture\n\nDescribe the system components and algorithmic mechanics.\n\n\`\`\`solidity\n// Code snippet\n\`\`\`\n\n## Security & Verifiability\n\nDetail the threat model and verification testing.`);
    setCategory('Blockchain Development');
    setReadTime('5 min read');
    setCoverImage('/src/assets/images/project_blockchain_identity_1790601160807.jpg');
    setTags('Solidity, Foundry, Security');
    setPublished(true);
    setFormError(null);
    setActiveTab('editor');
  };

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    if (!editingPost) {
      // Auto generate slug for new posts
      const generatedSlug = newTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setSlug(generatedSlug);
    }
  };

  const insertMarkdown = (before: string, after: string = '') => {
    const textarea = document.getElementById('post-content-textarea') as HTMLTextAreaElement | null;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end) || 'sample text';
    const replacement = `${before}${selectedText}${after}`;

    const newContent = content.substring(0, start) + replacement + content.substring(end);
    setContent(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
    }, 50);
  };

  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setFormError('Title is required.');
      return;
    }
    if (!content.trim()) {
      setFormError('Content cannot be empty.');
      return;
    }

    const tagList = tags
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const postPayload = {
      title: title.trim(),
      slug: slug.trim() || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      excerpt: excerpt.trim() || content.slice(0, 150) + '...',
      content,
      category,
      author: 'Hemanth Gowda A',
      readTime: readTime.trim() || '5 min read',
      coverImage: coverImage.trim() || undefined,
      tags: tagList,
      published,
    };

    if (editingPost) {
      updatePost(editingPost.id, postPayload);
      showToast('Article updated successfully in CMS!');
    } else {
      addPost(postPayload);
      showToast('New article published to blog!');
    }

    setActiveTab('list');
    setEditingPost(null);
  };

  const handleDeletePost = (id: string, postTitle: string) => {
    if (window.confirm(`Are you sure you want to delete "${postTitle}"?`)) {
      deletePost(id);
      showToast('Post removed.');
    }
  };

  const handleImportSubmit = () => {
    if (!importJsonText.trim()) return;
    const success = importPostsJson(importJsonText);
    if (success) {
      showToast('Articles successfully imported!');
      setShowImportBox(false);
      setImportJsonText('');
    } else {
      alert('Invalid JSON structure. Please ensure it is an array of BlogPost objects.');
    }
  };

  if (!isCmsOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-4xl bg-[#0c0f17] border border-[#202538] rounded-2xl shadow-2xl overflow-hidden my-6 flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cms-modal-title"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1c2132] bg-[#101420]">
          <div className="flex items-center gap-3">
            <h2 id="cms-modal-title" className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-400" />
              <span>Content Management System</span>
            </h2>
            <span className="text-xs text-slate-500 hidden sm:inline">· Authoring Mode</span>
          </div>

          <div className="flex items-center gap-3">
            {/* View tabs */}
            <div className="flex items-center p-0.5 bg-[#171c2b] border border-[#232a3e] rounded-lg text-xs">
              <button
                onClick={() => setActiveTab('list')}
                className={`px-3 py-1 font-medium rounded-md transition-colors ${
                  activeTab === 'list' ? 'bg-[#222a42] text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                All Posts ({posts.length})
              </button>
              <button
                onClick={handleStartCreateNew}
                className={`px-3 py-1 font-medium rounded-md transition-colors flex items-center gap-1 ${
                  activeTab === 'editor' && !editingPost ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Plus className="w-3 h-3" />
                <span>New Post</span>
              </button>
            </div>

            <button
              onClick={closeCms}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-[#1a2033] rounded-lg transition-colors"
              aria-label="Close CMS"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toast notification banner */}
        {toastMessage && (
          <div className="bg-emerald-500/15 border-b border-emerald-500/30 px-6 py-2.5 flex items-center gap-2 text-xs font-medium text-emerald-300">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Body Container */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 'list' ? (
            /* Post Listing Tab */
            <div className="space-y-6">
              {/* CMS Controls & Utility Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-[#111522] border border-[#1d2334] rounded-xl text-xs">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleStartCreateNew}
                    className="flex items-center gap-1.5 px-3 py-1.5 font-semibold text-[#090a0f] bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Create New Post</span>
                  </button>
                  <button
                    onClick={exportPostsJson}
                    title="Export all posts as JSON file"
                    className="flex items-center gap-1 px-3 py-1.5 text-slate-300 hover:text-white bg-[#181d2c] hover:bg-[#20273c] border border-[#242b40] rounded-lg transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-400" />
                    <span>Export JSON</span>
                  </button>
                  <button
                    onClick={() => setShowImportBox(!showImportBox)}
                    className="flex items-center gap-1 px-3 py-1.5 text-slate-300 hover:text-white bg-[#181d2c] hover:bg-[#20273c] border border-[#242b40] rounded-lg transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5 text-slate-400" />
                    <span>Import JSON</span>
                  </button>
                </div>

                <button
                  onClick={() => {
                    if (window.confirm('Reset all posts to original default articles? Any custom posts will be overwritten.')) {
                      resetPostsToDefault();
                      showToast('Posts restored to default.');
                    }
                  }}
                  className="flex items-center gap-1 text-slate-400 hover:text-amber-400 transition-colors"
                  title="Revert to original seed articles"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restore Defaults</span>
                </button>
              </div>

              {/* Import JSON Box */}
              {showImportBox && (
                <div className="p-4 bg-[#141824] border border-[#252c42] rounded-xl space-y-3">
                  <label className="text-xs font-semibold text-slate-300">
                    Paste BlogPost JSON Array:
                  </label>
                  <textarea
                    rows={4}
                    value={importJsonText}
                    onChange={e => setImportJsonText(e.target.value)}
                    placeholder='[ { "title": "...", "content": "..." } ]'
                    className="w-full bg-[#0a0c13] border border-[#202538] rounded-lg p-2.5 text-xs font-mono text-slate-200"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setShowImportBox(false)}
                      className="px-3 py-1 text-xs text-slate-400 hover:text-slate-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleImportSubmit}
                      className="px-3 py-1 text-xs font-medium text-[#090a0f] bg-emerald-400 rounded-md hover:bg-emerald-300"
                    >
                      Parse & Import
                    </button>
                  </div>
                </div>
              )}

              {/* Posts Table */}
              <div className="border border-[#1e2336] rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#121623] text-slate-400 uppercase tracking-wider font-semibold border-b border-[#1e2336]">
                    <tr>
                      <th className="px-4 py-3">Title & Category</th>
                      <th className="px-4 py-3 hidden sm:table-cell">Date</th>
                      <th className="px-4 py-3 hidden md:table-cell">Status</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#171c2b] bg-[#0c0f17]">
                    {posts.map(post => (
                      <tr key={post.id} className="hover:bg-[#121624] transition-colors">
                        <td className="px-4 py-3.5">
                          <p className="font-semibold text-white text-sm hover:text-emerald-400 transition-colors">
                            {post.title}
                          </p>
                          <div className="flex items-center gap-2 text-slate-400 text-[11px] mt-0.5">
                            <span className="text-emerald-400">{post.category}</span>
                            <span>·</span>
                            <span>{post.readTime}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3.5 text-slate-400 font-mono hidden sm:table-cell">
                          {post.publishedAt}
                        </td>
                        <td className="px-4 py-3.5 hidden md:table-cell">
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                              post.published
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                                : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                            }`}
                          >
                            {post.published ? 'Published' : 'Draft'}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => {
                                setEditingPost(post);
                                setActiveTab('editor');
                              }}
                              title="Edit post"
                              className="p-1.5 text-slate-400 hover:text-white hover:bg-[#1c2234] rounded transition-colors"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeletePost(post.id, post.title)}
                              title="Delete post"
                              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-[#1c2234] rounded transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* Post Editor Tab */
            <form onSubmit={handleSavePost} className="space-y-5">
              {formError && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-lg flex items-center gap-2 text-xs text-rose-300">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Row 1: Title & Slug */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Article Title *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={e => handleTitleChange(e.target.value)}
                    placeholder="e.g. Invariant Fuzzing in Solidity with Foundry"
                    className="w-full bg-[#121624] border border-[#1f2538] focus:border-emerald-400 rounded-lg px-3 py-2 text-xs sm:text-sm text-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">URL Slug</label>
                  <input
                    type="text"
                    value={slug}
                    onChange={e => setSlug(e.target.value)}
                    placeholder="invariant-fuzzing-solidity-foundry"
                    className="w-full bg-[#121624] border border-[#1f2538] focus:border-emerald-400 rounded-lg px-3 py-2 text-xs text-slate-300 font-mono focus:outline-none"
                  />
                </div>
              </div>

              {/* Row 2: Category, Read Time, Published status */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Category</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as any)}
                    className="w-full bg-[#121624] border border-[#1f2538] focus:border-emerald-400 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                  >
                    <option value="Blockchain Development">Blockchain Development</option>
                    <option value="Cryptography">Cryptography</option>
                    <option value="Network Security">Network Security</option>
                    <option value="Stream Ciphers">Stream Ciphers</option>
                    <option value="Zero-Knowledge Proofs">Zero-Knowledge Proofs</option>
                    <option value="Computational Mathematics">Computational Mathematics</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Read Time</label>
                  <input
                    type="text"
                    value={readTime}
                    onChange={e => setReadTime(e.target.value)}
                    placeholder="5 min read"
                    className="w-full bg-[#121624] border border-[#1f2538] focus:border-emerald-400 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1 flex flex-col justify-end">
                  <label className="flex items-center gap-2 text-xs font-medium text-slate-300 cursor-pointer pb-2">
                    <input
                      type="checkbox"
                      checked={published}
                      onChange={e => setPublished(e.target.checked)}
                      className="rounded bg-[#121624] border-[#1f2538] text-emerald-500 focus:ring-0"
                    />
                    <span>Publish Immediately</span>
                  </label>
                </div>
              </div>

              {/* Row 3: Excerpt */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Short Summary / Excerpt</label>
                <textarea
                  rows={2}
                  value={excerpt}
                  onChange={e => setExcerpt(e.target.value)}
                  placeholder="A concise synopsis of the core findings, mathematics, or smart contract mechanisms..."
                  className="w-full bg-[#121624] border border-[#1f2538] focus:border-emerald-400 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-200 focus:outline-none"
                />
              </div>

              {/* Row 4: Tags & Cover Image Preset */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Tags (comma separated)</label>
                  <input
                    type="text"
                    value={tags}
                    onChange={e => setTags(e.target.value)}
                    placeholder="Solidity, Foundry, ERC-4337, Math"
                    className="w-full bg-[#121624] border border-[#1f2538] focus:border-emerald-400 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Cover Image Preset</label>
                  <select
                    value={coverImage}
                    onChange={e => setCoverImage(e.target.value)}
                    className="w-full bg-[#121624] border border-[#1f2538] focus:border-emerald-400 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                  >
                    <option value="/src/assets/images/project_blockchain_identity_1790601160807.jpg">
                      Decentralized Identity & Keys
                    </option>
                    <option value="/src/assets/images/project_crypto_analyzer_1790601173642.jpg">
                      Cryptographic Entropy & Waveforms
                    </option>
                    <option value="/src/assets/images/hemanth_developer_portrait_1790601146642.jpg">
                      Author Portrait
                    </option>
                  </select>
                </div>
              </div>

              {/* Row 5: Content Markdown Editor & Live Preview Switch */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-semibold text-slate-300 mr-2">Markdown Content</span>
                    {/* Helper formatting buttons */}
                    <button
                      type="button"
                      onClick={() => insertMarkdown('## ', '')}
                      title="Insert Heading"
                      className="p-1 text-slate-400 hover:text-white bg-[#171c2b] rounded hover:bg-[#20273c]"
                    >
                      <Heading2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertMarkdown('**', '**')}
                      title="Bold"
                      className="p-1 text-slate-400 hover:text-white bg-[#171c2b] rounded hover:bg-[#20273c]"
                    >
                      <Bold className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertMarkdown('*', '*')}
                      title="Italic"
                      className="p-1 text-slate-400 hover:text-white bg-[#171c2b] rounded hover:bg-[#20273c]"
                    >
                      <Italic className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertMarkdown('```\n', '\n```')}
                      title="Code Block"
                      className="p-1 text-slate-400 hover:text-white bg-[#171c2b] rounded hover:bg-[#20273c]"
                    >
                      <Code className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertMarkdown('- ', '')}
                      title="Bullet List"
                      className="p-1 text-slate-400 hover:text-white bg-[#171c2b] rounded hover:bg-[#20273c]"
                    >
                      <List className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertMarkdown('> ', '')}
                      title="Quote"
                      className="p-1 text-slate-400 hover:text-white bg-[#171c2b] rounded hover:bg-[#20273c]"
                    >
                      <Quote className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Mode switch */}
                  <div className="flex items-center p-0.5 bg-[#171c2b] border border-[#232a3e] rounded-md text-xs">
                    <button
                      type="button"
                      onClick={() => setEditorMode('write')}
                      className={`px-2.5 py-0.5 rounded transition-colors ${
                        editorMode === 'write' ? 'bg-[#222a42] text-white' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Write
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditorMode('preview')}
                      className={`px-2.5 py-0.5 rounded transition-colors ${
                        editorMode === 'preview' ? 'bg-[#222a42] text-white' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Live Preview
                    </button>
                  </div>
                </div>

                {editorMode === 'write' ? (
                  <textarea
                    id="post-content-textarea"
                    rows={12}
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    placeholder="Write article in standard markdown syntax..."
                    className="w-full bg-[#101420] border border-[#1f2538] focus:border-emerald-400 rounded-xl p-4 text-xs sm:text-sm font-mono text-slate-200 leading-relaxed focus:outline-none"
                  />
                ) : (
                  <div className="bg-[#101420] border border-[#1f2538] rounded-xl p-6 min-h-[300px] max-h-[400px] overflow-y-auto text-xs sm:text-sm text-slate-200 space-y-3">
                    <h3 className="text-xl font-bold text-white mb-2">{title || 'Untitled Post'}</h3>
                    <p className="text-xs text-slate-400 italic mb-4">{excerpt || 'No excerpt provided.'}</p>
                    <div className="whitespace-pre-line font-sans leading-relaxed">
                      {content}
                    </div>
                  </div>
                )}
              </div>

              {/* Form Action Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-[#1c2132]">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('list');
                    setEditingPost(null);
                  }}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-[#090a0f] bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors shadow-sm shadow-emerald-500/20"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{editingPost ? 'Update Article' : 'Publish Article'}</span>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
