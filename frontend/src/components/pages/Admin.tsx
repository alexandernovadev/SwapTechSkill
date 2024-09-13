import React, { useState } from "react";
import { LanguagesTable } from "../organisms/LanguagesTable";
import { SkillCategoriesTable } from "../organisms/SkillCategoryTable";
import { SkillTable } from "../organisms/SkillTable";

// Componente Admin que maneja las Tabs
export const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "languages" | "skills" | "users" | "skillcategory"
  >("languages"); // Tab activo

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Page</h1>

      {/* Tabs */}
      <div className="flex border-b-2 border-b-blue-500 mb-6">
        <button
          className={`px-4 py-2 rounded-sm ${
            activeTab === "languages" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("languages")}
        >
          Languages
        </button>
        <button
          className={`px-4 py-2 rounded-sm ${
            activeTab === "skills" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("skills")}
        >
          Skills
        </button>

        <button
          className={`px-4 py-2 rounded-sm ${
            activeTab === "skillcategory"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("skillcategory")}
        >
          Skill Categories
        </button>
        <button
          className={`px-4 py-2 rounded-sm ${
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
        {activeTab === "skillcategory" && <SkillCategoriesTable />}
        {activeTab === "skills" && <SkillTable/>}
        {activeTab === "users" && <div>Users content</div>}
      </div>
    </div>
  );
};
