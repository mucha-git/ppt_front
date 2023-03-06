import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, ContentState, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
//import "./textEditor.css";

export const TextEditor = ({ value, setFieldValue = (val) => {}, disabled = false }) => {
  const prepareDraft = (value) => {
    const draft = htmlToDraft(value);
    const contentState = ContentState.createFromBlockArray(draft.contentBlocks);
    const editorState = EditorState.createWithContent(contentState);
    return editorState;
  };

  const [editorState, setEditorState] = useState(
    value ? prepareDraft(value) : EditorState.createEmpty()
  );

  const onEditorStateChange = (editorState) => {
    const forFormik = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    );
    setFieldValue(forFormik);
    setEditorState(editorState);
  };
  return (
    <div>
      <Editor
        readOnly={disabled}
        toolbarHidden={disabled}
        editorState={editorState}
        wrapperClassName="custom-wrapper"
        editorClassName="custom-editor"
        onEditorStateChange={onEditorStateChange}
        toolbar={{
          inline: { options: ['bold', 'italic', 'underline']},
          blockType: { className: 'd-none'},
          fontSize: { className: 'd-none'},
          fontFamily: { className: 'd-none'},
          list: { className: 'd-none'},
          textAlign: { className: 'd-none'},
          colorPicker: { className: 'd-none'},
          link: { className: 'd-none'},
          emoji: { className: 'd-none'},
          image: { className: 'd-none'},
          embedded: { options: [], className: 'd-none'}
          }}
      />
    </div>
  );
};