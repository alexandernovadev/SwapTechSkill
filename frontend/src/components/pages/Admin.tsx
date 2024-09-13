import React, { useState } from "react";
import { LanguagesTable } from "../organisms/LanguagesTable";

// Componente Admin que maneja las Tabs
export const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"languages" | "skills" | "users">(
    "languages"
  ); // Tab activo

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Page</h1>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded-lg ${
            activeTab === "languages" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("languages")}
        >
          Languages
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            activeTab === "skills" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("skills")}
        >
          Skills
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            activeTab === "users" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("users")}
        >
          Users
        </button>
      </div>

      {/* Content */}
      <div>
        {activeTab === "languages" && <LanguagesTable />}
        {activeTab === "skills" && <div>Skills content</div>}
        {activeTab === "users" && <div>Users content</div>}
      </div>
    </div>
  );
};
