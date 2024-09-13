import { useState } from "react";
import Footer from "../organisms/Footer";
import homeIcon from "../../assets/icons/home.svg";
import personIcon from "../../assets/icons/perfil.svg";
import searchIcon from "../../assets/icons/buscar.svg";
import messageIcon from "../../assets/icons/msg.svg";
import notificationIcon from "../../assets/icons/notification.svg";
import logoutIcon from "../../assets/icons/closesession.svg";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUnlockKeyhole } from '@fortawesome/free-solid-svg-icons';
   
import Logo from "../../assets/LogoPng.png";
import { useAuthStore } from "../../state/authStore";

export const Dashboard = () => {
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

  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-100">
      {/* Sección del contenido */}
      <section className="w-full flex flex-row h-[80vh]">
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

          <div className="flex text-center justify-center items-center w-full">
            <img src={Logo} alt="Logo" />
          </div>
          <ul>
            <li className="mb-4 border-b border-white pl-[30px] py-3">
              <Link to={"/dash/admin"} className="flex items-center text-lg">
                <FontAwesomeIcon icon={faUnlockKeyhole} className="mr-2 w-6 h-6"/> {""}
                Admin
              </Link>
            </li>
            <li className="mb-4 border-b border-white pl-[30px] py-3">
              <Link to={"/dash/"} className="flex items-center text-lg">
                <img src={homeIcon} alt="Inicio" className="mr-2 w-6 h-6" />
                Inicio
              </Link>
            </li>
            <li className="mb-4 border-b border-white pl-[30px] py-3">
              <Link to={"/dash/profile"} className="flex items-center text-lg">
                <img src={personIcon} alt="Perfil" className="mr-2 w-6 h-6" />
                Perfil
              </Link>
            </li>
            <li className="mb-4 border-b border-white pl-[30px] py-3">
              <Link to={"/dash/search"} className="flex items-center text-lg">
                <img src={searchIcon} alt="Búsqueda" className="mr-2 w-6 h-6" />
                Búsqueda
              </Link>
            </li>
            <li className="mb-4 border-b border-white pl-[30px] py-3">
              <Link to={"/dash/messages"} className="flex items-center text-lg">
                <img
                  src={messageIcon}
                  alt="Mensajes"
                  className="mr-2 w-6 h-6"
                />
                Mensajes
              </Link>
            </li>
            <li className="mb-4 border-b border-white pl-[30px] py-3">
              <Link to={"/dash/notifications"} className="flex items-center text-lg">
                <img
                  src={notificationIcon}
                  alt="Notificaciones"
                  className="mr-2 w-6 h-6"
                />
                Notificaciones
              </Link>
            </li>
            <li className="mb-4 border-b border-white pl-[30px] py-3">
              <button
                onClick={handleLogout}
                className="flex items-center text-lg"
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

      <Footer />
    </div>
  );
};
