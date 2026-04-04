import { GraduationCap, MapPin, Calendar, Star } from "lucide-react";

interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: { start: string; end: string };
  gpa: string | null;
  highlights: string[];
}

// Individual education card
function EducationCard({ item }: { item: EducationItem }) {
  return (
    <div className="group glass-card rounded-xl p-5 transition-all duration-200">

      {/* Top row — degree + GPA badge */}
      <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
        <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 leading-snug max-w-sm">
          {item.degree}
        </h3>
        {item.gpa && (
          <span className="flex-shrink-0 flex items-center gap-1 text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
            <Star className="w-3 h-3" />
            GPA {item.gpa}
          </span>
        )}
      </div>

      {/* Institution name */}
      <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium mb-3">
        {item.institution}
      </p>

      {/* Meta — location + period */}
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
      <ul className="space-y-1.5">
        {item.highlights.map((point, i) => (
          <li key={i} className="flex gap-2.5 text-sm text-zinc-600 dark:text-zinc-400">
            <span className="mt-2 w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-600 flex-shrink-0" />
            <span className="leading-relaxed">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Education section
export default function Education({
  education,
  ui,
}: {
  education: EducationItem[];
  ui: any;
}) {
  return (
    <section
      id="education"
      className="px-6 py-20 border-t border-zinc-200 dark:border-zinc-800/40"
      aria-labelledby="education-heading"
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-10 md:gap-16 items-start">

          {/* ── Left label (same grid pattern as Experience) ── */}
          <div>
            <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold uppercase tracking-widest mb-3">
              {ui.label}
            </p>
            <h2
              id="education-heading"
              className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight mb-3"
            >
              {ui.heading}
            </h2>
            <p className="text-zinc-500 text-sm leading-relaxed">
              {ui.description}
            </p>
            <div className="mt-5 flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-600">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>{education.length} {ui.credentials}</span>
            </div>
          </div>

          {/* ── Cards column ── */}
          <div className="flex flex-col gap-4">
            {education.map((item) => (
              <EducationCard key={item.id} item={item} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
