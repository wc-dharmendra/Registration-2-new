import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define the initial state
const initialState = {
  categories: [],
  selectedCategory: {},
  categoryFields: [],
  guestsList: [],
  guestCount: {},
  categoryFormData: {},
};

const useCategoryMatrixStore = create(
  // Add the 'persist' middleware
  persist(
    (set) => ({
      ...initialState,
      // Define your actions here
      setCategories: (categories) => {
        set((state) => ({
          ...state,
          categories,
        }));
      },
      setSelectedCategory: (category) => {
        set((state) => ({
          ...state,
          selectedCategory: category,
        }));
      },
      setCategoryFields: (arr) => {
        set((state) => ({
          ...state,
          categoryFields: arr,
        }));
      },
      setGuestsList: (guests) => {
        set((state) => ({
          ...state,
          guestsList: guests,
        }));
      },
      setGuestCount: (data) => {
        set((state) => ({
          ...state,
          guestCount: data,
        }));
      },
      setCategoryFormData: (obj) => {
        set((state) => ({
          ...state,
          categoryFormData: obj,
        }));
      },
    }),
    {
      // Define the name for the persisted store (e.g., 'counter-store')
      name: "category-matrix-store",
      // Define the blacklist (properties that should not be persisted)
      blacklist: [],
      // Define the whitelist (properties that should be persisted)
      whitelist: ["categories", "selectedCategory", "categoryFields"],
      //skipHydration: true,
    }
  )
);

export default useCategoryMatrixStore;
