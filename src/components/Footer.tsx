"use client";

import { siteConfig, educationContent, languagesContent } from "@/config/content";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-300 py-16 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">SK</h3>
            <p className="text-sm text-gray-400">
              CX Team Lead & Automation Specialist
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#about"
                  className="hover:text-indigo-400 transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#skills"
                  className="hover:text-indigo-400 transition-colors"
                >
                  Skills
                </a>
              </li>
              <li>
                <a
                  href="#experience"
                  className="hover:text-indigo-400 transition-colors"
                >
                  Experience
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-indigo-400 transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Education */}
          <div>
            <h4 className="font-bold text-white mb-4">Education</h4>
            <ul className="space-y-2 text-sm">
              {educationContent.map((edu, idx) => (
                <li key={idx}>
                  <p className="font-semibold text-gray-300">{edu.degree}</p>
                  <p className="text-gray-500 text-xs">{edu.institution}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Languages */}
          <div>
            <h4 className="font-bold text-white mb-4">Languages</h4>
            <ul className="space-y-2 text-sm">
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
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="flex gap-6 justify-center mb-8">
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-gray-400 hover:text-indigo-400 transition-colors"
              title="Email"
            >
              <span className="text-2xl">✉️</span>
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-indigo-400 transition-colors"
              title="LinkedIn"
            >
              <span className="text-2xl">🔗</span>
            </a>
            <a
              href={siteConfig.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-indigo-400 transition-colors"
              title="WhatsApp"
            >
              <span className="text-2xl">💬</span>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-500 border-t border-gray-800 pt-8">
          <p>
            &copy; {currentYear} MD Sagor Khan. All rights reserved. | Designed
            with care.
          </p>
        </div>
      </div>
    </footer>
  );
}
