"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  CodeBracketIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  {
    name: "Home",
    href: "/",
    icon: HomeIcon,
  },
  {
    name: "HTTP Methods",
    href: "/methods",
    icon: CodeBracketIcon,
  },
  {
    name: "HTTP Status Codes",
    href: "/status-codes",
    icon: DocumentTextIcon,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-[#333333] font-inter">
      {/* SIDEBAR */}
      <aside className="hidden lg:flex lg:w-72 lg:flex-col border-r border-[#3C787E] bg-[#333333]">
        <div className="flex h-16 items-center px-6">
          <h2 className="text-xl font-bold text-[#F4FAFF]">API Learning</h2>
        </div>

        <nav className="flex flex-1 flex-col px-4">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const active = pathname === item.href;

              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={classNames(
                      active
                        ? "bg-[#3C787E] text-white"
                        : "text-gray-400 hover:bg-[#3C787E] hover:text-white",
                      "flex items-center gap-x-3 rounded-md px-3 py-2 text-sm font-semibold transition-colors",
                    )}
                  >
                    <item.icon className="h-6 w-6 shrink-0" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="px-6 py-4 text-xs text-gray-500">
          © 2026 Joono Chakma. All rights reserved.
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex flex-1 flex-col">
        {/* Top Bar (mobile + title area) */}
        <header className="sticky top-0 z-40 border-b border-[#3C787E] bg-[#333333] px-6 py-4">
          <h1 className="text-lg font-semibold text-[#F4FAFF]">
            REST API Learning Dashboard
          </h1>
        </header>

        {/* Page Content */}
        <main className="flex-1 px-6 py-10">{children}</main>
      </div>
    </div>
  );
}
