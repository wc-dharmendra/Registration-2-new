// eventStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define the initial state
const initialState = {
  event: {},
  mapData: {},
  isEditEvent: false,
  eventForm: {},
  questions: [],
  createEventSetting: {},
  colorNFont: { color: "", font: "" },
  integrationSetting: {},
  eventEmailSetting: [],
  isEventUpdated:true,
  emailConfig:{},
  insightData:{}
};

const useEventStore = create(
  // Add the 'persist' middleware
  persist(
    (set) => ({
      ...initialState,
      // Define your actions here
      setEvent: (event) => {
        set((state) => ({
          ...state,
          event,
        }));
      },
      setMapData: (map) => {
        set((state) => ({
          ...state,
          mapData: map,
        }));
      },
      setIsEditEvent: (isEditEvent) => {
        set((state) => ({
          ...state,
          isEditEvent,
        }));
      },
      setEventForm: (eventForm) => {
        set((state) => ({
          ...state,
          eventForm,
        }));
      },
      setCreateEventSetting: (createEventSetting) => {
        set((state) => ({
          ...state,
          createEventSetting,
        }));
      },
      setQuestions: (arr) => {
        set((state) => ({
          ...state,
          questions: arr,
        }));
      },
      setColorNFont: (colorNFont) => {
        set((state) => ({
          ...state,
          colorNFont,
        }));
      },
      setIntegrationSetting: (integrationSetting) => {
        set((state) => ({
          ...state,
          integrationSetting,
        }));
      },
      setEmailSettings: (arr) => {
        set((state) => ({
          ...state,
          eventEmailSetting: arr,
        }));
      },
      setEmailConfig: (data) => {
        set((state) => ({
          ...state,
          emailConfig: data,
        }));
      },
      setIsEventUpdated: (isEventUpdated) => {
        set((state) => ({
          ...state,
          isEventUpdated
        }));
      },
      setInsightData: (insightData) => {
        set((state) => ({
          ...state,
          insightData
        }));
      },
    }),
    {
      // Define the name for the persisted store (e.g., 'counter-store')
      name: "event-store",
      // Define the blacklist (properties that should not be persisted)
      blacklist: [],
      // Define the whitelist (properties that should be persisted)
      whitelist: ["event", "eventForm", "questions", "eventEmailSetting", "insightData"],
    }
  )
);

export default useEventStore;
