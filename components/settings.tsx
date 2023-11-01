"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings } from "lucide-react";

import { useState } from "react";

interface TimerProps {
    focusTime: number;
    shortBreak: number;
    longBreak: number;
    updateFocusTime: ( focusTime: string ) => void;
    updateShortBreak: ( shortBreak: string ) => void;
    updateLongBreak: ( longBreak: string ) => void;
}

export function SettingsToggle({
  focusTime,
  shortBreak,
  longBreak,
  updateFocusTime,
  updateShortBreak,
  updateLongBreak,
}: TimerProps) {
  const [focusValue, setFocusValue] = useState("");
  const [shortValue, setShortValue] = useState("");
  const [longValue, setLongValue] = useState("");

  const saveSettings = () => {
    updateFocusTime(focusValue);
    updateShortBreak(shortValue);
    updateLongBreak(longValue);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit timer</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="focus" className="text-right">
              Focus time
            </Label>
            <Input
              id="focus"
              type="number"
              value={focusValue}
              defaultValue={Number(focusTime)}
              onChange={e => { setFocusValue(e.currentTarget.value) }}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="short" className="text-right">
              Short break
            </Label>
            <Input
              id="short"
              type="number"
              value={shortValue}
              defaultValue={Number(shortBreak)}
              onChange={e => { setShortValue(e.currentTarget.value) }}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="long" className="text-right">
              Long break
            </Label>
            <Input
              id="long"
              type="number"
              value={longValue}
              defaultValue={Number(longBreak)}
              onChange={e => { setLongValue(e.currentTarget.value) }}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" variant="outline" onClick={saveSettings}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
