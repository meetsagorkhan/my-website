"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projectsContent } from "@/config/content";

gsap.registerPlugin(ScrollTrigger);

export function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll(".project-card");

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: index * 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 px-6 bg-white dark:bg-gray-800 transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-16 text-center">
          Featured Achievements & Projects
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projectsContent.map((project, idx) => (
            <div
              key={idx}
              className="project-card p-6 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-indigo-600 dark:hover:border-indigo-400 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                  {project.company}
                </p>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {project.description}
              </p>

              <div className="bg-white dark:bg-gray-800 p-4 rounded border-l-4 border-indigo-600 dark:border-indigo-400 mb-4">
                <p className="text-sm text-gray-700 dark:text-gray-300 font-semibold">
                  Impact: {project.impact}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, tagIdx) => (
                  <span
                    key={tagIdx}
                    className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-semibold"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {project.website && (
                <a
                  href={project.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-indigo-600 dark:text-indigo-400 hover:underline text-sm font-semibold"
                >
                  Learn More →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
