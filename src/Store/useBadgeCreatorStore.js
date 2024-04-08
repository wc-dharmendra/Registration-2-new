import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const initialState = {
  canvasJsonStr: "",
  canvasSVG: "",
  badgefieldsBtn:[
    {
      add_id: "addButton-First Name",
      add_text: "First Name",
      delete_id: "deleteButton-First Name",
      icon: "NameUserIcon"
    },
    {
      add_id: "addButton-Last Name",
      add_text: "Last Name",
      delete_id: "deleteButton-Last Name",
      icon: "NameUserIcon"
    },
    {
      add_id: "addButton-QRCode",
      add_text: "QR Code",
      delete_id: "deleteButton-QRCode",
      icon: "QRCodeIcon"
    },
  ]
};

const useBadgeCreatorStore = create(
  persist(
    (set) => ({
      ...initialState,
      setCanvasJsonStr: (jsonstr) => {
        set((state) => ({
          ...state,
          canvasJsonStr: jsonstr,
        }));
      },
      setCanvasSVG: (data) => {
        set((state) => ({
          ...state,
          canvasSVG: data,
        }));
      },
      checkIfFieldExists: (id) => {
        const state = useBadgeCreatorStore?.getState();
        for (let i = 0; i < state?.canvasJsonStr?.objects?.length; i++) {
          if (state?.canvasJsonStr?.objects[i]?.id === id) {
            return true;
          }
        }
        return false;
      },
      setBadgeFieldsBtn:(arr)=>{
        set((state) =>({
          ...state,
          badgefieldsBtn:arr
        }))
      }
    }),
    {
      // Define the name for the persisted store (e.g., 'counter-store')
      name: "badge-creator-store",
      // Define the blacklist (properties that should not be persisted)
      blacklist: [],
      storage: createJSONStorage(() => sessionStorage),
      // Define the whitelist (properties that should be persisted)
      whitelist: ["canvasJsonStr", "canvasSVG","badgefieldsBtn"],
      // skipHydration: true,
    }
  )
);

export default useBadgeCreatorStore;
