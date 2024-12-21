import { Group } from "@/type/types";
import {create} from "zustand";

interface GroupStore {
  selectedGroup: Group | null;
  groups: Group[];
  isLoading: boolean;
  error: Error | null;
  setSelectedGroup: (group: Group | null) => void;
  setGroups: (groups: Group[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
  loadSelectedGroup: () => void;
}

const useGroupStore = create<GroupStore>((set) => ({
  selectedGroup: null,
  groups: [],
  isLoading: false,
  error: null,
  setSelectedGroup: (group) => {
    if (group) {
      localStorage.setItem("selectedGroup", JSON.stringify(group));
    } else {
      localStorage.removeItem("selectedGroup");
    }
    set({ selectedGroup: group });
  },
  setGroups: (groups) => set({ groups }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  loadSelectedGroup: () => {
    const group = localStorage.getItem("selectedGroup");
    if (group) {
      set({ selectedGroup: JSON.parse(group) });
    }
  },
}));

export default useGroupStore;
