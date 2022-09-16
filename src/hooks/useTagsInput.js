import React, { useState, useEffect } from "react";
import "./index.css";

export const useTagsInput = () => {
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");
  // const tagsRef = useRef([]);
  const [currentIndex, setCurrentIndex] = useState();

  //to prevent newly added tag from getting highlighted
  useEffect(() => {
    if (!tags.length || currentIndex > tags.length - 1)
      setCurrentIndex(undefined);
  }, [tags]);

  const getCurrentItem = (e) => {
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
            if (trimmedItem && !tags.includes(trimmedItem)) {
              arr.push(trimmedItem);
            }
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
      setTags((prev) => prev.filter((el, idx) => idx !== currentIndex));
    } else if (e.key === ",") {
      setTags((prev) =>
        !currentTag || prev.includes(currentTag) ? prev : [...prev, currentTag]
      );
      setTimeout(() => setCurrentTag(""), 10);
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

  const DefaultUi = (placeholder = "Enter something", isTagsInside = false) => (
    <>
      <div className="tags-cntr tags-d-flex">
        {isTagsInside && <Tags {...{ tags, currentIndex, removeItem }} />}
        <input
          type="text"
          placeholder={placeholder}
          value={currentTag}
          onChange={getCurrentItem}
          onKeyDown={addItem}
          className="tag-input"
        />
      </div>
      {!isTagsInside && (
        <div className="tags-d-flex">
          <Tags {...{ tags, currentIndex, removeItem }} />
        </div>
      )}
    </>
  );

  return {
    removeItem,
    addItem,
    getCurrentItem,
    currentIndex,
    currentTag,
    tags,
    DefaultUi,
  };
};

const Tags = ({ tags, currentIndex, removeItem }) => (
  <>
    {tags.map((el, idx) => (
      <span
        key={idx}
        className={`tag-chip ${idx === currentIndex ? "highlight" : ""}`}
      >
        {el}
        <CloseIcon onClick={() => removeItem(el)} />
      </span>
    ))}
  </>
);

const CloseIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="13"
    height="13"
    fill="currentColor"
    className="bi bi-x-lg close"
    viewBox="0 0 16 16"
  >
    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
  </svg>
);
