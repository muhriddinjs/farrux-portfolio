import { GitBranch, ExternalLink } from "lucide-react";

interface Project {
  id: string;
  title: string;
  tags: string[];
  sar: {
    situation: string;
    action: string;
    result: string;
  };
  links: {
    github?: string;
    dashboard?: string | null;
  };
}

// Color accent per SAR step — distinct visual cues for each frame
const sarConfig = [
  {
    key: "situation" as const,
    label: "Situation",
    indicator: "bg-yellow-500",
    labelColor: "text-yellow-500",
  },
  {
    key: "action" as const,
    label: "Action",
    indicator: "bg-blue-500",
    labelColor: "text-blue-400",
  },
  {
    key: "result" as const,
    label: "Result",
    indicator: "bg-green-500",
    labelColor: "text-green-400",
  },
];

function ProjectCard({ project, ui }: { project: Project; ui: any }) {
  return (
    <article
      className="group relative glass-card rounded-xl p-6 transition-all duration-200"
      aria-labelledby={`project-title-${project.id}`}
    >
      {/* Subtle top accent line */}
      <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Project title */}
      <h3
        id={`project-title-${project.id}`}
        className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-3"
      >
        {project.title}
      </h3>

      {/* Technology tags */}
      <div className="flex flex-wrap gap-1.5 mb-5" aria-label="Technologies used">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 text-xs font-medium text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 rounded-md"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* SAR Framework — Situation, Action, Result */}
      <div
        className="space-y-3 mb-5"
        role="list"
        aria-label="SAR Framework breakdown"
      >
        {sarConfig.map(({ key, label, indicator, labelColor }) => (
          <div key={key} className="flex gap-3" role="listitem">
            {/* Color-coded left indicator bar */}
            <div className="flex flex-col items-center pt-1 flex-shrink-0">
              <div className={`w-1.5 h-1.5 rounded-full ${indicator} mt-0.5`} />
              <div className="w-px flex-1 bg-zinc-200 dark:bg-zinc-800/80 mt-1" />
            </div>
            {/* Label + content */}
            <div className="pb-1">
              <span
                className={`text-xs font-semibold uppercase tracking-wider ${labelColor} block mb-0.5`}
              >
                {ui[key]}
              </span>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {project.sar[key]}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Action buttons — conditionally render dashboard link */}
      <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-zinc-200 dark:border-zinc-800/60">
        {project.links.github && (
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            id={`project-github-${project.id}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 bg-zinc-100 dark:bg-zinc-800/60 hover:bg-zinc-200 dark:hover:bg-zinc-700/80 border border-zinc-200 dark:border-zinc-700/40 hover:border-zinc-300 dark:hover:border-zinc-600 rounded-md transition-all duration-150"
          >
            <GitBranch className="w-3.5 h-3.5" />
            {ui.viewCode}
          </a>
        )}
        {/* Only render dashboard button if link exists and is not null */}
        {project.links.dashboard && (
          <a
            href={project.links.dashboard}
            target="_blank"
            rel="noopener noreferrer"
            id={`project-dashboard-${project.id}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/15 border border-indigo-500/20 hover:border-indigo-500/40 rounded-md transition-all duration-150"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            {ui.viewDashboard}
          </a>
        )}
      </div>
    </article>
  );
}

// Projects section — maps the projects array from data.json
export default function Projects({ projects, ui }: { projects: Project[]; ui: any }) {
  return (
    <section
      id="projects"
      className="px-6 py-20"
      aria-labelledby="projects-heading"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="mb-12">
          <p className="text-xs text-indigo-400 font-semibold uppercase tracking-widest mb-3">
            {ui.label}
          </p>
          <h2
            id="projects-heading"
            className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight mb-3"
          >
            {ui.heading}
          </h2>
          <p className="text-zinc-500 text-sm max-w-lg">
            {ui.description}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 mb-8 p-3 glass-card rounded-lg w-fit">
          {sarConfig.map(({ indicator, key, labelColor }) => (
            <div key={key} className="flex items-center gap-1.5">
              <div className={`w-2 h-2 rounded-full ${indicator}`} />
              <span className={`text-xs font-medium ${labelColor}`}>{ui[key]}</span>
            </div>
          ))}
        </div>

        {/* Project cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} ui={ui} />
          ))}
        </div>
      </div>
    </section>
  );
}
