import { User } from "@prisma/client";
import { create } from "zustand";
import { SafeUser } from "../types";

interface CurrentUserStore {
  user: SafeUser | null;
  setUser: (user: SafeUser) => void;
}

const useCurrentUser = create<CurrentUserStore>((set) => ({
  user: null,
  setUser: (user: SafeUser) => set({ user }),
}));

export default useCurrentUser;
