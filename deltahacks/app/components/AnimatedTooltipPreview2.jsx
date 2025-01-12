"use client";
import React from "react";
import { AnimatedTooltip } from "../ui/animated-tooltip";

const people2 = [
  {
    id: 1,
    name: "React",
    designation: "Framework",
    image: "/react.svg", // Fixed the URL format
  },
  {
    id: 2,
    name: "Node",
    designation: "Runtime Environment",
    image: "/node.jpg", // Fixed the URL format
  },
  {
    id: 3,
    name: "Twilio",
    designation: "Communication API",
    image: "/twilio.jpg", // Fixed the URL format
  },
  {
    id: 4,
    name: "Cohere",
    designation: "AI/ML API",
    image: "/cohere.png", // Fixed the URL format
  },
  {
    id: 5,
    name: "mongodb",
    designation: "Database",
    image: "/mongodb.jpg", // Fixed the URL format
  },
  {
    id: 6,
    name: "next",
    designation: "Framework",
    image: "/next.svg", // Fixed the URL format
  },
];

export default function AnimatedTooltipPreview2() {
  return (
    <div className="flex">
      <AnimatedTooltip items={people2} />
    </div>
  );
}
