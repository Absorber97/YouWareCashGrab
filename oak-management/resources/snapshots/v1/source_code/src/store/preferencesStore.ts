import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { preferencesApi, UserPreferences } from '../api/client';

interface PreferencesState {
  preferences: UserPreferences | null;
  isLoading: boolean;
  fetchPreferences: () => Promise<void>;
  updatePreferences: (prefs: Partial<UserPreferences>) => Promise<void>;
}

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      preferences: null,
      isLoading: false,

      fetchPreferences: async () => {
        set({ isLoading: true });
        try {
          const preferences = await preferencesApi.get();
          set({ preferences, isLoading: false });
        } catch {
          set({ isLoading: false });
        }
      },

      updatePreferences: async (prefs) => {
        try {
          const updated = await preferencesApi.update(prefs);
          set({ preferences: updated });
        } catch {
          // Silent fail
        }
      },
    }),
    {
      name: 'yousoul-preferences',
      partialize: (state) => ({ preferences: state.preferences }),
    }
  )
);
