'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, TransitionChild } from '@headlessui/react';
import {
  Bars3Icon,
  CodeBracketIcon,
  CommandLineIcon,
  DocumentTextIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';
import api from '@/lib/api';

const httpMethods = [
  { name: 'GET', href: '#', icon: EyeIcon, current: false, url: '/get', description: 'Retrieve data' },
  { name: 'POST', href: '#', icon: PlusIcon, current: false, url: '/post', description: 'Create new data' },
  { name: 'PUT', href: '#', icon: PencilIcon, current: false, url: '/put', description: 'Update existing data' },
  { name: 'PATCH', href: '#', icon: DocumentTextIcon, current: false, url: '/patch', description: 'Partially update data' },
  { name: 'DELETE', href: '#', icon: TrashIcon, current: false, url: '/delete', description: 'Remove data' },
  { name: 'TRACE', href: '#', icon: CommandLineIcon, current: false, url: '/trace', description: 'Trace request path' },
];

const navigation = [
  { name: 'HTTP Methods', href: '#', icon: CodeBracketIcon, current: true },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function HTTPMethodsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [responses, setResponses] = useState<{[key: string]: {success: boolean, data: any, loading: boolean, visible: boolean}}>({});

  const testEndpoint = async (method: string, endpoint: string) => {
    // Set loading state
    setResponses(prev => ({
      ...prev,
      [method]: { ...prev[method], loading: true, visible: true }
    }));
    
    try {
      const result = await api.request({
        method: method.toLowerCase(),
        url: endpoint,
      });
      setResponses(prev => ({
        ...prev,
        [method]: { success: true, data: result.data, loading: false, visible: true }
      }));
    } catch (error: any) {
      setResponses(prev => ({
        ...prev,
        [method]: { 
          success: false, 
          data: error.response?.data || error.message, 
          loading: false,
          visible: true
        }
      }));
    }
  };

  // Auto-hide responses after 10 seconds
  useEffect(() => {
    const timers: {[key: string]: NodeJS.Timeout} = {};
    
    Object.keys(responses).forEach(method => {
      const response = responses[method];
      if (response && !response.loading && response.visible) {
        timers[method] = setTimeout(() => {
          setResponses(prev => ({
            ...prev,
            [method]: { ...prev[method], visible: false }
          }));
        }, 10000); // Hide after 10 seconds
      }
    });

    return () => {
      Object.values(timers).forEach(timer => clearTimeout(timer));
    };
  }, [responses]);

  return (
    <div className="bg-[#333333] min-h-screen font-inter">
      <Dialog
        open={sidebarOpen}
        onClose={setSidebarOpen}
        className="relative z-50 lg:hidden"
      >
        <DialogBackdrop
          transition
          className="animate-fade-down fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-closed:opacity-0"
        />

        <div className="fixed inset-0 flex">
          <DialogPanel
            transition
            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 animate-fade-down data-closed:-translate-x-full"
          >
            <TransitionChild>
              <div className="absolute top-0 left-full flex w-16 justify-center pt-5 duration-300 ease-in-out data-closed:opacity-0">
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="-m-2.5 p-2.5"
                >
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon aria-hidden="true" className="size-6 text-white" />
                </button>
              </div>
            </TransitionChild>

            <div className="relative flex grow flex-col gap-y-5 overflow-y-auto bg-[#333333] px-6 pb-2 ring-1 ring-white/10">
              <div className="relative flex h-16 shrink-0 items-center">
                <h2 className="text-xl font-bold text-[#F4FAFF]">API Tester</h2>
              </div>
              <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" className="-mx-2 space-y-1">
                      {navigation.map((item) => (
                        <li key={item.name}>
                          <a
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-[#3C787E] text-[#F4FAFF]"
                                : "text-gray-400 hover:bg-[#3C787E] hover:text-[#F4FAFF]",
                              "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold",
                            )}
                          >
                            <item.icon
                              aria-hidden="true"
                              className="size-6 shrink-0"
                            />
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li>
                    <div className="text-xs/6 font-semibold text-gray-400">
                      HTTP Methods
                    </div>
                    <ul role="list" className="-mx-2 mt-2 space-y-1">
                      {httpMethods.map((method) => (
                        <li key={method.name}>
                          <button
                            onClick={() =>
                              testEndpoint(method.name, method.url)
                            }
                            className="w-full text-left group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-400 hover:bg-[#3C787E] hover:text-[#F4FAFF] transition-colors"
                          >
                            <method.icon
                              aria-hidden="true"
                              className="size-6 shrink-0"
                            />
                            <span className="truncate">{method.name}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Static sidebar for desktop */}
      <div className="hidden bg-[#333333] lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-[#3C787E] px-6">
          <div className="flex h-16 shrink-0 items-center">
            <h2 className="text-xl font-bold text-[#F4FAFF]">API Tester</h2>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-[#3C787E] text-[#F4FAFF]"
                            : "text-gray-400 hover:bg-[#3C787E] hover:text-[#F4FAFF]",
                          "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold transition-colors",
                        )}
                      >
                        <item.icon
                          aria-hidden="true"
                          className="size-6 shrink-0"
                        />
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <div className="text-xs/6 font-semibold text-gray-400">
                  HTTP Methods
                </div>
                <ul role="list" className="-mx-2 mt-2 space-y-1">
                  {httpMethods.map((method) => (
                    <li key={method.name}>
                      <button
                        onClick={() => testEndpoint(method.name, method.url)}
                        disabled={responses[method.name]?.loading}
                        className={classNames(
                          responses[method.name]?.loading
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-[#3C787E] hover:text-[#F4FAFF]",
                          "w-full text-left group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-400 transition-colors",
                        )}
                      >
                        <method.icon
                          aria-hidden="true"
                          className="size-6 shrink-0"
                        />
                        <span className="truncate">{method.name}</span>
                        {responses[method.name]?.loading && (
                          <div className="ml-auto animate-spin rounded-full h-4 w-4 border-2 border-[#F4FAFF] border-t-transparent"></div>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-[#333333] px-4 py-4 shadow-sm sm:px-6 lg:hidden border-b border-[#3C787E]">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="-m-2.5 p-2.5 text-gray-400 hover:text-[#F4FAFF] lg:hidden"
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon aria-hidden="true" className="size-6" />
        </button>
        <div className="flex-1 text-sm/6 font-semibold text-[#F4FAFF]">
          HTTP Methods Testing
        </div>
      </div>

      <main className="py-10 lg:pl-72">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#F4FAFF] mb-4">
              HTTP Methods Testing Dashboard
            </h1>
            <p className="text-[#3C787E] text-lg">
              Click on any HTTP method in the sidebar to test your API endpoints
            </p>
          </div>

          <div className="space-y-4">
            {httpMethods.map((method) => {
              const response = responses[method.name];

              return (
                <div
                  key={method.name}
                  className={`border border-[#3C787E] rounded-lg overflow-hidden transition-all duration-500 ease-in-out ${
                    response?.visible
                      ? "opacity-100 animate-fade-down"
                      : "opacity-0 translate-y-4 scale-95 pointer-events-none"
                  }`}
                  style={{
                    maxHeight: response?.visible ? "1000px" : "0px",
                    marginBottom: response?.visible ? "16px" : "0px",
                  }}
                >
                  <div className="animate-fade-down px-6 py-4 bg-[#F4FAFF] flex items-center justify-between">
                    <div className="animate-fade-down flex items-center space-x-4">
                      <method.icon className="h-6 w-6 text-[#3C787E]" />
                      <div>
                        <h3 className="text-lg font-semibold text-[#020202]">
                          {method.name}
                        </h3>
                        <p className="text-sm text-[#3C787E]">
                          {method.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {response?.loading && (
                        <div className="animate-fade-down rounded-full h-5 w-5 border-2 border-[#3C787E] border-t-transparent"></div>
                      )}
                      {response && !response.loading && (
                        <div
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            response.success
                              ? "bg-green-100 text-green-800 border border-green-200"
                              : "bg-red-100 text-red-800 border border-red-200"
                          }`}
                        >
                          {response.success ? "Success" : "Error"}
                        </div>
                      )}
                    </div>
                  </div>

                  {response && !response.loading && (
                    <div className="px-6 py-4 bg-[#F4FAFF] border-t border-[#3C787E]">
                      <h4 className="text-lg font-semibold text-[#020202] mb-3">
                        Response Data
                      </h4>
                      <div className="bg-white rounded-lg p-4 border border-[#3C787E]">
                        <pre className="text-sm overflow-auto font-mono text-[#020202] whitespace-pre-wrap">
                          {JSON.stringify(response.data, null, 2)}
                        </pre>
                      </div>
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
