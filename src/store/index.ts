import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
  companyName: string;
  cscCenterId: string;
  watermark: boolean;
  defaultCardSize: 'A4' | 'PVC';
  updateSettings: (settings: Partial<SettingsState>) => void;
}

export const useStore = create<SettingsState>()(
  persist(
    (set) => ({
      companyName: 'CSC Digital Seva',
      cscCenterId: '',
      watermark: false,
      defaultCardSize: 'A4',
      updateSettings: (newSettings) => set((state) => ({ ...state, ...newSettings })),
    }),
    {
      name: 'album-creator-storage',
    }
  )
);
