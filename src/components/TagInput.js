import React, { useRef } from "react";
import { TagsContext, useTagsContext } from "../context/TagsContext";
import { useTagsInput } from "../hooks/useTagsInput";
import "./index.css";

export const TagInput = ({
  onBlur = () => {},
  onChange = () => {},
  onKeyDown = () => {},
  onHandleShow = () => {},
  error,
  value: tags,
  setTags,
  tagsLimit = 6,
  placeholder = "Enter",
  children,
}) => {
  const tagsInputCntrRef = useRef();
  const {
    removeItem,
    addItem,
    getCurrentItem,
    currentIndex,
    setCurrentIndex,
    currentTag,
    isShowTags,
    setIsShowTags,
  } = useTagsInput(tags, setTags, tagsInputCntrRef);

  return (
    <TagsContext.Provider
      value={{
        removeItem,
        tags,
        tagsLimit,
        isShowTags,
        onBlur,
        onChange,
        onKeyDown,
        onHandleShow,
        error,
        placeholder,
        addItem,
        getCurrentItem,
        currentIndex,
        setCurrentIndex,
        currentTag,
        setIsShowTags,
      }}
    >
      <div ref={tagsInputCntrRef}>{children}</div>
    </TagsContext.Provider>
  );
};
const Label = ({ children }) => <label>{children}</label>;
TagInput.Label = Label;

const Tags = ({ children }) => <>{children}</>;
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

const ShowBtn = ({ inputRef }) => {
  const {
    tags,
    tagsLimit,
    onHandleShow,
    isShowTags,
    setIsShowTags,
    setCurrentIndex,
  } = useTagsContext();
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

const Input = React.forwardRef((_, ref) => {
  const {
    placeholder,
    currentTag,
    addItem,
    getCurrentItem,
    tagsLimit,
    onChange,
    onBlur,
    onKeyDown,
  } = useTagsContext();

  const handleKeyDown = (e) => {
    addItem(e, tagsLimit);
    onKeyDown(e);
  };
  const handleChange = (e) => {
    getCurrentItem(e);
    onChange(e);
  };
  return (
    <input
      ref={ref}
      type="text"
      placeholder={placeholder}
      value={currentTag}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onBlur={onBlur}
    />
  );
});
TagInput.Input = Input;

const Error = () => {
  const { error, tags } = useTagsContext();
  return error && !tags.length ? (
    <span className="field-error">{error}</span>
  ) : undefined;
};
TagInput.Error = Error;
