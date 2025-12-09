import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <section id="about">
        <About />
      </section>
      <section id="skills">
        <Skills />
      </section>
      <Experience />
      <section id="projects">
        <Projects />
      </section>
      <Contact />
    </>
  );
}
