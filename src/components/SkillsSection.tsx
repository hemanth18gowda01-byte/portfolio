import React from 'react';
import { Award, GraduationCap, ExternalLink, CheckCircle } from 'lucide-react';
import {
  RESUME_CORE_COMPETENCIES,
  RESUME_TECHNICAL_SKILLS,
  RESUME_CERTIFICATIONS,
  RESUME_PERSONAL_INFO,
} from '../data/portfolioData';
import { FadeIn } from './FadeIn';

export const SkillsSection: React.FC = () => {
  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16">
        {/* ============================================================== */}
        {/* 1. CORE COMPETENCIES (From Page 1 of Resume) */}
        {/* ============================================================== */}
        <div>
          <FadeIn direction="up" delay={50} distance={20}>
            <div className="text-xs font-semibold tracking-wider uppercase text-emerald-400 mb-2">
              Resume Section · Page 1
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Core Competencies
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-2xl leading-relaxed">
              Foundational and applied competencies in decentralized network architectures, smart contract engineering, and mathematical cryptography.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {RESUME_CORE_COMPETENCIES.map((group, idx) => (
              <FadeIn key={idx} direction="up" delay={idx * 70} distance={20}>
                <div className="bg-[#0e111a] border border-[#1e2336] rounded-xl p-5 space-y-2.5 h-full">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                    {group.category}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                    {group.skills.join(' • ')}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* ============================================================== */}
        {/* 2. TECHNICAL & ANNOTATION SKILLS (From Page 4 of Resume) */}
        {/* ============================================================== */}
        <div>
          <FadeIn direction="up" delay={50} distance={20}>
            <div className="text-xs font-semibold tracking-wider uppercase text-emerald-400 mb-2">
              Resume Section · Page 4
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Technical & Annotation Skills
            </h2>
          </FadeIn>

          <div className="space-y-4 mt-6">
            {RESUME_TECHNICAL_SKILLS.map((skill, idx) => (
              <FadeIn key={idx} direction="up" delay={idx * 60} distance={20}>
                <div className="bg-[#0e111a] border border-[#1e2336] rounded-xl p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white">
                      {skill.category}
                    </h3>
                    <span className="text-xs text-slate-500 font-mono">
                      {skill.items.length} items
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {skill.content}
                  </p>
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {skill.items.map((item, itemIdx) => (
                      <span
                        key={itemIdx}
                        className="px-2 py-0.5 text-xs text-slate-300 bg-[#141926] border border-[#20273a] rounded"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* ============================================================== */}
        {/* 3. CERTIFICATIONS (From Page 4 of Resume) */}
        {/* ============================================================== */}
        <div>
          <FadeIn direction="up" delay={50} distance={20}>
            <div className="text-xs font-semibold tracking-wider uppercase text-emerald-400 mb-2">
              Resume Section · Page 4
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Certifications (5)
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-2xl leading-relaxed">
              Verified certifications from IIT Kharagpur, Cyfrin Updraft, and Hack The Box. Click any credential to inspect the live verification.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {RESUME_CERTIFICATIONS.map((cert, idx) => (
              <FadeIn key={cert.id} direction="up" delay={idx * 70} distance={20}>
                <div className="bg-[#0e111a] border border-[#1e2336] rounded-xl p-5 space-y-2.5 flex flex-col justify-between h-full">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm sm:text-base font-bold text-white">
                        {cert.title}
                      </h3>
                      <Award className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-emerald-400 font-medium">{cert.issuer}</span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span className="text-slate-400 font-mono">{cert.issueDate}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#1a1f2e] text-xs flex flex-wrap items-center gap-1.5">
                    <span className="text-slate-500">Credential link:</span>
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-mono underline decoration-emerald-500/40 hover:decoration-emerald-400 transition-colors group/link"
                      title={`View verification for ${cert.title}`}
                    >
                      <span>[{cert.credentialTitle}]</span>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0 opacity-70 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all" />
                    </a>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* ============================================================== */}
        {/* 4. EDUCATION & KEY ACHIEVEMENTS (From Page 4 of Resume) */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Education Card */}
          <FadeIn direction="up" delay={80} distance={20}>
            <div className="bg-[#0e111a] border border-[#1e2336] rounded-xl p-6 space-y-4 h-full">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-emerald-400">
                <GraduationCap className="w-4 h-4" />
                <span>Education</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  {RESUME_PERSONAL_INFO.education.degree}
                </h3>
                <p className="text-sm text-slate-300 mt-1">
                  {RESUME_PERSONAL_INFO.education.institution}
                </p>
                <p className="text-xs text-emerald-400 font-mono mt-2">
                  Expected Graduation: {RESUME_PERSONAL_INFO.education.expectedGraduation}
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Key Achievements Card */}
          <FadeIn direction="up" delay={140} distance={20}>
            <div className="bg-[#0e111a] border border-[#1e2336] rounded-xl p-6 space-y-4 h-full">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-emerald-400">
                <CheckCircle className="w-4 h-4" />
                <span>Key Achievements</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                {RESUME_PERSONAL_INFO.keyAchievements.map((ach, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span className="leading-relaxed">{ach}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
};
