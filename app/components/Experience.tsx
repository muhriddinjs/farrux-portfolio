import { MapPin, Calendar, Briefcase } from "lucide-react";

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  type: string;
  period: { start: string; end: string };
  highlights: string[];
}

// Badge color by job type
const typeBadge: Record<string, string> = {
  "Full-time": "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
  Internship: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  "Part-time": "text-sky-400 bg-sky-500/10 border-sky-500/20",
};

// Individual experience entry — timeline card
function ExperienceCard({
  item,
  isLast,
}: {
  item: ExperienceItem;
  isLast: boolean;
}) {
  const badgeClass =
    typeBadge[item.type] ??
    "text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700";

  return (
    <div className="relative flex gap-6">
      {/* ── Timeline spine ── */}
      <div className="flex flex-col items-center flex-shrink-0">
        {/* Dot */}
        <div className="mt-1 w-3 h-3 rounded-full bg-zinc-200 dark:bg-zinc-800 border-2 border-indigo-500 flex-shrink-0 ring-4 ring-white dark:ring-zinc-950" />
        {/* Connector line (hidden on last item) */}
        {!isLast && (
          <div className="w-px flex-1 bg-zinc-200 dark:bg-zinc-800/80 mt-2" />
        )}
      </div>

      {/* ── Content card ── */}
      <div className={`pb-10 ${isLast ? "pb-0" : ""} flex-1 min-w-0`}>
        <div className="group glass-card rounded-xl p-5 transition-all duration-200">

          {/* Header row */}
          <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
            <div>
              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                {item.role}
              </h3>
              <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium mt-0.5">
                {item.company}
              </p>
            </div>
            <span
              className={`flex-shrink-0 text-xs font-medium px-2 py-0.5 rounded-md border ${badgeClass}`}
            >
              {item.type}
            </span>
          </div>

          {/* Meta row — location + period */}
          <div className="flex flex-wrap items-center gap-4 mb-4 text-xs text-zinc-500">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
              {item.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
              {item.period.start} — {item.period.end}
            </span>
          </div>

          {/* Highlights */}
          <ul className="space-y-2">
            {item.highlights.map((point, i) => (
              <li key={i} className="flex gap-2.5 text-sm text-zinc-600 dark:text-zinc-400">
                <span className="mt-2 w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-600 flex-shrink-0" />
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// Experience section
export default function Experience({
  experience,
  ui,
}: {
  experience: ExperienceItem[];
  ui: any;
}) {
  return (
    <section
      id="experience"
      className="px-6 py-20 border-t border-zinc-200 dark:border-zinc-800/40"
      aria-labelledby="experience-heading"
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-10 md:gap-16">

          {/* ── Sticky left label ── */}
          <div className="md:pt-1">
            <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold uppercase tracking-widest mb-3">
              {ui.label}
            </p>
            <h2
              id="experience-heading"
              className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight mb-3"
            >
              {ui.heading}
            </h2>
            <p className="text-zinc-500 text-sm leading-relaxed">
              {experience.length} {ui.description}
            </p>
            <div className="mt-5 flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-600">
              <Briefcase className="w-3.5 h-3.5" />
              <span>
                {experience.find((e) => e.period.end === ui.present)?.company || experience[0]?.company}
              </span>
            </div>
          </div>

          {/* ── Timeline ── */}
          <div>
            {experience.map((item, idx) => (
              <ExperienceCard
                key={item.id}
                item={item}
                isLast={idx === experience.length - 1}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
