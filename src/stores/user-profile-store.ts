import { create } from "zustand";
import type { AgeGroup } from "@/data/sleep-content";
import type { Gender, PlayingLevel } from "@/types";

interface UserProfileState {
  ageGroup: AgeGroup | null;
  gender: Gender | null;
  playingLevel: PlayingLevel | null;
  goals: string[];
  setProfile: (profile: {
    ageGroup: AgeGroup;
    gender: Gender;
    playingLevel: PlayingLevel;
    goals: string[];
  }) => void;
}

export const useUserProfileStore = create<UserProfileState>()((set) => ({
  ageGroup: null,
  gender: null,
  playingLevel: null,
  goals: [],
  setProfile: (profile) => set(profile),
}));
