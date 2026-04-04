interface SkillCategory {
  category: string;
  items: string[];
}

// Icon map for each skill category — using emoji for zero-dependency icons
const categoryMeta: Record<
  string,
  { icon: string; description: string }
> = {
  "Data Manipulation": {
    icon: "⚙️",
    description: "Core tools for wrangling and transforming data at scale.",
  },
  Visualization: {
    icon: "📊",
    description: "Turning numbers into charts that drive decisions.",
  },
  "Statistical Analysis": {
    icon: "🔬",
    description: "Rigorous methods to separate signal from noise.",
  },
  "Machine Learning": {
    icon: "🤖",
    description: "Building predictive models from historical patterns.",
  },
  Infrastructure: {
    icon: "🏗️",
    description: "Data warehouse, pipeline, and version control tooling.",
  },
};

// Individual skill group card
function SkillGroup({ group }: { group: SkillCategory }) {
  const meta = categoryMeta[group.category] ?? {
    icon: "📌",
    description: "",
  };

  return (
    <div
      className="glass-card rounded-xl p-5 hover:-translate-y-1 transition-all duration-200"
      role="region"
      aria-labelledby={`skill-cat-${group.category}`}
    >
      {/* Category header */}
      <div className="flex items-start gap-3 mb-4">
        <span className="text-lg leading-none mt-0.5" aria-hidden="true">
          {meta.icon}
        </span>
        <div>
          <h3
            id={`skill-cat-${group.category}`}
            className="text-sm font-semibold text-zinc-800 dark:text-zinc-200"
          >
            {group.category}
          </h3>
          {meta.description && (
            <p className="text-xs text-zinc-600 mt-0.5 leading-relaxed">
              {meta.description}
            </p>
          )}
        </div>
      </div>

      {/* Skill items as clean list — NOT a tag cloud */}
      <ul className="space-y-1.5" aria-label={`${group.category} skills`}>
        {group.items.map((item) => (
          <li key={item} className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-indigo-500/70 flex-shrink-0" />
            <span className="text-sm text-zinc-600 dark:text-zinc-400">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Skills section — maps the skills array from data.json
export default function Skills({ skills, ui }: { skills: SkillCategory[]; ui: any }) {
  return (
    <section
      id="skills"
      className="px-6 py-20 border-t border-zinc-200 dark:border-zinc-800/40"
      aria-labelledby="skills-heading"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="mb-12">
          <p className="text-xs text-indigo-400 font-semibold uppercase tracking-widest mb-3">
            {ui.label}
          </p>
          <h2
            id="skills-heading"
            className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight mb-3"
          >
            {ui.heading}
          </h2>
          <p className="text-zinc-500 text-sm max-w-lg">
            {ui.description}
          </p>
        </div>

        {/* Responsive grid of skill groups */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((group) => (
            <SkillGroup key={group.category} group={group} />
          ))}
        </div>
      </div>
    </section>
  );
}
