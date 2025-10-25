import React, { useEffect, useRef, useState } from "react";

  const formatTime = (ms: number) => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    const milliseconds = Math.floor(ms % 1000);

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}.${String(milliseconds)
      .padStart(3, "0")
      .slice(0, 2)}`;
  };

export default function App() {
  const [time, setTime] = useState<string>("");
  const [dayInfo, setDayInfo] = useState<string>("");
  const [showAmPm, setShowAmPm] = useState<boolean>(true); // toggle this to false to hide AM/PM

  const [timeLeft, setTimeLeft] = useState(60 * 60 * 1000); // 1 hour in ms
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  

  useEffect(() => {
    const tick = () => {
      const now = new Date();

      // top row: e.g. "FRI 24 10"
      const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
      const day = days[now.getDay()];
      const date = now.getDate().toString().padStart(2, "0");
      const month = (now.getMonth() + 1).toString().padStart(2, "0");
      setDayInfo(`${day} ${date}.${month}`);

      // bottom row: time with or without AM/PM
      const timeStr = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: showAmPm,
      });

      setTime(timeStr);
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [showAmPm]);


    useEffect(() => {
    const update = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const remaining = Math.max(60 * 60 * 1000 - elapsed, 0);
      setTimeLeft(remaining);
      if (remaining > 0) {
        timerRef.current = requestAnimationFrame(update);
      }
    };
    timerRef.current = requestAnimationFrame(update);

    return () => {
      if (timerRef.current) cancelAnimationFrame(timerRef.current);
    };
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "transparent",
        WebkitAppRegion: "drag",
      } as React.CSSProperties as any}
    >
      {/* Top row */}
      <span
        style={{
          color: "rgba(96, 96, 96, 0.8)",
          fontSize: "1.6rem",
          fontFamily: "'Square-Dot-Matrix', monospace",
          textShadow: "0 0 0px rgba(0, 0, 0, 0.8)",
          userSelect: "none",
          marginBottom: "0.3rem",
        }}
      >
        {dayInfo}
      </span>

      {/* Time row */}
      <span
        style={{
          color: "rgba(96, 96, 96, 0.8)",
          fontSize: "3rem",
          fontFamily: "'Square-Dot-Matrix', monospace",
          textShadow: "0 0 0px rgba(0, 0, 0, 0.8)",
          userSelect: "none",
        }}
      >
        {time}
      </span>
      <span
        style={{
          color: "rgba(96, 96, 96, 0.8)",
          fontSize: "3rem",
          fontFamily: "'Square-Dot-Matrix', monospace",
          textShadow: "0 0 0px rgba(0, 0, 0, 0.8)",
          userSelect: "none",
        }}
      >
        {formatTime(timeLeft)}
      </span>
    </div>
  );
}

        // fontFamily: "'LCD2U',monospace",
// npm run build:electron
// npm run dev