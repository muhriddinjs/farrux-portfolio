"use client";

import { usePathname, useRouter } from "next/navigation";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  // Extract current language from URL (e.g. /uz/something -> uz)
  const currentLang = pathname.split("/")[1] || "en";

  const switchLanguage = (lang: string) => {
    // Replace the first path segment with the new language
    const segments = pathname.split("/");
    segments[1] = lang;
    router.push(segments.join("/"));
  };

  return (
    <div className="flex items-center gap-2 text-xs font-medium bg-zinc-100 dark:bg-zinc-800/50 p-1 rounded-full border border-zinc-200 dark:border-zinc-700/50">
      {["en", "uz", "ru"].map((lang) => (
        <button
          key={lang}
          onClick={() => switchLanguage(lang)}
          className={`uppercase px-2 py-1 rounded-full transition-all ${
            currentLang === lang
              ? "bg-white dark:bg-zinc-700 text-indigo-600 dark:text-indigo-400 shadow-sm"
              : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
          aria-label={`Switch to ${lang.toUpperCase()}`}
        >
          {lang}
        </button>
      ))}
    </div>
  );
}
