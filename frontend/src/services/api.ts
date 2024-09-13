import axios from "axios";

// Usar la variable VITE_URLBACKEND del archivo .env
const URLBACKEND = import.meta.env.VITE_URLBACKEND || "http://localhost:3000/api"; // URL por defecto si no está definida

// Configuración básica de Axios
const axiosInstance = axios.create({
  baseURL: URLBACKEND, // Configura la base URL para todas las peticiones
  // timeout: 10000, // Establece un tiempo de espera (opcional)
  headers: {
    "Content-Type": "application/json", // Define el tipo de contenido por defecto
  },
});

// Interceptor para manejar las respuestas
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Manejo de errores
    return Promise.reject(error);
  }
);

export default axiosInstance;



