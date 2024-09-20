import React, { useEffect, useState } from "react";
import { LanguagesTable } from "../organisms/LanguagesTable";
import { SkillCategoriesTable } from "../organisms/SkillCategoryTable";
import { SkillTable } from "../organisms/SkillTable";
import { useUIConfigStore } from "../../state/uiConfig";
import { useNavigate, useLocation } from "react-router-dom";

// Componente Admin que maneja las Tabs
export const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "languages" | "skills" | "uiconfig" | "skillcategory"
  >("uiconfig"); // Tab activo por defecto es "uiconfig"

  const { isDisabledFooter, toggleDisabledFooter } = useUIConfigStore();
  const navigate = useNavigate();
  const location = useLocation();

  // Función para obtener el query param 'tab' de la URL
  const getTabFromQuery = () => {
    const searchParams = new URLSearchParams(location.search);
    // Si no existe el query param 'tab', retorna 'uiconfig' por defecto
    if (!searchParams.has("tab")) navigate(`?tab=uiconfig`, { replace: true });
    return (
      (searchParams.get("tab") as
        | "languages"
        | "skills"
        | "uiconfig"
        | "skillcategory") || "uiconfig"
    );
  };

  // Actualiza el tab activo basado en el query param
  useEffect(() => {
    const tabFromQuery = getTabFromQuery();
    setActiveTab(tabFromQuery);
  }, [location.search]);

  // Función para cambiar el tab y actualizar el query param
  const changeTab = (
    tab: "languages" | "skills" | "uiconfig" | "skillcategory"
  ) => {
    setActiveTab(tab);
    navigate(`?tab=${tab}`, { replace: true }); // Actualiza la URL con el nuevo query param
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Page</h1>

      {/* Tabs */}
      <div className="flex border-b-2 border-b-blue-500 mb-6">
        <button
          className={`px-4 py-2 rounded-sm ${
            activeTab === "languages" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => changeTab("languages")}
        >
          Languages
        </button>
        <button
          className={`px-4 py-2 rounded-sm ${
            activeTab === "skills" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => changeTab("skills")}
        >
          Skills
        </button>

        <button
          className={`px-4 py-2 rounded-sm ${
            activeTab === "skillcategory"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => changeTab("skillcategory")}
        >
          Skill Categories
        </button>
        <button
          className={`px-4 py-2 rounded-sm ${
            activeTab === "uiconfig" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => changeTab("uiconfig")}
        >
          UI Config
        </button>
      </div>

      {/* Content */}
      <div>
        {activeTab === "languages" && <LanguagesTable />}
        {activeTab === "skillcategory" && <SkillCategoriesTable />}
        {activeTab === "skills" && <SkillTable />}
        {activeTab === "uiconfig" && (
          <div className="flex items-center space-x-4">
            <span>IsFooterEnabled:</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isDisabledFooter}
                onChange={toggleDisabledFooter}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-focus:ring-4 peer-focus:ring-blue-300 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
              <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-full peer-checked:bg-white"></div>
            </label>
          </div>
        )}
      </div>
    </div>
  );
};
