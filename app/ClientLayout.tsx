"use client";
import React from "react";
import BackgroundSparkles from "../components/BackgroundSparkles";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BackgroundSparkles />
      {children}
    </>
  );
}
