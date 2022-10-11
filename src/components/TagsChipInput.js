import React from "react";
import { useTagsInput } from "../hooks/useTagsInput";

export const TagsChipInput = ({
  error,
  value: tags = [],
  setTags = () => {},
  tagsLimit = 6,
  placeholder = "Enter",
  isTagsInside = true,
}) => {
  const { DefaultUi } = useTagsInput(tags, setTags, undefined, error);
  return <>{DefaultUi(placeholder, isTagsInside, tagsLimit)}</>;
};
