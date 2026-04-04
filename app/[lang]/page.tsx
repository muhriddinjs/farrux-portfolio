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

  return (
    <>
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
