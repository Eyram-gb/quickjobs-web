// import { TCompanySchema } from '@/components/forms/NewCompanyForm';
// store/authStore.ts
import { TClientSchema } from "@/components/forms/NewClientForm";
import { TCompanySchema } from "@/components/forms/NewCompanyForm";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  id: string;
  email: string;
  user_type: string;
}

interface TEmployer extends TCompanySchema {
  id: string;
}
interface TClient extends TClientSchema {
  id: string;
}

interface AuthState {
  user: User | null;
  employer_profile: TEmployer | null;
  setEmployerProfile: (profile: TEmployer) => void;
  client_profile: TClient | null; // Add client profile schema here.
  setClientProfile: (profile: TClient) => void;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      employer_profile: null,
      client_profile: null,
      isAuthenticated: false,
      setEmployerProfile: (profile) => set({ employer_profile: profile }),
      setClientProfile: (profile) => set({ client_profile: profile }),
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: "qj-auth-storage", // name of the item in the storage (must be unique)
      // getStorage: () => localStorage, // (optional) by default, 'localStorage' is used
    }
  )
);
