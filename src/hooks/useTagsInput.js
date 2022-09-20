import React, { useState, useEffect, useRef } from "react";
import "./index.css";
import { useKeyDownEventHandler } from "./useKeyDownEventHandler";

export const useTagsInput = () => {
  const tagsWrapperRef = useRef();
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");
  // const tagsRef = useRef([]);
  const [currentIndex, setCurrentIndex] = useState();

  const [isShowTags, setIsShowTags] = useState(false);
  const { addItem } = useKeyDownEventHandler();
  // currentTag,
  // setCurrentTag,
  // tags,
  // setTags,
  // currentIndex,
  // setCurrentIndex,
  // isShowTags,
  // setIsShowTags

  //to prevent newly added tag from getting highlighted
  useEffect(() => {
    if (!tags.length || currentIndex > tags.length - 1)
      setCurrentIndex(undefined);
  }, [tags]);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (!tagsWrapperRef.current.contains(e.target)) {
        setIsShowTags(false);
      }
    };
    document.addEventListener("click", onClickOutside);
    return () => {
      document.removeEventListener("click", onClickOutside);
    };
  }, []);

  const getCurrentItem = (e) => {
    setCurrentTag(e.target.value);
    if (isShowTags) {
      setIsShowTags(false);
    }
  };
  // const addItem = (e, tagsCountLimit) => {
  //   if (e.key === "Enter" && currentTag) {
  //     setTags((prev) => {
  //       if (currentTag.includes(",")) {
  //         const currentItems = currentTag.split(",");
  //         const arr = [];
  //         currentItems.forEach((el) => {
  //           const trimmedItem = el.trim();
  //           if (trimmedItem && !tags.includes(trimmedItem)) {
  //             arr.push(trimmedItem);
  //           }
  //         });
  //         return arr.length ? [...prev, ...arr] : prev;
  //         // return arr.length ? [...arr, ...prev] : prev;
  //       }
  //       const trimmedTag = currentTag.trim();
  //       return !trimmedTag || prev.includes(trimmedTag)
  //         ? prev
  //         : [...prev, trimmedTag];
  //       // : [trimmedTag, ...prev];
  //     });
  //     setCurrentTag("");
  //   } else if (e.key === "Enter" && !currentTag && currentIndex !== undefined) {
  //     setTags((prev) => prev.filter((el, idx) => idx !== currentIndex));
  //   } else if (e.key === ",") {
  //     setTags(
  //       (prev) =>
  //         !currentTag || prev.includes(currentTag)
  //           ? prev
  //           : [...prev, currentTag]
  //       // !currentTag || prev.includes(currentTag) ? prev : [currentTag, ...prev]
  //     );
  //     setTimeout(() => setCurrentTag(""), 10);
  //   } else if (e.key === "ArrowLeft" && !currentTag && tags.length) {
  //     if (isShowTags) {
  //       setCurrentIndex((prev) => (prev ? prev - 1 : tags.length - 1));
  //     } else {
  //       setCurrentIndex((prev) =>
  //         prev
  //           ? prev > tags.length - tagsCountLimit
  //             ? prev - 1
  //             : tags.length - 1
  //           : tags.length - 1
  //       );
  //     }
  //   } else if (e.key === "ArrowRight" && !currentTag && tags.length) {
  //     if (isShowTags) {
  //       setCurrentIndex((prev) =>
  //         prev !== undefined && prev < tags.length - 1 ? prev + 1 : 0
  //       );
  //     } else {
  //       setCurrentIndex((prev) =>
  //         prev !== undefined && prev < tags.length - 1
  //           ? prev + 1
  //           : tags.length - tagsCountLimit > 0
  //           ? tags.length - tagsCountLimit
  //           : 0
  //       );
  //     }
  //   } else if (e.key === "Escape") {
  //     setIsShowTags(false);
  //   }
  // };

  const removeItem = (item) => {
    setTags((prev) => prev.filter((el) => el !== item));
  };

  const DefaultUi = (
    placeholder = "Enter something",
    isTagsInside = false,
    tagsCountLimit = 6
  ) => (
    <div ref={tagsWrapperRef}>
      <div className="tags-cntr tags-d-flex">
        {isTagsInside && (
          <Tags
            tags={tags}
            currentIndex={currentIndex}
            removeItem={removeItem}
            isShowTags={isShowTags}
            setIsShowTags={setIsShowTags}
            tagsCountLimit={tagsCountLimit}
          />
        )}
        <input
          type="text"
          placeholder={placeholder}
          value={currentTag}
          onChange={getCurrentItem}
          onKeyDown={(e) =>
            addItem(
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
            )
          }
          className="tag-input"
        />
      </div>
      {!isTagsInside && (
        <div className="tags-d-flex">
          <Tags
            tags={tags}
            currentIndex={currentIndex}
            removeItem={removeItem}
            isShowTags={isShowTags}
            setIsShowTags={setIsShowTags}
            tagsCountLimit={tagsCountLimit}
          />
        </div>
      )}
    </div>
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

const Tags = ({
  tags,
  currentIndex,
  removeItem,
  isShowTags,
  setIsShowTags,
  tagsCountLimit,
}) => (
  <>
    {tags.map((el, idx) => (
      <span
        key={idx}
        className={`tag-chip ${idx === currentIndex ? "highlight" : ""}`}
        data-hidden={
          !isShowTags && tags.length - idx > tagsCountLimit ? "hide" : ""
        }
      >
        {el}
        <CloseIcon onClick={() => removeItem(el)} />
      </span>
    ))}
    {tags.length > tagsCountLimit && (
      <button onClick={() => setIsShowTags((prev) => !prev)}>
        Show {!isShowTags ? "more" : "less"}...
      </button>
    )}
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

// const withMoreBtn = (Comp) => {
//   return ({ isShowTags, setIsShowTags }) => (
//     <>
//       <Comp />
//       <button onClick={() => setIsShowTags((prev) => !prev)}>
//         Show{!isShowTags ? "more" : "less"}
//       </button>
//     </>
//   );
// };

// const TagsWithMoreBtn = withMoreBtn(Tags);
