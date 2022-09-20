export const useKeyDownEventHandler = () => {
  const addItem = (
    e,
    tagsCountLimit,
    currentTag,
    setCurrentTag,
    tags,
    setTags,
    currentIndex,
    setCurrentIndex,
    isShowTags,
    setIsShowTags
  ) => {
    if (e.key === "Enter" && currentTag) {
      setTags((prev) => {
        if (currentTag.includes(",")) {
          const currentItems = currentTag.split(",");
          const arr = [];
          currentItems.forEach((el) => {
            const trimmedItem = el.trim();
            if (trimmedItem && !tags.includes(trimmedItem)) {
              arr.push(trimmedItem);
            }
          });
          return arr.length ? [...prev, ...arr] : prev;
          // return arr.length ? [...arr, ...prev] : prev;
        }
        const trimmedTag = currentTag.trim();
        return !trimmedTag || prev.includes(trimmedTag)
          ? prev
          : [...prev, trimmedTag];
        // : [trimmedTag, ...prev];
      });
      setCurrentTag("");
    } else if (e.key === "Enter" && !currentTag && currentIndex !== undefined) {
      setTags((prev) => prev.filter((el, idx) => idx !== currentIndex));
    } else if (e.key === ",") {
      setTags(
        (prev) =>
          !currentTag || prev.includes(currentTag)
            ? prev
            : [...prev, currentTag]
        // !currentTag || prev.includes(currentTag) ? prev : [currentTag, ...prev]
      );
      setTimeout(() => setCurrentTag(""), 10);
    } else if (e.key === "ArrowLeft" && !currentTag && tags.length) {
      if (isShowTags) {
        setCurrentIndex((prev) => (prev ? prev - 1 : tags.length - 1));
      } else {
        setCurrentIndex((prev) =>
          prev
            ? prev > tags.length - tagsCountLimit
              ? prev - 1
              : tags.length - 1
            : tags.length - 1
        );
      }
    } else if (e.key === "ArrowRight" && !currentTag && tags.length) {
      if (isShowTags) {
        setCurrentIndex((prev) =>
          prev !== undefined && prev < tags.length - 1 ? prev + 1 : 0
        );
      } else {
        setCurrentIndex((prev) =>
          prev !== undefined && prev < tags.length - 1
            ? prev + 1
            : tags.length - tagsCountLimit > 0
            ? tags.length - tagsCountLimit
            : 0
        );
      }
    } else if (e.key === "Escape") {
      setIsShowTags(false);
    }
  };

  return { addItem };
};
