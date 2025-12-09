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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <HeroBackground />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <p className="text-indigo-600 dark:text-indigo-400 text-lg font-semibold mb-4 animate-fade-in">
          {heroContent.intro}
        </p>

        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight animate-fade-in-delay-1">
          {heroContent.title}
        </h1>

        <div className="h-16 mb-8 flex items-center justify-center">
          <p className="text-2xl md:text-3xl font-semibold text-indigo-600 dark:text-indigo-400 min-h-16">
            {displayedStrength}
            <span className="animate-pulse">|</span>
          </p>
        </div>

        <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto animate-fade-in-delay-2">
          {heroContent.subtitle}
        </p>

        <div className="flex gap-4 justify-center flex-wrap animate-fade-in-delay-3">
          <a
            href="#experience"
            className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105"
          >
            View Resume
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400 rounded-lg font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-950 transition-all duration-300"
          >
            Contact Me
          </a>
          <a
            href="https://www.linkedin.com/in/meetmdsagorkhan/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            LinkedIn
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .animate-fade-in-delay-1 {
          animation: fadeIn 0.8s ease-out 0.2s forwards;
          opacity: 0;
        }

        .animate-fade-in-delay-2 {
          animation: fadeIn 0.8s ease-out 0.4s forwards;
          opacity: 0;
        }

        .animate-fade-in-delay-3 {
          animation: fadeIn 0.8s ease-out 0.6s forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
}
