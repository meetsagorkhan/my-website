"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "@/config/content";

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      sectionRef.current.querySelector(".contact-form"),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Inline validation
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg("All fields are required.");
      setStatus("error");
      return;
    }
    if (!validateEmail(formData.email)) {
      setErrorMsg("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setErrorMsg(data.error || "Failed to send message. Try again.");
        setStatus("error");
      }
    } catch (err: any) {
      setErrorMsg("Network error. Please try again later.");
      setStatus("error");
    }
  };


  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-slate-900 transition-colors duration-300"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 text-center">
          Get In Touch
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 md:mb-16 text-base sm:text-lg">
          Have a question or opportunity? I&apos;d love to hear from you.
        </p>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Info */}
          <div className="space-y-8 order-2 md:order-1">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-6">
                Contact Information
              </h3>
              <div className="space-y-5">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-4 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group"
                >
                  <span className="text-2xl sm:text-3xl">✉️</span>
                  <span className="text-sm sm:text-base break-all">{siteConfig.email}</span>
                </a>
                <a
                  href={siteConfig.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group"
                >
                  <span className="text-2xl sm:text-3xl">💬</span>
                  <span className="text-sm sm:text-base">{siteConfig.phone}</span>
                </a>
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group"
                >
                  <span className="text-2xl sm:text-3xl">🔗</span>
                  <span className="text-sm sm:text-base">LinkedIn Profile</span>
                </a>
              </div>
            </div>

            <div>
              <a
                href="/cv.pdf"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-indigo-600 dark:bg-indigo-500 text-white rounded-lg font-semibold hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span>📄</span>
                Download CV
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="contact-form space-y-5 order-1 md:order-2">
            {errorMsg && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-2 text-sm">
                {errorMsg}
              </div>
            )}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-400 transition-colors"
                placeholder="Your name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-400 transition-colors"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-400 transition-colors resize-none"
                placeholder="Your message..."
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full px-6 py-3.5 bg-indigo-600 dark:bg-indigo-500 text-white rounded-lg font-semibold hover:bg-indigo-700 dark:hover:bg-indigo-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {status === "loading"
                ? "Sending..."
                : status === "success"
                  ? "✓ Message Sent!"
                  : status === "error"
                    ? "✗ Error. Try again."
                    : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
