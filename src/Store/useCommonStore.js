import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialState = {
    isLoading: false,
    navigateTo:"",
    token:""
};

const useCommonStore = create(
    persist(
        (set) => ({
            ...initialState,
            setIsLoading: (loading = false) => {
                set((state) => ({
                    ...state,
                    isLoading: loading
                }))
            },
            setSetup: (setupData) => {
                set((state) => ({
                    ...state,
                    ...setupData,
                }))
            },
            setNavigateTo: (navigateTo) => {
                set((state) => ({
                    ...state,
                    navigateTo,
                }))
            },
            setToken: (token) => {
                set((state) => ({
                    ...state,
                    token,
                }))
            },
        }),
        { name: 'common-store' }
    )
);

export default useCommonStore;
