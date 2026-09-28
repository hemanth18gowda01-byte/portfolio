export interface ResumeProject {
  id: string;
  title: string;
  techLine: string;
  category: 'Blockchain' | 'Cryptography' | 'Network Security' | 'Stream Ciphers';
  bullets: string[];
  technologies: string[];
  githubUrl: string;
  codeSnippet?: {
    language: string;
    filename: string;
    code: string;
  };
}

export interface TechnicalSkillGroup {
  category: string;
  description?: string;
  items: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialTitle: string;
  credentialUrl: string;
}

export interface AreaOfInterest {
  title: string;
  description: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime: string;
  coverImage?: string;
  tags: string[];
  published: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  read?: boolean;
}
