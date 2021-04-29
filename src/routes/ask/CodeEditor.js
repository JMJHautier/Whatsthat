import React, { useState, useEffect } from "react";
import Prism from "prismjs";
import './codeEditor.css';
import './prism.css'
// import { useForm } from "react-hook-form";

const CodeEditor = ({language, content, setContent}) => {

  // const { register, handleSubmit, watch, formState: { errors, isValid} } = useForm({mode:"all"});

  const handleKeyDown = evt => {
    let value = content,
      selStartPos = evt.currentTarget.selectionStart;

    console.log(evt.currentTarget);

    // handle 4-space indent on
    if (evt.key === "Tab") {
      value =
        value.substring(0, selStartPos) +
        "    " +
        value.substring(selStartPos, value.length);
      evt.currentTarget.selectionStart = selStartPos + 3;
      evt.currentTarget.selectionEnd = selStartPos + 4;
      evt.preventDefault();

      setContent(value);
    }
  };

  useEffect(() => {
    Prism.highlightAll();
  }, [language, content]);

  return (
    <div className="code-edit-container">
      <textarea
      // {...register("code2",{required:{value:true, message:"Please insert code",}})}
        className="code-input"
        value={content}
        onChange={evt => setContent(evt.target.value)}
        onKeyDown={handleKeyDown}
      />
      <pre className="line-numbers">
        <code className={`language-${language}`}>{content}</code>
      </pre>
    </div>
  );
};

export default CodeEditor;