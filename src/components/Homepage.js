import React, { useState, useRef } from "react";
import { TagChipInputNew } from "./TagChipInputNew";
// import { TagInput } from "./TagInput";
// import { TagsChipInput } from "./TagsChipInput";

export const Homepage = () => {
  const [tags, setTags] = useState(["Apple", "Mango", "Orange"]);
  const [error, setError] = useState("required field!");
  // const inputRef = useRef();
  const [touched, setTouched] = useState(false);

  const onChange = (e) => {};
  const onBlur = (e) => {
    setTouched(true);
  };
  const onKeyDown = (e) => {};
  const onHandleShow = (e) => {};
  return (
    <>
      <TagChipInputNew
        error={touched && error}
        value={tags}
        setTags={setTags}
        tagsLimit={6}
        placeholder="Enter fruits"
        isTagsInside
        label="Fruits"
        component={{
          CloseButton: CloseIcon,
        }}
        // isDefaultUi
        onBlur={onBlur}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onHandleShow={onHandleShow}
      />
      {/* <TagsChipInput
        error={error}
        value={tags}
        setTags={setTags}
        tagsLimit={6}
        placeholder="Enter fruits"
        isTagsInside
      /> */}
      {/* <TagInput
        onBlur={onBlur}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onHandleShow={onHandleShow}
        error={touched && error}
        value={tags}
        setTags={setTags}
        tagsLimit={6}
        placeholder="Enter fruits"
      >
        <TagInput.Label>Fruits</TagInput.Label>
        <TagInput.Tags>
          {tags.map((tag, idx) => (
            <TagInput.Tag key={idx} idx={idx} value={tag}>
              <TagInput.CloseBtn
                component={{
                  CloseButton: CloseIcon,
                }}
              />
            </TagInput.Tag>
          ))}
        </TagInput.Tags>
        <TagInput.ShowBtn inputRef={inputRef} />
        <TagInput.Input ref={inputRef} />
        <TagInput.Error />
      </TagInput> */}
    </>
  );
};

const CloseIcon = (props) => {
  return (
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
};
