import { GitBranch, Link2, Mail, BarChart3 } from "lucide-react";

interface FooterProps {
  name: string;
  links: {
    github: string;
    linkedin: string;
    email: string;
  };
}

// Footer component — minimal, clean, with social links
export default function Footer({ name, links, ui }: FooterProps & { ui: any }) {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="border-t border-zinc-200 dark:border-zinc-800/60 mt-24"
      aria-label="Site footer"
    >
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Branding */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-indigo-500 flex items-center justify-center flex-shrink-0">
              <BarChart3 className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-semibold text-zinc-800 dark:text-zinc-300 text-sm">{name}</span>
          </div>

          {/* Social / contact links */}
          <div className="flex items-center gap-2" role="list" aria-label="Social links">
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              id="footer-github"
              className="p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-all"
              aria-label="GitHub profile"
            >
              <GitBranch className="w-4 h-4" />
            </a>
            <a
              href={links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              id="footer-linkedin"
              className="p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-all"
              aria-label="LinkedIn profile"
            >
              <Link2 className="w-4 h-4" />
            </a>
            <a
              href={links.email}
              id="footer-email"
              className="p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-all"
              aria-label="Send email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs text-zinc-400 dark:text-zinc-600">
            © {year} {name}. {ui.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
