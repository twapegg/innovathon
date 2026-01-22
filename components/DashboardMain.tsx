"use client";

import React, { useState } from "react";
import { ParentDashboard } from "./ParentDashboard";
import { CounselorDashboard } from "./CounselorDashboard";
import { ProfessionalDashboard } from "./ProfessionalDashboard";
import { COLORS } from "./SharedComponents";
import { UserRole } from "@/lib/types";

export const DashboardMain: React.FC = () => {
  const [activeRole, setActiveRole] = useState<UserRole>("parent");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const roles: {
    id: UserRole;
    name: string;
    icon: string;
    description: string;
  }[] = [
    {
      id: "parent",
      name: "Parent / Caregiver",
      icon: "👨‍👧",
      description: "Child wellbeing & support",
    },
    {
      id: "counselor",
      name: "Guidance Counselor",
      icon: "👨‍🏫",
      description: "Student oversight & support",
    },
    {
      id: "professional",
      name: "Mental Health Professional",
      icon: "👨‍⚕️",
      description: "Case management & tracking",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50/80">
      {/* Sidebar */}
      <aside
        className={`
        fixed md:relative z-40 h-full w-64 shadow-xl
        transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        bg-white border-r border-gray-100/50
        `}
      >
        <div className="p-8 border-b border-gray-100/50">
          {/* Logo/Title */}

          <h2 className="text-blue-600 text-2xl font-black tracking-tight">
            NUDGE
          </h2>
          <p className="text-gray-500 text-xs font-semibold mt-2 leading-relaxed">
            Youth Well-Being Support System
          </p>
        </div>

        {/* Role Switcher */}
        <nav className="mt-6 px-4 space-y-3">
          <p className="text-gray-500 text-xs font-bold uppercase tracking-wider px-2 mb-4">
            Your Role
          </p>
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => {
                setActiveRole(role.id);
                setSidebarOpen(false);
              }}
              className={`
                w-full text-left px-4 py-4 rounded-2xl transition-all duration-300 group
                ${
                  activeRole === role.id
                    ? "bg-blue-100/40 border border-blue-200/50"
                    : "hover:bg-gray-100/50 border border-transparent"
                }
              `}
            >
              <span className="text-2xl block mb-2">{role.icon}</span>
              <span className="block font-semibold text-gray-800 text-sm">
                {role.name}
              </span>
              <span className="text-xs text-gray-500 mt-1 block">
                {role.description}
              </span>
            </button>
          ))}
        </nav>

        {/* Bottom Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white to-transparent border-t border-gray-100/50 text-gray-600 text-xs">
          <p className="font-semibold mb-2 text-blue-600">
            💙 Early support matters
          </p>
          <p className="leading-relaxed text-gray-600">
            Helping families respond to non-crisis signs of mental health
            strain.
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Mobile Header */}
        <div className="md:hidden sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100/50 shadow-sm">
          <div className="flex items-center justify-between p-4">
            <h1 className="font-black text-blue-600">💙 NUDGE</h1>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-2xl"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Role-based Dashboard Content */}
        {activeRole === "parent" && <ParentDashboard />}
        {activeRole === "counselor" && <CounselorDashboard />}
        {activeRole === "professional" && <ProfessionalDashboard />}
      </main>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};
