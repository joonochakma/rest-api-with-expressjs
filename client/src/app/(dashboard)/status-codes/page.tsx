"use client";

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";

import {
  Bars3Icon,
  DocumentTextIcon,
  XMarkIcon,
  CheckIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  ArrowPathIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

type StatusCode = {
  code: number;
  name: string;
  description: string;
};

type StatusCategory = {
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  codes: StatusCode[];
};

const statusCodeCategories: StatusCategory[] = [
  {
    category: "1xx - Informational",
    icon: InformationCircleIcon,
    color: "bg-blue-100 text-blue-800 border-blue-200",
    codes: [
      {
        code: 100,
        name: "Continue",
        description: "Request received, continue.",
      },
      {
        code: 101,
        name: "Switching Protocols",
        description: "Server switching protocol.",
      },
      {
        code: 102,
        name: "Processing",
        description: "Server is processing request.",
      },
    ],
  },
  {
    category: "2xx - Success",
    icon: CheckIcon,
    color: "bg-green-100 text-green-800 border-green-200",
    codes: [
      { code: 200, name: "OK", description: "Request succeeded." },
      {
        code: 201,
        name: "Created",
        description: "Resource successfully created.",
      },
      {
        code: 202,
        name: "Accepted",
        description: "Request accepted for processing.",
      },
      {
        code: 204,
        name: "No Content",
        description: "Request succeeded but no response body.",
      },
    ],
  },
  {
    category: "3xx - Redirection",
    icon: ArrowPathIcon,
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    codes: [
      {
        code: 301,
        name: "Moved Permanently",
        description: "Resource moved permanently.",
      },
      { code: 302, name: "Found", description: "Temporary redirect." },
      {
        code: 304,
        name: "Not Modified",
        description: "Resource not modified.",
      },
    ],
  },
  {
    category: "4xx - Client Error",
    icon: ExclamationTriangleIcon,
    color: "bg-orange-100 text-orange-800 border-orange-200",
    codes: [
      {
        code: 400,
        name: "Bad Request",
        description: "Invalid request syntax.",
      },
      {
        code: 401,
        name: "Unauthorized",
        description: "Authentication required.",
      },
      { code: 403, name: "Forbidden", description: "Server refuses request." },
      { code: 404, name: "Not Found", description: "Resource not found." },
      {
        code: 405,
        name: "Method Not Allowed",
        description: "HTTP method not supported.",
      },
    ],
  },
  {
    category: "5xx - Server Error",
    icon: XCircleIcon,
    color: "bg-red-100 text-red-800 border-red-200",
    codes: [
      {
        code: 500,
        name: "Internal Server Error",
        description: "Unexpected server error.",
      },
      {
        code: 501,
        name: "Not Implemented",
        description: "Server does not support functionality.",
      },
      {
        code: 502,
        name: "Bad Gateway",
        description: "Invalid response from upstream server.",
      },
      {
        code: 503,
        name: "Service Unavailable",
        description: "Server temporarily unavailable.",
      },
    ],
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function HTTPStatusCodesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="bg-[#333333] min-h-screen font-inter text-[#F4FAFF]">
      {/* Mobile Top Bar */}
      <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-[#333333] px-4 py-4 border-b border-[#3C787E] lg:hidden">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="-m-2.5 p-2.5 text-gray-400 hover:text-[#F4FAFF]"
        >
          <Bars3Icon className="size-6" />
        </button>
        <div className="flex-1 text-sm font-semibold">HTTP Status Codes</div>
      </div>

      <main className="py-10">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">
              HTTP Status Codes Reference
            </h1>
            <p className="text-[#3C787E] text-lg">
              Reference guide for common HTTP response codes.
            </p>
          </div>

          <div className="space-y-8">
            {statusCodeCategories.map((category) => (
              <div key={category.category}>
                <div className="flex items-center gap-3 mb-4">
                  <category.icon className="h-6 w-6 text-[#3C787E]" />
                  <h2 className="text-2xl font-bold">{category.category}</h2>
                </div>

                <div className="grid gap-4">
                  {category.codes.map((statusCode) => (
                    <div
                      key={statusCode.code}
                      className="bg-[#F4FAFF] rounded-lg p-6 border border-[#3C787E] text-[#020202]"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-bold ${category.color}`}
                        >
                          {statusCode.code}
                        </span>

                        <h3 className="text-xl font-semibold">
                          {statusCode.name}
                        </h3>
                      </div>

                      <p className="mt-3 leading-relaxed">
                        {statusCode.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
