"use client";
import React, { useEffect, useId, useState } from "react";
import clsx from "clsx";
import { Play, Pause, RotateCcw } from "react-feather";

import Card from "@/components/Card";
import VisuallyHidden from "@/components/VisuallyHidden";

import { motion } from "framer-motion";

import styles from "./CircularColorsDemo.module.css";

const COLORS = [
  { label: "red", value: "hsl(348deg 100% 60%)" },
  { label: "yellow", value: "hsl(50deg 100% 55%)" },
  { label: "blue", value: "hsl(235deg 100% 65%)" },
];

function CircularColorsDemo() {
  const id = useId();
  const [status, setStatus] = useState("idle");
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    if (status === "idle") {
      return;
    }

    const intervalId = setInterval(() => {
      setTimeElapsed((currentValue) => currentValue + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [status]);
  const selectedColor = COLORS[timeElapsed % COLORS.length];

  return (
    <Card as="section" className={styles.wrapper}>
      <ul className={styles.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected = color.value === selectedColor.value;

          return (
            <li className={styles.color} key={index}>
              {isSelected && (
                <motion.div
                  layoutId={`${id}-selected-box`}
                  className={styles.selectedColorOutline}
                />
              )}
              <div
                className={clsx(
                  styles.colorBox,
                  isSelected && styles.selectedColorBox,
                )}
                style={{
                  backgroundColor: color.value,
                }}
              >
                <VisuallyHidden>{color.label}</VisuallyHidden>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{timeElapsed}</dd>
        </dl>
        <div className={styles.actions}>
          <button
            onClick={() => {
              if (status === "running") {
                setStatus("idle");
              } else {
                setStatus("running");
              }
            }}
          >
            {status === "idle" ? <Play /> : <Pause />}
            <VisuallyHidden>
              {status === "idle" ? "Play" : "Pause"}
            </VisuallyHidden>
          </button>
          <button
            onClick={() => {
              setStatus("idle");
              setTimeElapsed(0);
            }}
          >
            <RotateCcw />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default CircularColorsDemo;
