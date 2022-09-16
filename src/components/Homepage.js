import React from "react";
import { useTagsInput } from "../hooks/useTagsInput";

export const Homepage = () => {
  const {
    removeItem,
    addItem,
    getCurrentItem,
    currentIndex,
    currentTag,
    tags,
    DefaultUi,
  } = useTagsInput();
  return (
    <div style={{ padding: "20px" }}>{DefaultUi("Enter Fruits", true)}</div>
  );
};
