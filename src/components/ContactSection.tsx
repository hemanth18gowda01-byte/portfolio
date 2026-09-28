import React, { useState } from 'react';
import { Mail, Phone, Send, Check, Copy, ExternalLink, MessageSquare, CheckCircle2, Github, Linkedin } from 'lucide-react';
import { RESUME_CONTACT_DETAILS } from '../data/portfolioData';
import { useBlog } from '../context/BlogContext';
import { FadeIn } from './FadeIn';

export const ContactSection: React.FC = () => {
  const { addMessage, messages } = useBlog();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Blockchain Development');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [showInquiriesDrawer, setShowInquiriesDrawer] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(RESUME_CONTACT_DETAILS.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(RESUME_CONTACT_DETAILS.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      addMessage({
        name: name.trim(),
        email: email.trim(),
        subject,
        message: message.trim(),
      });
      setIsSubmitting(false);
      setSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
    }, 600);
  };

  return (
    <div id="contact" className="py-12 sm:py-16 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <FadeIn direction="up" delay={50} distance={20} className="mb-10">
          <div>
            <div className="text-xs font-semibold tracking-wider uppercase text-emerald-400 mb-2">
              Resume Section · Contact Details
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Contact & Inquiries
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Get in touch directly regarding blockchain engineering, smart contract security, and cryptographic development.
            </p>
          </div>
        </FadeIn>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Direct Resume Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <FadeIn direction="up" delay={100} distance={20}>
              <div className="bg-[#0e111a] border border-[#1e2336] rounded-2xl p-6 space-y-6">
                <h3 className="text-base font-bold text-white tracking-tight">
                  Verified Contact Details
                </h3>

                {/* Email */}
                <div className="space-y-1">
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                    Email
                  </span>
                  <div className="flex items-center justify-between gap-2 pt-1">
                    <a
                      href={`mailto:${RESUME_CONTACT_DETAILS.email}`}
                      className="text-xs sm:text-sm font-mono text-slate-200 hover:text-emerald-400 transition-colors truncate"
                    >
                      {RESUME_CONTACT_DETAILS.email}
                    </a>
                    <button
                      onClick={handleCopyEmail}
                      title="Copy email address"
                      className="p-1.5 text-slate-400 hover:text-white hover:bg-[#1a2033] rounded-md transition-colors shrink-0"
                    >
                      {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-1 pt-4 border-t border-[#1c2132]">
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                    Phone
                  </span>
                  <div className="flex items-center justify-between gap-2 pt-1">
                    <a
                      href={`tel:${RESUME_CONTACT_DETAILS.phone.replace(/\s+/g, '')}`}
                      className="text-xs sm:text-sm font-mono text-slate-200 hover:text-emerald-400 transition-colors"
                    >
                      {RESUME_CONTACT_DETAILS.phone}
                    </a>
                    <button
                      onClick={handleCopyPhone}
                      title="Copy phone number"
                      className="p-1.5 text-slate-400 hover:text-white hover:bg-[#1a2033] rounded-md transition-colors shrink-0"
                    >
                      {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-1 pt-4 border-t border-[#1c2132]">
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                    Location
                  </span>
                  <p className="text-xs sm:text-sm text-slate-300 pt-1">
                    {RESUME_CONTACT_DETAILS.location}
                  </p>
                </div>

                {/* LinkedIn & GitHub */}
                <div className="space-y-2 pt-4 border-t border-[#1c2132]">
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                    Profiles
                  </span>
                  <div className="flex flex-col gap-2 pt-1 text-xs">
                    <a
                      href={RESUME_CONTACT_DETAILS.linkedinUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between text-slate-300 hover:text-emerald-400 py-1"
                    >
                      <span className="flex items-center gap-2">
                        <Linkedin className="w-4 h-4 text-emerald-400" />
                        <span>LinkedIn Profile</span>
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                    </a>
                    <a
                      href={RESUME_CONTACT_DETAILS.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between text-slate-300 hover:text-emerald-400 py-1"
                    >
                      <span className="flex items-center gap-2">
                        <Github className="w-4 h-4 text-emerald-400" />
                        <span>GitHub: {RESUME_CONTACT_DETAILS.githubHandle}</span>
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                    </a>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Inquiries sent counter / viewer */}
            <FadeIn direction="up" delay={180} distance={15}>
              <div className="p-4 bg-[#111420] border border-[#1d2334] rounded-xl flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>{messages.length} Message{messages.length === 1 ? '' : 's'} on Record</span>
                </span>
                <button
                  type="button"
                  onClick={() => setShowInquiriesDrawer(!showInquiriesDrawer)}
                  className="text-emerald-400 hover:underline font-medium cursor-pointer"
                >
                  {showInquiriesDrawer ? 'Hide Messages' : 'View Sent Messages'}
                </button>
              </div>

              {/* Message log panel */}
              {showInquiriesDrawer && (
                <div className="mt-3 p-4 bg-[#0a0c14] border border-[#20263b] rounded-xl space-y-3 max-h-60 overflow-y-auto text-xs">
                  <p className="font-semibold text-slate-200">Local Inquiries Inbox:</p>
                  {messages.length === 0 ? (
                    <p className="text-slate-500">No sent messages recorded yet.</p>
                  ) : (
                    messages.map(m => (
                      <div key={m.id} className="p-2.5 bg-[#121624] border border-[#1d2336] rounded-lg space-y-1">
                        <div className="flex items-center justify-between font-medium text-slate-200">
                          <span>{m.name} ({m.email})</span>
                          <span className="text-[10px] text-slate-500 font-mono">{m.timestamp}</span>
                        </div>
                        <p className="text-emerald-400 text-[11px]">{m.subject}</p>
                        <p className="text-slate-300 text-[11px] leading-relaxed">{m.message}</p>
                      </div>
                    ))
                  )}
                </div>
              )}
            </FadeIn>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <FadeIn direction="up" delay={160} distance={20}>
              <div className="bg-[#0e111a] border border-[#1e2336] rounded-2xl p-6 sm:p-8">
                {submitted ? (
                  <div className="text-center py-10 space-y-4">
                    <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Message Transmitted</h3>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                      Thank you for reaching out. Your message has been sent to {RESUME_CONTACT_DETAILS.email}.
                    </p>
                    <div className="pt-4 flex items-center justify-center gap-3">
                      <button
                        onClick={() => setSubmitted(false)}
                        className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white bg-[#151928] border border-[#23293e] rounded-lg transition-colors cursor-pointer"
                      >
                        Send Another Message
                      </button>
                      <a
                        href={`mailto:${RESUME_CONTACT_DETAILS.email}?subject=${encodeURIComponent(subject)}`}
                        className="px-4 py-2 text-xs font-semibold text-[#090a0f] bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors"
                      >
                        Open Email App
                      </a>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label htmlFor="contact-name" className="text-xs font-semibold text-slate-300">
                          Name *
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          value={name}
                          onChange={e => setName(e.target.value)}
                          placeholder="Your name"
                          className="w-full bg-[#121624] border border-[#1f2538] focus:border-emerald-400 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none transition-colors"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="contact-email" className="text-xs font-semibold text-slate-300">
                          Email *
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          placeholder="your.email@example.com"
                          className="w-full bg-[#121624] border border-[#1f2538] focus:border-emerald-400 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="contact-subject" className="text-xs font-semibold text-slate-300">
                        Subject
                      </label>
                      <select
                        id="contact-subject"
                        value={subject}
                        onChange={e => setSubject(e.target.value)}
                        className="w-full bg-[#121624] border border-[#1f2538] focus:border-emerald-400 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none transition-colors"
                      >
                        <option value="Blockchain Development">Blockchain Development & Smart Contracts</option>
                        <option value="Smart Contract Security">Smart Contract Security & Auditing</option>
                        <option value="Cryptography & ZKP">Cryptography & Zero-Knowledge Proofs</option>
                        <option value="Computational Mathematics">Computational Mathematics & Algorithms</option>
                        <option value="General Inquiry">General Inquiry</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="contact-message" className="text-xs font-semibold text-slate-300">
                        Message *
                      </label>
                      <textarea
                        id="contact-message"
                        rows={5}
                        required
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        placeholder="Write your message here..."
                        className="w-full bg-[#121624] border border-[#1f2538] focus:border-emerald-400 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none transition-colors resize-y leading-relaxed font-normal"
                      />
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <p className="text-[11px] text-slate-500">
                        Direct contact: {RESUME_CONTACT_DETAILS.email}
                      </p>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-semibold text-[#090a0f] bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 rounded-lg transition-colors shadow-sm shadow-emerald-500/20 whitespace-nowrap cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
};
