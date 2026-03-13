"use client";

import { useState, useEffect } from "react";
import {
  CommandLineIcon,
  DocumentTextIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import api from "@/lib/api";

const httpMethods = [
  { name: "GET", icon: EyeIcon, url: "/get", description: "Retrieve data" },
  {
    name: "POST",
    icon: PlusIcon,
    url: "/post",
    description: "Create new data",
  },
  {
    name: "PUT",
    icon: PencilIcon,
    url: "/put",
    description: "Update existing data",
  },
  {
    name: "PATCH",
    icon: DocumentTextIcon,
    url: "/patch",
    description: "Partially update data",
  },
  {
    name: "DELETE",
    icon: TrashIcon,
    url: "/delete",
    description: "Remove data",
  },
  {
    name: "TRACE",
    icon: CommandLineIcon,
    url: "/trace",
    description: "Trace request path",
  },
];

export default function HTTPMethodsPage() {
  const [responses, setResponses] = useState<any>({});

  const testEndpoint = async (method: string, endpoint: string) => {
    setResponses((prev) => ({
      ...prev,
      [method]: { ...prev[method], loading: true, visible: true },
    }));

    try {
      const result = await api.request({
        method: method.toLowerCase(),
        url: endpoint,
      });

      setResponses((prev) => ({
        ...prev,
        [method]: {
          success: true,
          data: result.data,
          loading: false,
          visible: true,
        },
      }));
    } catch (error: any) {
      setResponses((prev) => ({
        ...prev,
        [method]: {
          success: false,
          data: error.response?.data || error.message,
          loading: false,
          visible: true,
        },
      }));
    }
  };

  useEffect(() => {
    const timers: any = {};

    Object.keys(responses).forEach((method) => {
      const response = responses[method];
      if (response && !response.loading && response.visible) {
        timers[method] = setTimeout(() => {
          setResponses((prev) => ({
            ...prev,
            [method]: { ...prev[method], visible: false },
          }));
        }, 10000);
      }
    });

    return () => Object.values(timers).forEach(clearTimeout);
  }, [responses]);

  return (
    <div className="bg-[#333333] min-h-screen font-inter">
      <main className="py-10">
        <div className="px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-[#F4FAFF] mb-4">
            HTTP Methods Testing Dashboard
          </h1>

          <p className="text-[#3C787E] text-lg mb-8">
            Click a method to test your API endpoint
          </p>

          <div className="space-y-4">
            {httpMethods.map((method) => {
              const response = responses[method.name];

              return (
                <div
                  key={method.name}
                  className="animate-fade border border-[#3C787E] rounded-lg overflow-hidden"
                >
                  <div className="px-6 py-4 bg-[#F4FAFF] flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <method.icon className="h-6 w-6 text-[#3C787E]" />
                      <div>
                        <h3 className="text-lg font-semibold">{method.name}</h3>
                        <p className="text-sm text-[#3C787E]">
                          {method.description}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => testEndpoint(method.name, method.url)}
                      className="bg-[#3C787E] text-white px-4 py-2 rounded-md"
                    >
                      Test
                    </button>
                  </div>

                  {response && !response.loading && (
                    <div className="animate-fade-down px-6 py-4 bg-[#F4FAFF] border-t border-[#3C787E]">
                      <pre className="text-sm whitespace-pre-wrap">
                        {JSON.stringify(response.data, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}