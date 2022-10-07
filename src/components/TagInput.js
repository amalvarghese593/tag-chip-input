import React, { useRef, useState } from "react";
import { TagsContext, useTagsContext } from "../context/TagsContext";
import { useTagsInput } from "../hooks/useTagsInput";
import "./index.css";

export const TagInput = ({
  onBlur = () => {},
  onChange = () => {},
  onKeyDown = () => {},
  onHandleShow = () => {},
  error,
  initialValues = [],
  tagsLimit = 6,
  placeholder = "Enter",
  isTagsInside = true,
  children,
}) => {
  const tagsInputCntrRef = useRef();
  const [isTouched, setIsTouched] = useState(false);
  const {
    removeItem,
    addItem,
    getCurrentItem,
    currentIndex,
    setCurrentIndex,
    currentTag,
    tags,
    isShowTags,
    setIsShowTags,
    // DefaultUi,
  } = useTagsInput(initialValues, tagsInputCntrRef);

  React.useEffect(() => {
    console.log({ isShowTags });
  }, [isShowTags]);

  return (
    <TagsContext.Provider value={{ removeItem, tags, tagsLimit, isShowTags }}>
      <div style={{ border: "1px solid red" }} ref={tagsInputCntrRef}>
        {React.Children.map(children, (el, idx) =>
          React.cloneElement(el, {
            onBlur,
            onChange,
            onKeyDown,
            onHandleShow,
            error,
            initialValues,
            tagsLimit,
            placeholder,
            isTagsInside,
            // removeItem,
            addItem,
            getCurrentItem,
            currentIndex,
            setCurrentIndex,
            currentTag,
            tags,
            isShowTags,
            setIsShowTags,
            isTouched,
            setIsTouched,
          })
        )}
      </div>
    </TagsContext.Provider>
  );
};

const Tags = ({ tags, children }) => {
  return children(tags);
};
TagInput.Tags = Tags;

const Tag = ({ value, idx, children }) => {
  const { tags, tagsLimit, isShowTags } = useTagsContext();
  return (
    <span
      className="tag-item"
      data-hidden={!isShowTags && tags.length - idx > tagsLimit ? "hide" : ""}
    >
      {value}
      <span>
        {React.Children.map(children, (el) =>
          React.cloneElement(el, { value })
        )}
      </span>
    </span>
  );
};
TagInput.Tag = Tag;

const CloseBtn = ({ component: Component, value }) => {
  const { removeItem } = useTagsContext();
  const hasComponent = Component?.hasOwnProperty("CloseButton");
  return hasComponent ? (
    <Component.CloseButton onClick={() => removeItem(value)} />
  ) : (
    <span onClick={() => removeItem(value)}>x</span>
  );
};
TagInput.CloseBtn = CloseBtn;

const ShowBtn = ({
  tags,
  tagsLimit,
  onHandleShow,
  isShowTags,
  setIsShowTags,
  setCurrentIndex,
  inputRef,
}) => {
  const handleClick = (e) => {
    onHandleShow(e);
    setIsShowTags((prev) => !prev);
    inputRef.current?.focus();
    setCurrentIndex(undefined);
  };
  return (
    tags.length > tagsLimit && (
      <button onClick={handleClick}>
        Show {!isShowTags ? "more" : "less"}...
      </button>
    )
  );
};
TagInput.ShowBtn = ShowBtn;

const Input = React.forwardRef((props, ref) => {
  const {
    placeholder,
    currentTag,
    addItem,
    getCurrentItem,
    tagsLimit,
    onChange,
    onBlur,
    onKeyDown,
    setIsTouched,
  } = props;
  const handleKeyDown = (e) => {
    addItem(e, tagsLimit);
    onKeyDown(e);
  };
  const handleChange = (e) => {
    getCurrentItem(e);
    onChange(e);
  };
  const handleBlur = (e) => {
    onBlur(e);
    setIsTouched(true);
  };
  return (
    <input
      ref={ref}
      type="text"
      placeholder={placeholder}
      value={currentTag}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      //   className="tag-input"
    />
  );
});
TagInput.Input = Input;

const Error = ({ error, isTouched, tags }) => {
  return isTouched && !tags.length ? (
    <span style={{ color: "red", fontSize: "12px" }}>{error}</span>
  ) : undefined;
};
TagInput.Error = Error;
