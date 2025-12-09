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
          delay: index * 0.2,
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
      className="py-20 px-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-16 text-center">
          Experience
        </h2>

        <div className="space-y-8">
          {experienceContent.map((exp, idx) => (
            <div
              key={idx}
              className="experience-item p-6 bg-white dark:bg-gray-800 rounded-lg border-l-4 border-indigo-600 dark:border-indigo-400 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {exp.role}
                  </h3>
                  <p className="text-indigo-600 dark:text-indigo-400 font-semibold">
                    {exp.company}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {exp.location}
                  </p>
                </div>
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 whitespace-nowrap">
                  {exp.period}
                </p>
              </div>

              <ul className="space-y-3">
                {exp.achievements.map((achievement, achIdx) => (
                  <li
                    key={achIdx}
                    className="flex gap-3 text-gray-700 dark:text-gray-300"
                  >
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold mt-1">
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
                  className="inline-block mt-4 text-indigo-600 dark:text-indigo-400 hover:underline text-sm font-semibold"
                >
                  Visit Website →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
