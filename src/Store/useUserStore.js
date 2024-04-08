// userStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';



// Define the initial state
const initialState = {
    user: {},
    isPasswordSet: false,
    prevLocation:''
};

const useUserStore = create(
    // Add the 'persist' middleware
    persist(
        (set) => ({
            ...initialState,
            // Define your actions here
            setUser: (user) => {
                set((state) => ({
                    ...state,
                    user
                }))
            },
            setIsPaswordSet: (isPasswordSet) => {
                set((state) => ({
                    ...state,
                    isPasswordSet
                }))
            },
            setPrevLocation: (prevLocation) => {
                set((state) => ({
                    ...state,
                    prevLocation
                }))
            },
        }),
        {
            // Define the name for the persisted store (e.g., 'counter-store')
            name: 'user-store',
            // Define the blacklist (properties that should not be persisted)
            blacklist: [],
            // Define the whitelist (properties that should be persisted)
            whitelist: ['user', "isPasswordSet"],
        }
    )
);

export default useUserStore;
