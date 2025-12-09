"use client";

import { useEffect, useState } from "react";
import { heroContent } from "@/config/content";
import { HeroBackground } from "./HeroBackground";

export function Hero() {
  const [displayedStrength, setDisplayedStrength] = useState("");
  const [strengthIndex, setStrengthIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const strength = heroContent.strengths[strengthIndex];
    if (charIndex < strength.length) {
      const timer = setTimeout(() => {
        setDisplayedStrength((prev) => prev + strength[charIndex]);
        setCharIndex(charIndex + 1);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setStrengthIndex((prev) => (prev + 1) % heroContent.strengths.length);
        setCharIndex(0);
        setDisplayedStrength("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [charIndex, strengthIndex]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-12">
      <HeroBackground />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-indigo-600 dark:text-indigo-400 text-base sm:text-lg font-medium mb-6 animate-fade-in opacity-0">
          {heroContent.intro}
        </p>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-8 leading-tight animate-fade-in opacity-0" style={{ animationDelay: "0.2s" }}>
          {heroContent.title}
        </h1>

        <div className="h-20 sm:h-24 mb-10 flex items-center justify-center">
          <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-indigo-600 dark:text-indigo-400 min-h-[3rem]">
            {displayedStrength}
            <span className="animate-pulse ml-1">|</span>
          </p>
        </div>

        <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in opacity-0" style={{ animationDelay: "0.4s" }}>
          {heroContent.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in opacity-0" style={{ animationDelay: "0.6s" }}>
          <a
            href="#experience"
            className="w-full sm:w-auto px-8 py-3.5 bg-indigo-600 dark:bg-indigo-500 text-white rounded-lg font-semibold hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            View Resume
          </a>
          <a
            href="#contact"
            className="w-full sm:w-auto px-8 py-3.5 border-2 border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400 rounded-lg font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-all duration-300"
          >
            Contact Me
          </a>
          <a
            href="https://www.linkedin.com/in/meetmdsagorkhan/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 dark:bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
