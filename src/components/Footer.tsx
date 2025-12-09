"use client";

import { siteConfig, educationContent, languagesContent } from "@/config/content";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 dark:bg-black text-gray-300 py-12 sm:py-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">SK</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              CX Team Lead & Automation Specialist
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-4 text-base sm:text-lg">Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="#about"
                  className="text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#skills"
                  className="text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  Skills
                </a>
              </li>
              <li>
                <a
                  href="#experience"
                  className="text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  Experience
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Education */}
          <div>
            <h4 className="font-bold text-white mb-4 text-base sm:text-lg">Education</h4>
            <ul className="space-y-3 text-sm">
              {educationContent.map((edu, idx) => (
                <li key={idx}>
                  <p className="font-semibold text-gray-300">{edu.degree}</p>
                  <p className="text-gray-500 text-xs mt-1">{edu.institution}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Languages */}
          <div>
            <h4 className="font-bold text-white mb-4 text-base sm:text-lg">Languages</h4>
            <ul className="space-y-2.5 text-sm">
              {languagesContent.map((lang, idx) => (
                <li key={idx}>
                  <p className="text-gray-300">
                    {lang.language}{" "}
                    <span className="text-gray-500">({lang.level})</span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-slate-800 pt-8 mb-8">
          <div className="flex gap-6 justify-center">
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-gray-400 hover:text-indigo-400 transition-colors text-2xl"
              title="Email"
              aria-label="Email"
            >
              ✉️
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-indigo-400 transition-colors text-2xl"
              title="LinkedIn"
              aria-label="LinkedIn"
            >
              🔗
            </a>
            <a
              href={siteConfig.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-indigo-400 transition-colors text-2xl"
              title="WhatsApp"
              aria-label="WhatsApp"
            >
              💬
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-500 border-t border-slate-800 pt-8">
          <p>
            &copy; {currentYear} MD Sagor Khan. All rights reserved. | Designed with care.
          </p>
        </div>
      </div>
    </footer>
  );
}
