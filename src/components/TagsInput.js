import React, { useState, useEffect, useRef, useCallback } from "react";

export const TagsInput = () => {
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");
  // const tagsRef = useRef([]);
  const [currentIndex, setCurrentIndex] = useState();
  useEffect(() => {
    console.log({ currentIndex });
  }, [currentIndex]);
  const getCurrentItem = (e) => {
    console.log("onchange");

    setCurrentTag(e.target.value);
  };

  const addItem = (e) => {
    if (e.key === "Enter" && currentTag) {
      setTags((prev) => {
        if (currentTag.includes(",")) {
          const currentItems = currentTag.split(",");
          const arr = [];
          currentItems.forEach((el) => {
            const trimmedItem = el.trim();
            if (trimmedItem && !tags.includes(trimmedItem))
              arr.push(trimmedItem);
          });
          return arr.length ? [...prev, ...arr] : prev;
        }
        const trimmedTag = currentTag.trim();
        return !trimmedTag || prev.includes(trimmedTag)
          ? prev
          : [...prev, trimmedTag];
      });
      setCurrentTag("");
    } else if (e.key === "Enter" && !currentTag && currentIndex !== undefined) {
      setTags((prev) => {
        console.log("remove item", currentIndex);
        return prev.filter((el, idx) => idx !== currentIndex);
      });
    } else if (e.key === ",") {
      console.log("comma keydown");
      setTags((prev) => {
        const splicedTag = currentTag.slice(0, -1);
        return !splicedTag || prev.includes(splicedTag)
          ? prev
          : [...prev, splicedTag];
      });
      setTimeout(() => {
        setCurrentTag("");
      }, 10);
    } else if (e.key === "ArrowLeft" && !currentTag && tags.length) {
      setCurrentIndex((prev) => (prev ? prev - 1 : tags.length - 1));
    } else if (e.key === "ArrowRight" && !currentTag && tags.length) {
      setCurrentIndex((prev) =>
        prev !== undefined && prev < tags.length - 1 ? prev + 1 : 0
      );
    }
  };

  const removeItem = (item) => {
    setTags((prev) => prev.filter((el) => el !== item));
  };
  return (
    <div className="tags-container bdr">
      {tags.map((el, idx) => (
        <span
          key={idx}
          className={`${idx === currentIndex ? "highlight" : ""}`}
        >
          {el}
          <CloseIcon onClick={() => removeItem(el)} />
        </span>
      ))}
      <input
        type="text"
        placeholder="Enter tags"
        name="tags"
        value={currentTag}
        onChange={getCurrentItem}
        onKeyDown={addItem}
      />
    </div>
  );
};

const CloseIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-x-lg"
    viewBox="0 0 16 16"
  >
    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
  </svg>
);
