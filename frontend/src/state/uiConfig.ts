import create from 'zustand';

// Tipado para el estado del store
interface UIConfigState {
  isDisabledFooter: boolean;
  getIsDisabledFooter: () => boolean;
  toggleDisabledFooter: () => void;
  setDisabledFooter: (value: boolean) => void;
  clearDisabledFooter: () => void;
}

// Función para obtener el estado de localStorage
const getLocalStorage = (key: string, initialValue: boolean): boolean => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  } catch (error) {
    console.error(error);
    return initialValue;
  }
};

// Función para guardar el estado en localStorage
const setLocalStorage = (key: string, value: boolean): void => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(error);
  }
};

export const useUIConfigStore = create<UIConfigState>((set) => ({
  // Estado inicial, lo obtiene de localStorage o por defecto en `false`
  isDisabledFooter: getLocalStorage('isDisabledFooter', false),

  // Método para obtener el estado actual
  getIsDisabledFooter: () => getLocalStorage('isDisabledFooter', false),

  // Método para alternar el estado (CRUD)
  toggleDisabledFooter: () =>
    set((state) => {
      const newValue = !state.isDisabledFooter;
      setLocalStorage('isDisabledFooter', newValue); // Guarda en localStorage
      return { isDisabledFooter: newValue };
    }),

  // Método para establecer un valor directamente
  setDisabledFooter: (value: boolean) =>
    set(() => {
      setLocalStorage('isDisabledFooter', value); // Guarda en localStorage
      return { isDisabledFooter: value };
    }),

  // Método para eliminar el valor de localStorage
  clearDisabledFooter: () =>
    set(() => {
      window.localStorage.removeItem('isDisabledFooter');
      return { isDisabledFooter: false }; // Reestablece al valor por defecto
    }),
}));

