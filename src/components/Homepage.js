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
    <>
      <div>{DefaultUi("Enter Fruits", true, 6)}</div>
    </>
  );
};
