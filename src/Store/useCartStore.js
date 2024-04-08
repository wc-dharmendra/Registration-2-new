// cartStore.js
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// Define the initial state
const initialState = {
  cart: {},
  isPaymentSuccess: {
    isSuccess: false,
  },
  referralForms: [],
  referralFormErrors: [],
};

const useCartStore = create(
  // Add the 'persist' middleware
  persist(
    (set) => ({
      ...initialState,
      // Define your actions here
      setCart: (cart) => {
        set((state) => ({
          ...state,
          cart,
        }));
      },
      setPaymentSuccess: (isPaymentSuccess) => {
        set((state) => ({
          ...state,
          isPaymentSuccess,
        }));
      },
      setReferralForms: (arr) => {
        set((state) => ({
          ...state,
          referralForms: arr,
        }));
      },
      setReferralFormErrors: (arr) => {
        set((state) => ({
          ...state,
          referralFormErrors: arr,
        }));
      },
    }),
    {
      // Define the name for the persisted store (e.g., 'counter-store')
      name: "cart-store",
      // (optional) by default, 'localStorage' is used
      storage: createJSONStorage(() => sessionStorage),
      // Define the blacklist (properties that should not be persisted)
      blacklist: [],
      // Define the whitelist (properties that should be persisted)
      whitelist: ["cart", "referralForms", "referralFormErrors"],
    }
  )
);

export default useCartStore;
