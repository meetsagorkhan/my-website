"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experienceContent } from "@/config/content";

gsap.registerPlugin(ScrollTrigger);

export function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const items = sectionRef.current.querySelectorAll(".experience-item");

    items.forEach((item, index) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.15,
          ease: "power2.out",
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
      id="experience"
      ref={sectionRef}
      className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-slate-900 transition-colors duration-300"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-12 md:mb-16 text-center">
          Experience
        </h2>

        <div className="space-y-6 md:space-y-8">
          {experienceContent.map((exp, idx) => (
            <div
              key={idx}
              className="experience-item p-6 md:p-8 bg-white dark:bg-slate-800 rounded-lg border-l-4 border-indigo-600 dark:border-indigo-400 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {exp.role}
                  </h3>
                  <p className="text-indigo-600 dark:text-indigo-400 font-semibold text-base sm:text-lg mb-1">
                    {exp.company}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {exp.location}
                  </p>
                </div>
                <p className="text-sm sm:text-base font-semibold text-gray-600 dark:text-gray-400 whitespace-nowrap md:ml-4">
                  {exp.period}
                </p>
              </div>

              <ul className="space-y-3">
                {exp.achievements.map((achievement, achIdx) => (
                  <li
                    key={achIdx}
                    className="flex gap-3 text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed"
                  >
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold mt-1 flex-shrink-0">
                      •
                    </span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>

              {exp.website && (
                <a
                  href={exp.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-6 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:underline text-sm font-semibold transition-colors"
                >
                  Visit Website
                  <span>→</span>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
