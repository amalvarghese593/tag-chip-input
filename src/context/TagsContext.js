import { createContext, useContext } from "react";

export const TagsContext = createContext({
  removeItem: () => {},
  tags: [],
  tagsLimit: 6,
  isShowTags: true,
  onBlur: () => {},
  onChange: () => {},
  onKeyDown: () => {},
  onHandleShow: () => {},
  error: undefined,
  placeholder: "",
  addItem: () => {},
  getCurrentItem: () => {},
  currentIndex: undefined,
  setCurrentIndex: () => {},
  currentTag: "",
  setIsShowTags: () => {},
});
export const useTagsContext = () => useContext(TagsContext);
