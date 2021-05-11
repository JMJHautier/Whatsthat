import React, { useState, useEffect,Fragment } from "react";
import Prism from "prismjs";
import './codeEditor.css';
import './prism.css'
import { useForm, control, Controller } from "react-hook-form";
import {TextField, Button, RadioGroup, FormControl, FormLabbel, FormControlLabel, Radio, FormLabel} from '@material-ui/core';
import useStyles from './styles.js'

const Step1 = ({language, content, setContent, onSubmit, setLanguage, nextFormStep}) => {

  const { register, handleSubmit, control, watch, formState: { errors, isValid} } = useForm({mode:"all", defaultValues:{language:'javascript'}});
  
  const classes = useStyles();

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
    if(!language) {setLanguage('javascript')}

  }, [language, content]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

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
        <FormControl component="fieldset" style={{marginTop:"32px"}}>
        <FormLabel color="secondary" component="label" filled={true} focused={true} style={{color:"white"}}> What is the language of your code?</FormLabel>
        <Controller
        name="language"
        control={control}
        defaultValue="javascript"
        rules={{required:{value:true, message:"Please pick language"}}}
        setValue={language}
        render={({field:{}, fieldState:{error}})=> (
  
          <RadioGroup name="language" onChange={(event)=>setLanguage(event.target.value)} 
          error={!!error}
          helperText={error?error.message:null}
          row> 
            <FormControlLabel value="javascript" control={<Radio />} label="Javascript"/>
            <FormControlLabel value="HTML" control={<Radio />} label="HTML" />
            <FormControlLabel value="CSS" control={<Radio />} label="CSS" />
          </RadioGroup>
                )}/>
      </FormControl> 



      {watch('code')&& 
      (<Fragment> <h4>Preview</h4>
      <pre className={`language-${language}`}>
        <code className={`language-${language}`}>{watch('code')}</code>
      </pre></Fragment> )}
    
      <Button className={classes.button} variant="contained" size="large" color="primary" disabled={!isValid} onClick={() => {setContent(watch('code'));nextFormStep()}}> Next </Button>
    </form>


  );
};

export default Step1;