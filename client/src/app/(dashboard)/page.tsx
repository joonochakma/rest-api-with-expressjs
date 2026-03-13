"use client";

import Link from "next/link";
import {
  CodeBracketIcon,
  DocumentTextIcon,
  ServerIcon,
} from "@heroicons/react/24/outline";

const sections = [
  {
    title: "HTTP Methods",
    description:
      "Learn how GET, POST, PUT, PATCH, and DELETE requests work and test real API endpoints.",
    href: "/methods",
    icon: CodeBracketIcon,
  },
  {
    title: "HTTP Status Codes",
    description:
      "Understand how servers communicate results using status codes like 200, 404, and 500.",
    href: "/status-codes",
    icon: DocumentTextIcon,
  },
];

export default function DashboardHome() {
  return (
    <div className="bg-[#333333] min-h-screen font-inter">
      <main className="py-12">
        <div className="mx-auto max-w-6xl px-6">
          {/* Hero Section */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <ServerIcon className="h-10 w-10 text-[#3C787E]" />
              <h1 className="animate-fade text-4xl font-bold text-[#F4FAFF]">
                Learn REST APIs
              </h1>
            </div>

            <p className="text-lg text-gray-300 max-w-3xl">
              This platform helps you understand how APIs work through
              interactive examples. Explore HTTP methods, learn status codes,
              and test real API requests in a hands-on environment.
            </p>
          </div>

          {/* Learning Cards */}
          <div className="animate-fade-down grid gap-6 md:grid-cols-2">
            {sections.map((section) => (
              <Link
                key={section.title}
                href={section.href}
                className="group rounded-xl border border-[#3C787E] bg-[#2b2b2b] p-6 hover:bg-[#3C787E]/20 transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <section.icon className="h-8 w-8 text-[#3C787E] group-hover:text-white transition-colors" />
                  <h2 className="text-xl font-semibold text-[#F4FAFF]">
                    {section.title}
                  </h2>
                </div>

                <p className="text-gray-400 group-hover:text-gray-200 transition-colors">
                  {section.description}
                </p>

                <div className="mt-6 text-sm font-semibold text-[#3C787E] group-hover:text-white">
                  Start Learning →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
