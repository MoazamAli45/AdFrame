"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  UserRoundPen,
  LayoutDashboard,
  FilePlus,
  Settings,
  CirclePlus,
} from "lucide-react";

const sidebarItems = [
  {
    title: "New Poster",
    path: "/advertisement/generate",
    icon: CirclePlus,
  },
  {
    title: "Overview",
    path: "/advertisement",
    icon: LayoutDashboard,
  },
  {
    title: "Profile",
    path: "/advertisement/profile",
    icon: UserRoundPen,
  },
  {
    title: "Your Posters",
    path: "/advertisement/your-posters",
    icon: FilePlus,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside
      className={`${
        isOpen ? "w-64" : "w-20"
      } bg-white border-r border-gray-200 transition-all duration-300`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg  ml-auto"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? "M15 19l-7-7 7-7" : "M9 19l7-7-7-7"}
              />
            </svg>
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isNewPoster = item.title === "New Poster";
            const isActive = pathname === item.path;

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  isNewPoster
                    ? isOpen
                      ? "bg-[#16A34A] text-white justify-center text-center"
                      : isActive
                      ? "bg-blue-50 text-[#16A34A]"
                      : "hover:bg-gray-100"
                    : isActive
                    ? "bg-blue-50 text-[#16A34A]"
                    : "hover:bg-gray-100"
                }`}
              >
                {/* Render icon conditionally for "New Poster" */}
                {!isNewPoster || !isOpen ? <Icon className="w-5 h-5" /> : null}
                {isOpen && <span className="flex-1">{item.title}</span>}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
