"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { WheelSettings } from "@/types/wheel";
import "@/types/wheel";

const defaultSettings: WheelSettings = {
  wheelMode: 2,

  wheelData: ["Lương Viết Hiệu", "Cao Viết Được", "Định Thị Thanh Huyền"],

  spinResults: {},

  spins: 16,

  duration: 19500,

  showGiftSection: true,

  numberFontSize: 0.08,

  nameFontSize: 0.045,

  textPosition: 0.85,

  questions: [
    {
      question: "Câu hỏi 1",
      answer: "Đáp án 1",
    },
    {
      question: "Câu hỏi 2",
      answer: "Đáp án 2",
    },
  ],
};

export default function Wheel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [settings, setSettings] = useState<WheelSettings>(() => {
    if (typeof window === "undefined") {
      return defaultSettings;
    }

    try {
      const saved = localStorage.getItem("wheelSettings");

      return saved ? JSON.parse(saved) : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const wheelData = settings.wheelData;

    const numSegments = wheelData.length;

    const rotation = 0;

    const drawWheel = () => {
      const size = canvas.width;

      const center = size / 2;

      const radius = size / 2;

      const angle = (2 * Math.PI) / numSegments;

      ctx.clearRect(0, 0, size, size);

      ctx.save();

      ctx.translate(center, center);

      ctx.rotate(rotation);

      for (let i = 0; i < numSegments; i++) {
        const start = i * angle;
        const end = start + angle;

        ctx.beginPath();

        ctx.moveTo(0, 0);

        ctx.arc(0, 0, radius, start, end);

        ctx.fillStyle = i % 2 === 0 ? "#ffffff" : "#febc4e";

        ctx.fill();

        ctx.strokeStyle = "#ffffff";

        ctx.lineWidth = 2;

        ctx.stroke();

        ctx.save();

        ctx.rotate(start + angle / 2);

        ctx.fillStyle = "#000";

        ctx.textAlign = "right";

        ctx.textBaseline = "middle";

        ctx.font = `${radius * 0.045}px Arial`;

        ctx.fillText(wheelData[i], radius * 0.85, 0);

        ctx.restore();
      }

      ctx.restore();
    };

    const resizeCanvas = () => {
      const size = Math.min(window.innerWidth * 0.5, 600);

      canvas.width = size;

      canvas.height = size;

      drawWheel();
    };

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [settings]);

  return (
    <div className="container">
      <div className="left">
        <h2 className="title">🎯 Vòng quay may mắn</h2>

        <div className="wheelWrapper">
          <div className="pointer" />

          <canvas ref={canvasRef} id="wheel" />
        </div>

        <button className="buttonSpin">QUAY</button>
      </div>

      {settings.showGiftSection && (
        <div className="right">
          <h2 className="title2">🎁 Chọn một món quà</h2>

          <div className="giftContainer">
            {settings.questions.map((_, index) => (
              <Link key={index} href={`/question?q=${index}`} className="gift">
                <Image
                  src="/images/gift-close.png"
                  width={220}
                  height={220}
                  alt="Gift"
                />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
