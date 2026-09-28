import React, { useState } from 'react';
import { Github, Linkedin, Mail, Phone, MapPin, Copy, Check, ArrowRight, ShieldCheck, Award, GraduationCap } from 'lucide-react';
import { RESUME_PERSONAL_INFO, RESUME_CONTACT_DETAILS } from '../data/portfolioData';
import { FadeIn } from './FadeIn';

import { PageId } from './PagePagination';

interface HeroProps {
  onNavigatePage?: (page: PageId) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigatePage }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

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

  return (
    <section id="summary" className="relative pt-10 pb-16 md:pt-16 md:pb-24 overflow-hidden">
      {/* Background ambient gradient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Main Info (Left 7-8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Location & Academic Meta */}
            <FadeIn direction="up" delay={50} distance={15}>
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                <span className="flex items-center gap-1 text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  {RESUME_PERSONAL_INFO.location}
                </span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="text-slate-300">B.Tech in Mathematics & Computing</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="text-emerald-400">RUAS Bengaluru (Expected: 2029)</span>
              </div>
            </FadeIn>

            {/* Name & Title strictly from Resume */}
            <FadeIn direction="up" delay={120} distance={20}>
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                  {RESUME_PERSONAL_INFO.name}
                </h1>
                <p className="text-sm sm:text-base text-emerald-400 font-medium mt-2 leading-relaxed">
                  {RESUME_PERSONAL_INFO.subtitle}
                </p>
              </div>
            </FadeIn>

            {/* Professional Summary exactly from Resume */}
            <FadeIn direction="up" delay={200} distance={20}>
              <div className="bg-[#0e111a] border border-[#1e2336] rounded-xl p-5 sm:p-6 space-y-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Professional Summary</span>
                </div>
                <div className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-3 whitespace-pre-line font-normal">
                  {RESUME_PERSONAL_INFO.professionalSummary}
                </div>
              </div>
            </FadeIn>

            {/* Direct Resume Actions */}
            <FadeIn direction="up" delay={260} distance={15}>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  onClick={() => onNavigatePage ? onNavigatePage('projects') : undefined}
                  className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#090a0f] bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors whitespace-nowrap shadow-md shadow-emerald-500/10 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>View Projects (5)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onNavigatePage ? onNavigatePage('skills') : undefined}
                  className="px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-200 bg-[#131724] hover:bg-[#1a2033] border border-[#23293d] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                >
                  Skills & Certifications
                </button>
                <button
                  onClick={() => onNavigatePage ? onNavigatePage('interests') : undefined}
                  className="px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-200 bg-[#131724] hover:bg-[#1a2033] border border-[#23293d] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                >
                  Areas of Interest
                </button>
                <button
                  onClick={() => onNavigatePage ? onNavigatePage('blog') : undefined}
                  className="px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-200 bg-[#131724] hover:bg-[#1a2033] border border-[#23293d] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                >
                  Technical Blog
                </button>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Direct Contact & Resume Highlights (Right 4 Cols) */}
          <div className="lg:col-span-4 space-y-5">
            {/* Contact Details Card */}
            <FadeIn direction="up" delay={150} distance={20}>
              <div className="bg-[#0e111a] border border-[#1e2336] rounded-xl p-5 space-y-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300 pb-2 border-b border-[#1b2030]">
                  Contact Details
                </h3>

                <div className="space-y-3 text-xs">
                  {/* Email */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-slate-400 truncate">
                      <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                      <a
                        href={`mailto:${RESUME_CONTACT_DETAILS.email}`}
                        className="text-slate-200 hover:text-white truncate"
                      >
                        {RESUME_CONTACT_DETAILS.email}
                      </a>
                    </div>
                    <button
                      onClick={handleCopyEmail}
                      title="Copy email"
                      className="p-1 text-slate-400 hover:text-white hover:bg-[#171c2b] rounded shrink-0"
                    >
                      {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                      <a
                        href={`tel:${RESUME_CONTACT_DETAILS.phone.replace(/\s+/g, '')}`}
                        className="text-slate-200 hover:text-white"
                      >
                        {RESUME_CONTACT_DETAILS.phone}
                      </a>
                    </div>
                    <button
                      onClick={handleCopyPhone}
                      title="Copy phone"
                      className="p-1 text-slate-400 hover:text-white hover:bg-[#171c2b] rounded shrink-0"
                    >
                      {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* LinkedIn */}
                  <div className="flex items-center gap-2 text-slate-400">
                    <Linkedin className="w-4 h-4 text-emerald-400 shrink-0" />
                    <a
                      href={RESUME_CONTACT_DETAILS.linkedinUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-200 hover:text-white truncate"
                    >
                      Hemanth Gowda A (LinkedIn)
                    </a>
                  </div>

                  {/* GitHub */}
                  <div className="flex items-center gap-2 text-slate-400">
                    <Github className="w-4 h-4 text-emerald-400 shrink-0" />
                    <a
                      href={RESUME_CONTACT_DETAILS.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-200 hover:text-white"
                    >
                      github.com/{RESUME_CONTACT_DETAILS.githubHandle}
                    </a>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Resume Key Achievements Card */}
            <FadeIn direction="up" delay={250} distance={20}>
              <div className="bg-[#0e111a] border border-[#1e2336] rounded-xl p-5 space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2 pb-2 border-b border-[#1b2030]">
                  <Award className="w-4 h-4 text-emerald-400" />
                  <span>Key Achievements</span>
                </h3>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  {RESUME_PERSONAL_INFO.keyAchievements.map((ach, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span className="leading-relaxed">{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            {/* Education Summary Card */}
            <FadeIn direction="up" delay={320} distance={20}>
              <div className="bg-[#0e111a] border border-[#1e2336] rounded-xl p-5 space-y-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-emerald-400" />
                  <span>Education</span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-white">
                  {RESUME_PERSONAL_INFO.education.degree}
                </h4>
                <p className="text-xs text-slate-300">
                  {RESUME_PERSONAL_INFO.education.institution}
                </p>
                <p className="text-xs text-emerald-400 font-mono pt-1">
                  Expected Graduation: {RESUME_PERSONAL_INFO.education.expectedGraduation}
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};
