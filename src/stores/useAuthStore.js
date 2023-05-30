import create from "zustand";

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  setAuthentication: (value) => set({ isAuthenticated: value }),
}));

export default useAuthStore;
