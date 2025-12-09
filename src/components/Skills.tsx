"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skillsContent } from "@/config/content";

gsap.registerPlugin(ScrollTrigger);

export function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const skillBars = sectionRef.current.querySelectorAll(".skill-bar");

    skillBars.forEach((bar, index) => {
      gsap.fromTo(
        bar,
        { width: "0%", opacity: 0 },
        {
          width: "100%",
          opacity: 1,
          duration: 0.8,
          delay: index * 0.1,
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
          Skills & Expertise
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {skillsContent.categories.map((category, idx) => (
            <div key={idx} className="space-y-6">
              <h3 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
                <span className="w-1 h-8 bg-indigo-600 dark:bg-indigo-400 rounded"></span>
                {category.name}
              </h3>

              <div className="space-y-4">
                {category.skills.map((skill, skillIdx) => (
                  <div key={skillIdx} className="space-y-2">
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      {skill}
                    </p>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="skill-bar h-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"
                        style={{
                          width: "0%",
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
