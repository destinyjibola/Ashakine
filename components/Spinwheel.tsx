"use client";

import React, { CSSProperties, useEffect } from "react";

const segments = [
  { i: 1, color: "#db7093", value: "100" },
  { i: 2, color: "#20b2aa", value: "200" },
  { i: 3, color: "#ffb347", value: "300" },
  { i: 4, color: "#9370db", value: "400" },
  { i: 5, color: "#3cb371", value: "500" },
  { i: 6, color: "#ffa07a", value: "600" },
  { i: 7, color: "#40e0d0", value: "700" },
  { i: 8, color: "#ff6347", value: "800" },
];

const SpinWheel: React.FC = () => {
  useEffect(() => {
    const wheel = document.querySelector(".wheel") as HTMLElement | null;
    const spinBtn = document.querySelector(".spinBtn") as HTMLElement | null;
    let value = Math.ceil(Math.random() * 3600);

    if (spinBtn && wheel) {
      spinBtn.onclick = () => {
        wheel.style.transform = `rotate(${value}deg)`;
        value += Math.ceil(Math.random() * 3600);
      };
    }
  }, []);

  return (
    <div className="containers">
      <div className="spinBtn">SPIN</div>
      <div className="wheel">
        {segments.map((seg) => {
          const style: CSSProperties & { [key: string]: string } = {
            "--i": seg.i.toString(),
            "--clr": seg.color,
          };
          return (
            <div key={seg.i} className="number" style={style}>
              <span>{seg.value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SpinWheel;
