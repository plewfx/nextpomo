import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { create } from 'zustand'
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const useStore = create((set) => ({
  focusTime: "25",
  shortBreak: "5",
  longBreak: "15",
  updateFocusTime: (value: string) => set({ focusTime: value }),
  updateShortBreak: (value: string) => set({ shortBreak: value }),
  updateLongBreak: (value: string) => set({ longBreak: value }),
}))