import { useEffect, useState } from "react";
import axiosInstance from "../../services/api";

export const LanguagesTable = () => {
  const [languages, setLanguages] = useState([]); // Almacena los lenguajes
  const [page, setPage] = useState(1); // Página actual
  const [totalPages, setTotalPages] = useState(1); // Total de páginas
  const [loading, setLoading] = useState(false); // Controla el estado de carga

  const perPage = 5; // Cantidad de lenguajes por página

  // Función para obtener los lenguajes desde el backend
  const fetchLanguages = async (page: number) => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get(
        `/languages/list/${page}?perPage=${perPage}`
      );

      setLanguages(data.data);
      // // @ts-ignore
      setPage(data.page);
      // // @ts-ignore
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching languages:", error);
    } finally {
      setLoading(false);
    }
  };

  // Cargar lenguajes al montar el componente y cuando cambie la página
  useEffect(() => {
    fetchLanguages(page);
  }, [page]);

  // Funciones para cambiar de página
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Languages</h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Language Name</th>
            </tr>
          </thead>
          <tbody>
            {languages.map((language: any) => (
              <tr key={language.id}>
                <td className="py-2 px-4 border-b">{language.id}</td>
                <td className="py-2 px-4 border-b">{language.languageName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="flex justify-between mt-4">
        <button
          className={`px-4 py-2 bg-gray-300 rounded ${
            page === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handlePreviousPage}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="text-lg">
          Page {page} of {totalPages}
        </span>
        <button
          className={`px-4 py-2 bg-gray-300 rounded ${
            page === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleNextPage}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};
