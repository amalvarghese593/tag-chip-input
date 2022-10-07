import React from "react";
import { useTagsInput } from "../hooks/useTagsInput";

export const TagsChipInput = ({
  onBlur = () => {},
  onChange = () => {},
  error,
  initialValues = [],
  tagsLimit = 6,
  placeholder = "Enter",
  isTagsInside = true,
}) => {
  const {
    removeItem,
    addItem,
    getCurrentItem,
    currentIndex,
    currentTag,
    tags,
    DefaultUi,
  } = useTagsInput(initialValues);
  return (
    <>
      <div>{DefaultUi(placeholder, isTagsInside, tagsLimit)}</div>
      {error && <span className="field-error">{error}</span>}
    </>
  );
};
