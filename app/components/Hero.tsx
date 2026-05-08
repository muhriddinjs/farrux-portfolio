import Image from "next/image";
import { GitBranch, Link2, Mail, ArrowDown, Download } from "lucide-react";

interface HeroProps {
  name: string;
  headline: string;
  bio: string;
  photo?: string;
  links: {
    github: string;
    linkedin: string;
    email: string;
  };
  ui: {
    availability: string;
    viewCaseStudies: string;
    downloadResume: string;
    connect: string;
  };
}

/** Derive initials from a full name for the fallback avatar */
function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// Hero section — split layout: text left, photo right (Variant 2)
export default function Hero({
  name,
  headline,
  bio,
  photo,
  links,
  ui,
}: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center px-6 pt-20 pb-16 overflow-hidden"
      aria-label="Introduction"
    >
      
      {/* ── CSS ANIMATSIYALI ORQA FON BOSHLANISHI ─────────────────────── */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        {/* Nuqtalar va ularning harakati */}
        <div
          className="absolute -inset-[100%] bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#3f3f46_1px,transparent_1px)] [background-size:32px_32px] opacity-40 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]"
          style={{ animation: "moveBackground 40s linear infinite" }}
        />
      </div>

      {/* Keyframe animatsiyasi (global CSS ga yozish ham mumkin) */}
      <style>{`
        @keyframes moveBackground {
          0% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-30px) translateX(20px); }
          100% { transform: translateY(0) translateX(0); }
        }
      `}</style>
      {/* ── CSS ANIMATSIYALI ORQA FON TUGASHI ────────────────────────── */}


      <div className="relative max-w-5xl mx-auto w-full z-10">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 md:gap-16 items-center">
          {/* ── LEFT / TEXT COLUMN ───────────────────────────────────────── */}
          <div className="order-2 md:order-1 flex flex-col items-center md:items-start text-center md:text-left">
            {/* Availability badge */}
            <div className="flex items-center justify-center md:justify-start gap-2 mb-7">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-xs text-zinc-500 tracking-wide uppercase font-medium">
                {ui.availability}
              </span>
            </div>

            {/* Name label */}
            <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium mb-3 tracking-wide">
              {name}
            </p>

            {/* Main headline — semantic H1 */}
            <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-50 leading-[1.1] tracking-tight mb-5 max-w-xl">
              {headline}
            </h1>

            {/* Bio */}
            <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed mb-9 max-w-lg">
              {bio}
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 mb-10">
              <a
                href="#projects"
                id="hero-view-projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-md transition-all duration-150 shadow-lg shadow-indigo-900/30 ring-1 ring-indigo-500/50"
              >
                {ui.viewCaseStudies}
                <ArrowDown className="w-4 h-4" />
              </a>
              <a
                href="/resume.pdf"
                id="hero-download-resume"
                download
                className="inline-flex items-center gap-2 px-5 py-2.5 glass-card text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 text-sm font-medium rounded-md transition-all duration-150 shadow-sm"
              >
                {ui.downloadResume}
                <Download className="w-4 h-4" />
              </a>
            </div>

            {/* Social links row */}
            <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-4 text-sm text-zinc-500">
              <span className="text-xs text-zinc-700 dark:text-zinc-400 uppercase tracking-wider font-medium">
                {ui.connect}
              </span>
              <div className="flex flex-wrap justify-center items-center gap-2">
                <a
                  href={links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="hero-github"
                  className="flex items-center gap-1.5 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
                  aria-label="GitHub"
                >
                  <GitBranch className="w-4 h-4" />
                  <span className="text-xs font-medium">GitHub</span>
                </a>
                <span className="text-zinc-400 dark:text-zinc-700">·</span>
                <a
                  href={links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="hero-linkedin"
                  className="flex items-center gap-1.5 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Link2 className="w-4 h-4" />
                  <span className="text-xs font-medium">LinkedIn</span>
                </a>
                <span className="text-zinc-400 dark:text-zinc-700">·</span>
                <a
                  href={links.email}
                  id="hero-email"
                  className="flex items-center gap-1.5 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
                  aria-label="Email"
                >
                  <Mail className="w-4 h-4" />
                  <span className="text-xs font-medium">Email</span>
                </a>
              </div>
            </div>
          </div>

          {/* ── RIGHT / PHOTO COLUMN (Hidden on Mobile) ──────────────────── */}
          {/* <div className="hidden md:flex order-1 md:order-2 justify-center md:justify-end">
            {photo ? (
              <div className="relative w-64 h-64 md:w-96 md:h-96 flex-shrink-0 group">
                <div className="absolute inset-0 rounded-2xl  blur-3xl scale-110 -z-10 transition-colors duration-500" />
                <div className="relative w-full h-full rounded-2xl overflow-hidden glass-card p-1 shadow-2xl">
                  <div className="relative w-full h-full rounded-xl overflow-hidden">
                    <Image
                      src={photo}
                      alt={`${name} — profile photo`}
                      fill
                      sizes="(max-width: 768px) 224px, 288px"
                      className="object-cover object-top"
                      priority
                    />
                  </div>
                </div>
                <div
                  className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1.5 
                rounded-full shadow-xl border 
                bg-white/20 dark:bg-zinc-900/20 
                backdrop-blur-md 
                border-white/20 dark:border-white/10"
                >
                  <span className="text-xs font-medium text-zinc-900 dark:text-zinc-100 whitespace-nowrap">
                    {name}
                  </span>
                </div>
              </div>
            ) : (
              <div className="relative w-56 h-56 md:w-72 md:h-72 flex-shrink-0 group">
                <div className="absolute inset-0 rounded-2xl bg-indigo-500/10 blur-3xl scale-110 -z-10 group-hover:bg-indigo-500/20 transition-colors duration-500" />
                <div className="relative w-full h-full rounded-2xl ring-1 ring-zinc-300 dark:ring-zinc-700/60 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl flex items-center justify-center shadow-2xl shadow-zinc-950/20">
                  <span className="text-5xl font-bold text-zinc-400 dark:text-zinc-500 select-none drop-shadow-sm">
                    {getInitials(name)}
                  </span>
                </div>
              </div>
            )}
          </div> */}
        </div>
      </div>
    </section>
  );
}

