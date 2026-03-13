"use client";

import Link from "next/link";
import { CodeBracketIcon, DocumentTextIcon } from "@heroicons/react/24/outline";

const navigation = [
  {
    name: "HTTP Methods",
    href: "/",
    icon: CodeBracketIcon,
  },
  {
    name: "HTTP Status Codes",
    href: "/status-codes",
    icon: DocumentTextIcon,
  },
];

export default function Sidebar() {
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col bg-[#333333] border-r border-[#3C787E]">
      <div className="px-6 py-6">
        <h2 className="text-xl font-bold text-[#F4FAFF]">API Tester</h2>
      </div>

      <nav className="px-4 space-y-2">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-3 rounded-md p-2 text-gray-400 hover:bg-[#3C787E] hover:text-white transition-colors"
          >
            <item.icon className="h-6 w-6" />
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
