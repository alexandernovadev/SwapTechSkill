import React, { useEffect, useMemo, useState } from "react";
import { useTable, usePagination, Column } from "react-table";
import { useForm, SubmitHandler } from "react-hook-form";
import axiosInstance from "../../services/api";

// Definición de tipos para los datos de la tabla
interface Language {
  id: number;
  languageName: string;
}

// Definición de tipos para el formulario
interface LanguageForm {
  languageName: string;
}

// Componente para la tabla de Languages
export const LanguagesTable: React.FC = () => {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize] = useState(5); // Número de elementos por página
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingLanguage, setEditingLanguage] = useState<Language | null>(null);
  const { register, handleSubmit, reset } = useForm<LanguageForm>();

  // Cargar datos de Languages con paginación
  const fetchLanguages = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/languages/list/${pageIndex + 1}` // Incrementamos el índice de página
      );
      setLanguages(response.data);
    } catch (error) {
      console.error("Error fetching languages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLanguages();
  }, [pageIndex]);

  // Columnas para la tabla
  const columns: Column<Language>[] = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Language Name",
        accessor: "languageName",
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div className="space-x-2">
            <button
              className="text-blue-600"
              onClick={() => handleEdit(row.original)}
            >
              Edit
            </button>
            <button
              className="text-red-600"
              onClick={() => handleDelete(row.original.id)}
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    []
  );

  // Crear o actualizar un language
  const onSubmit: SubmitHandler<LanguageForm> = async (data) => {
    if (editingLanguage) {
      await axiosInstance.put(`/languages/update/${editingLanguage.id}`, data);
    } else {
      await axiosInstance.post("/languages/create", data);
    }
    reset();
    setShowModal(false);
    fetchLanguages();
  };

  // Eliminar un language
  const handleDelete = async (id: number) => {
    await axiosInstance.delete(`/languages/delete/${id}`);
    fetchLanguages();
  };

  // Editar un language
  const handleEdit = (language: Language) => {
    setEditingLanguage(language);
    setShowModal(true);
    reset(language);
  };

  // Configuración de la tabla con React Table y paginación
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Datos para la página actual
    canPreviousPage,
    canNextPage,
    previousPage,
    nextPage,
    pageOptions,
    gotoPage,
    setPageSize,
    state: { pageIndex: tablePageIndex, pageSize: tablePageSize },
  } = useTable(
    {
      columns,
      data: languages,
      initialState: { pageIndex, pageSize }, // Paginación inicial
      manualPagination: true, // Paginación controlada manualmente
      pageCount: Math.ceil(languages.length / pageSize), // Número total de páginas
    },
    usePagination
  );

  return (
    <div>
      <div className="mb-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg"
          onClick={() => {
            setEditingLanguage(null);
            setShowModal(true);
          }}
        >
          Add Language
        </button>
      </div>

      {/* Modal para crear/editar */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl mb-4">
              {editingLanguage ? "Edit Language" : "Add Language"}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label htmlFor="languageName" className="block">
                  Language Name
                </label>
                <input
                  type="text"
                  id="languageName"
                  {...register("languageName", { required: true })}
                  className="border p-2 w-full"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tabla con React Table */}
      <table {...getTableProps()} className="min-w-full bg-white">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="px-4 py-2 border-b-2 border-gray-300"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    className="px-4 py-2 border-b border-gray-300"
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Paginación */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg"
        >
          Previous
        </button>
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
};
