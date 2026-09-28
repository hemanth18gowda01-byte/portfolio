import React, { createContext, useContext, useState, useEffect } from 'react';
import { BlogPost, ContactMessage } from '../types';
import { INITIAL_BLOG_POSTS } from '../data/portfolioData';

interface BlogContextType {
  posts: BlogPost[];
  activePost: BlogPost | null;
  setActivePost: (post: BlogPost | null) => void;
  isCmsOpen: boolean;
  openCms: (postToEdit?: BlogPost) => void;
  closeCms: () => void;
  editingPost: BlogPost | null;
  setEditingPost: (post: BlogPost | null) => void;
  addPost: (post: Omit<BlogPost, 'id' | 'publishedAt'>) => BlogPost;
  updatePost: (id: string, updatedFields: Partial<BlogPost>) => void;
  deletePost: (id: string) => void;
  resetPostsToDefault: () => void;
  exportPostsJson: () => void;
  importPostsJson: (jsonString: string) => boolean;
  // Contact messages
  messages: ContactMessage[];
  addMessage: (msg: Omit<ContactMessage, 'id' | 'timestamp'>) => void;
  deleteMessage: (id: string) => void;
  clearMessages: () => void;
}

const STORAGE_KEY = 'hemanth_portfolio_posts_v2';
const MESSAGES_KEY = 'hemanth_portfolio_messages_v1';

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<BlogPost[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load posts from storage', e);
    }
    return INITIAL_BLOG_POSTS;
  });

  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [isCmsOpen, setIsCmsOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  const [messages, setMessages] = useState<ContactMessage[]>(() => {
    try {
      const saved = localStorage.getItem(MESSAGES_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return [
      {
        id: 'msg-sample-1',
        name: 'Ethereum Research Group',
        email: 'research@ethresearch.org',
        subject: 'Collaboration on ERC-7730 Clear Signing Metadata',
        message: 'Hi Hemanth, saw your work on ERC-7730 and Account Abstraction. We would love to discuss your insights on schema parsing and Foundry test methodologies!',
        timestamp: '2026-09-20 14:32',
      },
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    } catch (e) {
      console.error('Failed to persist posts', e);
    }
  }, [posts]);

  useEffect(() => {
    try {
      localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
    } catch (e) {
      console.error('Failed to persist messages', e);
    }
  }, [messages]);

  const openCms = (postToEdit?: BlogPost) => {
    setEditingPost(postToEdit || null);
    setIsCmsOpen(true);
  };

  const closeCms = () => {
    setIsCmsOpen(false);
    setEditingPost(null);
  };

  const addPost = (postData: Omit<BlogPost, 'id' | 'publishedAt'>): BlogPost => {
    const today = new Date().toISOString().split('T')[0];
    const newPost: BlogPost = {
      ...postData,
      id: `post-${Date.now()}`,
      publishedAt: today,
    };
    setPosts(prev => [newPost, ...prev]);
    return newPost;
  };

  const updatePost = (id: string, updatedFields: Partial<BlogPost>) => {
    setPosts(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updatedFields } : p))
    );
    if (activePost && activePost.id === id) {
      setActivePost(prev => (prev ? { ...prev, ...updatedFields } : null));
    }
  };

  const deletePost = (id: string) => {
    setPosts(prev => prev.filter(p => p.id !== id));
    if (activePost && activePost.id === id) {
      setActivePost(null);
    }
    if (editingPost && editingPost.id === id) {
      setEditingPost(null);
    }
  };

  const resetPostsToDefault = () => {
    setPosts(INITIAL_BLOG_POSTS);
    localStorage.removeItem(STORAGE_KEY);
  };

  const exportPostsJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(posts, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `hemanth-blog-posts-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importPostsJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].title && parsed[0].content) {
        setPosts(parsed);
        return true;
      }
    } catch {
      // ignore
    }
    return false;
  };

  const addMessage = (msg: Omit<ContactMessage, 'id' | 'timestamp'>) => {
    const now = new Date();
    const formatted = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newMsg: ContactMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      timestamp: formatted,
    };
    setMessages(prev => [newMsg, ...prev]);
  };

  const deleteMessage = (id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return (
    <BlogContext.Provider
      value={{
        posts,
        activePost,
        setActivePost,
        isCmsOpen,
        openCms,
        closeCms,
        editingPost,
        setEditingPost,
        addPost,
        updatePost,
        deletePost,
        resetPostsToDefault,
        exportPostsJson,
        importPostsJson,
        messages,
        addMessage,
        deleteMessage,
        clearMessages,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};
