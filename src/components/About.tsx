"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { aboutContent } from "@/config/content";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Photo animation
    gsap.fromTo(
      photoRef.current,
      { opacity: 0, scale: 0.8, y: 50 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: 1,
        },
      }
    );

    // Text animation
    gsap.fromTo(
      textRef.current,
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: 1,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 px-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-16 text-center">
          About Me
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Photo */}
          <div ref={photoRef} className="flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full opacity-20 blur-2xl"></div>
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-indigo-600 dark:border-indigo-400 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <div className="text-6xl">👤</div>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div ref={textRef}>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              {aboutContent.bio}
            </p>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                  5+
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Years in CX
                </p>
              </div>
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                  50K+
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Users Managed
                </p>
              </div>
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                  10+
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Team Members Led
                </p>
              </div>
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                  100+
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Sellers Onboarded
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
