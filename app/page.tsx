"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useTimer } from "react-timer-hook";

import { useStore } from "@/lib/utils";

import { ArrowRight } from "lucide-react";

export default function Home() {
  const [currentTimer, setCurrentTimer] = useState("pomodoro");

  const { focusTime, shortBreak, longBreak } = useStore();

  const [pomodoro, setPomodoro] = useState(1);

  function minutesToSeconds(minutes: number) {
    return minutes * 60;
  }

  const PomodoroTimer = ({ expiryTimestamp }) => {
    const { seconds, minutes, isRunning, start, pause } = useTimer({
      expiryTimestamp,
      autoStart: false,
      onExpire() {
        if (pomodoro % 4 === 0) {
          setCurrentTimer((prev) => (prev = "long"));
          alert("Time for a long break!");
        } else {
          setCurrentTimer((prev) => (prev = "short"));
          alert("Time for a short break!");
        }
        setPomodoro((prev) => (prev += 1));
      },
    });

    const expire = () => {
      if (pomodoro % 4 === 0) {
        setCurrentTimer((prev) => (prev = "long"));
      } else {
        setCurrentTimer((prev) => (prev = "short"));
      }
      setPomodoro((prev) => (prev += 1));
    };

    return (
      <div className="flex flex-col gap-5">
        <div className="font-semibold text-center text-7xl">
          <span>{String(minutes).padStart(2, "0")}</span>:
          <span>{String(seconds).padStart(2, "0")}</span>
        </div>
        <div className="flex gap-1">
          {isRunning ? (
            <Button className="flex-auto" variant="secondary" onClick={pause}>
              Pause
            </Button>
          ) : (
            <Button className="flex-auto" variant="secondary" onClick={start}>
              Start
            </Button>
          )}
          <Button onClick={expire} variant="secondary" size="icon">
            <ArrowRight />
          </Button>
        </div>
      </div>
    );
  };

  const ShortBreakTimer = ({ expiryTimestamp }) => {
    const { seconds, minutes, isRunning, start, pause } = useTimer({
      expiryTimestamp,
      autoStart: false,
      onExpire() {
        expire();
        alert("Time to focus!");
      },
    });

    const expire = () => {
      setCurrentTimer((prev) => (prev = "pomodoro"));
    };

    return (
      <div className="flex flex-col gap-5">
        <div className="font-semibold text-center text-7xl">
          <span>{String(minutes).padStart(2, "0")}</span>:
          <span>{String(seconds).padStart(2, "0")}</span>
        </div>
        <div className="flex gap-1">
          {isRunning ? (
            <Button className="flex-auto" variant="secondary" onClick={pause}>
              Pause
            </Button>
          ) : (
            <Button className="flex-auto" variant="secondary" onClick={start}>
              Start
            </Button>
          )}
          <Button onClick={expire} variant="secondary" size="icon">
            <ArrowRight />
          </Button>
        </div>
      </div>
    );
  };

  const LongBreakTimer = ({ expiryTimestamp }) => {
    const { seconds, minutes, isRunning, start, pause } = useTimer({
      expiryTimestamp,
      autoStart: false,
      onExpire() {
        alert("Time to focus!");
        expire();
      },
    });

    const expire = () => {
      setCurrentTimer((prev) => (prev = "pomodoro"));
    };

    return (
      <div className="flex flex-col gap-5">
        <div className="font-semibold text-center text-7xl">
          <span>{String(minutes).padStart(2, "0")}</span>:
          <span>{String(seconds).padStart(2, "0")}</span>
        </div>
        <div className="flex gap-1">
          {isRunning ? (
            <Button className="flex-auto" variant="secondary" onClick={pause}>
              Pause
            </Button>
          ) : (
            <Button className="flex-auto" variant="secondary" onClick={start}>
              Start
            </Button>
          )}
          <Button onClick={expire} variant="secondary" size="icon">
            <ArrowRight />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <main className="flex justify-center mt-10">
      <Tabs
        className="flex flex-col gap-5"
        defaultValue="pomodoro"
        value={currentTimer}
      >
        <TabsList className="capitalize">
          <TabsTrigger value="pomodoro">Pomodoro</TabsTrigger>
          <TabsTrigger value="short">Short break</TabsTrigger>
          <TabsTrigger value="long">Long break</TabsTrigger>
        </TabsList>
        <TabsContent value="pomodoro">
          <PomodoroTimer
            expiryTimestamp={new Date().setSeconds(
              new Date().getSeconds() + minutesToSeconds(focusTime),
            )}
          />
        </TabsContent>
        <TabsContent value="short">
          <ShortBreakTimer
            expiryTimestamp={new Date().setSeconds(
              new Date().getSeconds() + minutesToSeconds(shortBreak),
            )}
          />
        </TabsContent>
        <TabsContent value="long">
          <LongBreakTimer
            expiryTimestamp={new Date().setSeconds(
              new Date().getSeconds() + minutesToSeconds(longBreak),
            )}
          />
        </TabsContent>
        <p className="text-center text-gray-500">#{pomodoro}</p>
      </Tabs>
    </main>
  );
}
