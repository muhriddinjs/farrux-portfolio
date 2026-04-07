import { notFound } from "next/navigation";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Experience from "../components/Experience";
import Education from "../components/Education";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Footer from "../components/Footer";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  let data;
  try {
    data = (await import(`@/data/locales/${lang}.json`)).default;
  } catch (error) {
    notFound();
  }

  const { personalInfo, experience, education, skills, projects, ui } = data;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://farruxasrorqulov.com/#person",
        "name": "Farrux Asrorqulov",
        "alternateName": ["Farrukh Asrorqulov", "Фаррух Асроркулов"],
        "jobTitle": "Senior Data Analyst",
        "url": "https://farruxasrorqulov.com",
        "image": "https://farruxasrorqulov.com/farrux.jpg", 
        "sameAs": [
          personalInfo.links.linkedin,
          personalInfo.links.github,
          personalInfo.links.telegram,
          "https://farruxasrorqulov.com"
        ].filter(Boolean),
        "knowsAbout": ["Data Analysis", "Python", "SQL", "Machine Learning", "Tableau", "Power BI", "Data Visualization", "Data Science"]
      },
      {
        "@type": "WebSite",
        "@id": "https://farruxasrorqulov.com/#website",
        "url": "https://farruxasrorqulov.com",
        "name": "Farrux Asrorqulov | Senior Data Analyst Portfolio",
        "publisher": {
          "@id": "https://farruxasrorqulov.com/#person"
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar name={personalInfo.name} email={personalInfo.links.email} ui={ui.nav} />

      <main>
        <Hero
          name={personalInfo.name}
          headline={personalInfo.headline}
          bio={personalInfo.bio}
          photo={personalInfo.photo}
          links={personalInfo.links}
          ui={ui.hero}
        />

        <Experience experience={experience} ui={ui.experience} />
        <Education education={education} ui={ui.education} />
        <Projects projects={projects} ui={ui.projects} />
        <Skills skills={skills} ui={ui.skills} />
      </main>

      <Footer name={personalInfo.name} links={personalInfo.links} ui={ui.footer} />
    </>
  );
}
