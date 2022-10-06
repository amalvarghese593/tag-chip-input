import React, { useState } from "react";
import { useTagsInput } from "../hooks/useTagsInput";

export const Homepage = () => {
  const [initialTags, setInitialTags] = useState(["Apple", "Mango", "Orange"]);
  const {
    removeItem,
    addItem,
    getCurrentItem,
    currentIndex,
    currentTag,
    tags,
    DefaultUi,
  } = useTagsInput(initialTags);

  return (
    <>
      <div>{DefaultUi("Enter Fruits", true, 6)}</div>
    </>
  );
};
