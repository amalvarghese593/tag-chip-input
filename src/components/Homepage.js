import React, { useState, useRef } from "react";
import { TagInput } from "./TagInput";
import { TagsChipInput } from "./TagsChipInput";

export const Homepage = () => {
  const [initialTags, setInitialTags] = useState(["Apple", "Mango", "Orange"]);
  const [error, setError] = useState("Required field!");
  const inputRef = useRef();

  const onChange = (e) => console.log("change", e);
  const onBlur = (e) => console.log("blur", e);
  const onKeyDown = (e) => console.log("keydown", e);
  const onHandleShow = (e) => console.log("handle show", e);
  return (
    <>
      {/* <TagsChipInput
        onBlur={onBlur}
        onChange={onChange}
        error={error}
        initialValues={initialTags}
        tagsLimit={6}
        placeholder="Enter fruits"
        isTagsInside
      /> */}
      <TagInput
        onBlur={onBlur}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onHandleShow={onHandleShow}
        error={error}
        initialValues={initialTags}
        tagsLimit={6}
        placeholder="Enter fruits"
        isTagsInside
      >
        <TagInput.Tags>
          {(tags) =>
            tags.map((tag, idx) => (
              <TagInput.Tag key={idx} idx={idx} value={tag}>
                <TagInput.CloseBtn
                  component={{
                    CloseButton: CloseIcon,
                  }}
                />
              </TagInput.Tag>
            ))
          }
        </TagInput.Tags>
        <TagInput.ShowBtn inputRef={inputRef} />
        <TagInput.Input ref={inputRef} />
        <TagInput.Error />
      </TagInput>
    </>
  );
};

//onblur, onchange, error, initialvalues, useDefaultUi

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
