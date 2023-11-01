"use client";

import Image from "next/image";
import { ModeToggle } from "./toggle-theme";
import { SettingsToggle } from "./settings";
import { useStore } from "@/lib/utils";

export const Navbar = () => {
  const {
    focusTime,
    shortBreak,
    longBreak,
    updateFocusTime,
    updateShortBreak,
    updateLongBreak,
  } = useStore();
  return (
    <nav className="py-5">
      <div className="mx-auto max-w-[85%] flex items-center justify-between">
        <Image src="/tomato.png" width={40} height={40} alt="tomato" />
        <div className="flex items-center gap-2">
          <SettingsToggle
            focusTime={focusTime}
            shortBreak={shortBreak}
            longBreak={longBreak}
            updateFocusTime={updateFocusTime}
            updateShortBreak={updateShortBreak}
            updateLongBreak={updateLongBreak}
          />
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};
