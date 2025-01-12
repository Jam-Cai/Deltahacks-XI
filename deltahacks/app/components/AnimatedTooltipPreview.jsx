"use client";
import React from "react";
import { AnimatedTooltip } from "../ui/animated-tooltip";

const people = [
  {
    id: 1,
    name: "Jacob Fu",
    designation: "UW CFM",
    image: "/avatars/jacob.jpeg",
  },
  {
    id: 2,
    name: "James Cai",
    designation: "UW CS",
    image: "/avatars/james.jpg",
  },
  {
    id: 3,
    name: "Emma Li",
    designation: "MATH/BBA",
    image: "/avatars/emma.jpg",
  },
  {
    id: 4,
    name: "Johannes Tampere",
    designation: "UW CS",
    image: "/avatars/john.jpg",
  },
];

export default function AnimatedTooltipPreview() {
  return (
    <div className="flex">
      <AnimatedTooltip items={people} />
    </div>
  );
}
