"use client";
import dynamic from "next/dynamic";

const AddToCalendarButton = dynamic(
  () => import("add-to-calendar-button-react").then(mod => mod.AddToCalendarButton),
  { ssr: false }
);

export default AddToCalendarButton; 