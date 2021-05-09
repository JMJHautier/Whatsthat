import React, { useState, useEffect } from "react";
import Prism from "prismjs";
import './codeEditor.css';
import './prism.css'
import { useForm, control, Controller } from "react-hook-form";
import {TextField, Button} from '@material-ui/core';


const Step1 = ({language, content, setContent, onSubmit, setLanguage, nextFormStep}) => {

  const { register, handleSubmit, control, watch, formState: { errors, isValid} } = useForm({mode:"all", defaultValues:{language:'javascript'}});

  const handleKeyDown = evt => {
    let value = content,
      selStartPos = evt.currentTarget.selectionStart;

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
    console.log(language)
  }, [language, content]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
            {/* register your input into the hook by invoking the "register" function */}

                  <fieldset {...register("language",{required:{value:true, message:"Please pick language"}})}>
                        <legend>Choose language:</legend>
                        <input
                        type="radio"
                        id="javascript"
                        name="language"
                        value="javascript"
                        checked={language === "javascript"}
                        onChange={() => setLanguage("javascript")}
                        defaultChecked="true"
                        />
                        <label htmlFor="javascript">JavaScript</label>
                        <input
                        type="radio"
                        id="xml"
                        name="language"
                        value="markup"
                        checked={language === "markup"}
                        onChange={() => setLanguage("markup")}
                        />
                        <label htmlFor="Html">HTML</label>
                        <input
                        type="radio"
                        id="css"
                        name="language"
                        value="css"
                        checked={language === "css"}
                        onChange={() => setLanguage("css")}
                        />
                        <label htmlFor="css">CSS</label>
                  </fieldset>
            {/* include validation with required or other standard HTML validation rules */}
            {errors.code && <p>{errors.code.message}</p>}

    {/* < className="code-edit-container"> */}

      <Controller
        name="code"
        control={control}
        defaultValue=""
        rules={{required:{value:true, message:"Please insert code"}}}
        onChange={evt => setContent(evt.target.value)}
        onKeyDown={handleKeyDown}
        value={content}
        render={({field:{onChange, handleKeyDown, content}, fieldState:{error}})=> (
          <TextField
          label="copy your code here!"
          multiline
          rowsMax={10}
          fullWidth
          value={content}
          onChange={onChange}
          error={!!error}
          helperText={error?error.message:null}
          onKeyDown={handleKeyDown}
          variant="outlined"
        />


        )}/> 

      {/* <textarea
      {...register("code", {required:{value:true, message:"Please insert code",}})}
        className="code-input"
        value={content}
        onChange={evt => setContent(evt.target.value)}
        onKeyDown={handleKeyDown}
      /> */}
      <pre className="line-numbers">
        <code className={`language-${language}`}>{watch('code')}</code>
      </pre>
    
    <pre> {JSON.stringify(watch(), null, 2)}</pre>
    <input disabled={!isValid} type="submit" onClick={() => {setContent(watch('code'));nextFormStep()}} value="Next"/>
    </form>

  );
};

export default Step1;