import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialState = {
  firstNameArr: [],
  lastNameArr: [],
  qrCodeArr: [],
  categories: [],
  badgeConfig: {},
  badges: { mBadges: [], pBadges: [] }
};

const useBadgeStore = create(
  persist(
    (set) => ({
      ...initialState,
      setFirstNameArr: (arr) => {
        set((state) => ({
          ...state,
          firstNameArr: arr,
        }));
      },
      setLastNameArr: (arr) => {
        set((state) => ({
          ...state,
          lastNameArr: arr,
        }));
      },
      setQrcodeArr: (arr) => {
        set((state) => ({
          ...state,
          qrCodeArr: arr,
        }));
      },
      setCategories: (categories) => {
        set((state) => ({
          ...state,
          categories,
        }));
      },
      setBadgeConfig: (badgeConfig) => {
        set((state) => ({
          ...state,
          badgeConfig,
        }));
      },
      setBadges: (badges) => {
        set((state) => ({
          ...state,
          badges
        }))
      }
    }),
    {
      // Define the name for the persisted store (e.g., 'counter-store')
      name: "badge-store",
      // Define the blacklist (properties that should not be persisted)
      blacklist: [],
      // Define the whitelist (properties that should be persisted)
      whitelist: ["badges"],
      skipHydration: true,
    }
  )
);

export default useBadgeStore;
