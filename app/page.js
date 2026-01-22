"use client";

import Link from "next/link";

export default function Page() {
  const roles = [
    {
      id: "parent",
      name: "Parent / Caregiver",
      icon: "👨‍👧",
      description: "Child wellbeing & support",
      href: "/parent",
      color: "blue",
    },
    {
      id: "counselor",
      name: "Guidance Counselor",
      icon: "👨‍🏫",
      description: "Student oversight & support",
      href: "/counselor",
      color: "indigo",
    },
    {
      id: "professional",
      name: "Mental Health Professional",
      icon: "👨‍⚕️",
      description: "Case management & tracking",
      href: "/professional",
      color: "violet",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="border-b border-gray-100/50 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-5xl font-black text-blue-600 mb-3 tracking-tight">
              💙 NUDGE
            </h1>
            <p className="text-xl text-gray-700 font-semibold mb-2">
              Youth Well-being Support System
            </p>
            <p className="text-gray-500 max-w-2xl mx-auto">
              A parent-focused system designed to help families respond
              appropriately to early, non-crisis signs of mental health strain
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            Select Your Role
          </h2>
          <p className="text-gray-600">
            Choose your role to access the appropriate dashboard
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {roles.map((role) => (
            <Link
              key={role.id}
              href={role.href}
              className="group relative bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-100 hover:border-blue-300 transition-all duration-300 hover:shadow-2xl hover:scale-105"
            >
              {/* Icon */}
              <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform">
                {role.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {role.name}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-6">{role.description}</p>

              {/* Button */}
              <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
                <span>Access Dashboard</span>
                <span className="text-xl">→</span>
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </Link>
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-blue-50/50 border border-blue-100 rounded-2xl px-8 py-6 max-w-2xl">
            <p className="text-blue-600 font-semibold mb-2">
              💙 Early Support Matters
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              NUDGE helps families, educators, and professionals work together
              to support youth mental health through early intervention and
              compassionate guidance.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
