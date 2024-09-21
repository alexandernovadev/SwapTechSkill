import { useEffect, useState } from "react";
import Footer from "../organisms/Footer";
import homeIcon from "../../assets/icons/home.svg";
import personIcon from "../../assets/icons/perfil.svg";
import searchIcon from "../../assets/icons/buscar.svg";
import messageIcon from "../../assets/icons/msg.svg";
import notificationIcon from "../../assets/icons/notification.svg";
import logoutIcon from "../../assets/icons/closesession.svg";
import {  NavLink, Outlet, useNavigate } from "react-router-dom";

import Logo from "../../assets/LogoPng.png";
import { useAuthStore } from "../../state/authStore";
import { useUIConfigStore } from "../../state/uiConfig";

export const Dashboard = () => {
  const { isDisabledFooter } = useUIConfigStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const gotoAdmin = () => {
    navigate("/dash/admin");
  };

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center text-lg pl-[30px] py-4 ${
      isActive ? "gradient-background-azulfeo" : ""
    }`;

  useEffect(() => {
    // Quitar el sccroll del body
    document.body.style.overflow = "hidden";

    return () => {
      // Habilitar el scroll del body
      document.body.style.overflow = "auto";
    };
  }, []);

  const height = isDisabledFooter ? "h-[80vh]" : "h-[100vh]";

  return (
    <div className="w-full min-h-screen flex flex-col bg-transparent overflow-hidden">
      {/* Sección del contenido */}
      <section
        className={`w-full flex flex-row ${height} transition-all duration-300`}
      >
        {/* Sidebar */}
        <nav
          className={`bg-[#5c5e62] text-white fixed top-0 left-0 h-full z-10 transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "-translate-x-64"
          } md:relative md:translate-x-0 md:w-64`}
        >
          {/* Botón para abrir/cerrar menú en mobile */}
          <button
            className="block md:hidden text-gray-700 bg-gray-300 p-2 rounded"
            onClick={toggleMenu}
          >
            <span className="material-icons">menu</span>
          </button>

          <div className="flex text-center justify-center items-center w-full mb-6 mt-6">
            {/* Si le doy doble click al logo debera navegar a /dash/admin */}
            <img
              src={Logo}
              alt="Logo"
              className="cursor-pointer"
              onDoubleClick={gotoAdmin}
            />
          </div>
          <ul>
            {/* <li className="mb-4 border-b border-white pl-[30px] py-3">
              <Link to={"/dash/admin"} className="flex items-center text-lg">
                <FontAwesomeIcon icon={faUnlockKeyhole} className="mr-2 w-6 h-6"/> {""}
                Admin
              </Link>
            </li> */}
            <li className=" border-b border-white">
              <NavLink to={"/dash/home"} className={linkClasses}>
                <img src={homeIcon} alt="Inicio" className="mr-2 w-6 h-6" />
                Inicio
              </NavLink>
            </li>
            <li className=" border-b border-white">
              <NavLink to={"/dash/profile"} className={linkClasses}>
                <img src={personIcon} alt="Perfil" className="mr-2 w-6 h-6" />
                Perfil
              </NavLink>
            </li>
            <li className=" border-b border-white">
              <NavLink to={"/dash/search"} className={linkClasses}>
                <img src={searchIcon} alt="Búsqueda" className="mr-2 w-6 h-6" />
                Búsqueda
              </NavLink>
            </li>
            <li className=" border-b border-white">
              <NavLink to={"/dash/messages"} className={linkClasses}>
                <img
                  src={messageIcon}
                  alt="Mensajes"
                  className="mr-2 w-6 h-6"
                />
                Mensajes
              </NavLink>
            </li>
            <li className=" border-b border-white">
              <NavLink to={"/dash/notifications"} className={linkClasses}>
                <img
                  src={notificationIcon}
                  alt="Notificaciones"
                  className="mr-2 w-6 h-6"
                />
                Notificaciones
              </NavLink>
            </li>
            <li className=" border-b border-white ">
              <button
                onClick={handleLogout}
                className="flex items-center text-lg pl-[30px] py-4"
              >
                <img
                  src={logoutIcon}
                  alt="Cerrar Sesión"
                  className="mr-2 w-6 h-6"
                />
                Cerrar Sesión
              </button>
            </li>
          </ul>
        </nav>

        {/* Contenido principal */}
        <section
          className={`flex-1 bg-white p-6 transition-all duration-300  overflow-auto ${
            menuOpen ? "ml-0" : " "
          }`}
        >
          {/* Botón para abrir/cerrar menú en mobile */}
          <button
            className="block md:hidden text-gray-700 bg-gray-300 p-2 rounded"
            onClick={toggleMenu}
          >
            <span className="material-icons">menu</span>
          </button>

          <div className="mt-4">
            <Outlet />
          </div>
        </section>
      </section>

      {isDisabledFooter && <Footer />}
    </div>
  );
};
