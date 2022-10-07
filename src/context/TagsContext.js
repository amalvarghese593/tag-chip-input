import { createContext, useContext } from "react";

export const TagsContext = createContext({ removeItem: () => {} });
export const useTagsContext = () => useContext(TagsContext);
