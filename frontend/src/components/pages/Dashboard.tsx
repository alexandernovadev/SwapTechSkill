import { useEffect } from "react";
import Footer from "../organisms/Footer";
import { Outlet } from "react-router-dom";
import { useUIConfigStore } from "../../state/uiConfig";
import { useAuthStore } from "../../state/authStore";
import { Sidebar } from "../organisms/Sidebar";

export const Dashboard = () => {
  const { isDisabledFooter } = useUIConfigStore();
  const { user } = useAuthStore();

  useEffect(() => {
    // Quitar el sccroll del body
    document.body.style.overflow = "hidden";

    return () => {
      // Habilitar el scroll del body
      document.body.style.overflow = "auto";
    };
  }, []);

  // const height = isDisabledFooter ? "h-[80vh]" : "h-[100vh]";

  return (
    <div className="w-full min-h-screen flex flex-col bg-transparent overflow-hidden">
      {/* Sección del contenido */}
      <section
        className={`w-full flex flex-row h-[100vh] transition-all duration-300`}
      >
        <Sidebar />

        <div className="pt-5 w-[100%] bg-white overflow-auto">
          <Outlet />
        </div>
      </section>

      {isDisabledFooter && <Footer />}
    </div>
  );
};
