import React, {useEffect} from "react";
import Prism from "prismjs";
import './codeEditor.css';
import './prism.css'
import { useForm } from "react-hook-form";
// import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css';
import {Button} from '@material-ui/core';
import useStyles from './styles.js'



const Step2 = ({language, content, setContent, onSubmit, prevFormStep, whatsthat, setWhatsthat, nextFormStep}) => {

const { register, handleSubmit, watch, formState: { errors, isValid} } = useForm({mode:"all"});
//  const breakdown = Quill.getEditor();
//  console.log(breakdown);
//? Using quill to select bits of text. I leave it here for reference, but it is no longer useful
  //  const onChangeSelection = (range, source, editor) => {
  //    if(range) {
  //     const selection = editor.getSelection();
  //     const text = editor.getText();
  //     if(whatsthat) {
  //       setWhatsthat('');
  //     }
  //     setWhatsthat(text.substring(selection.index, selection.length))
  //    } 
  //  }
  const classes= useStyles();
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Button className={classes.smallbutton} variant="contained" size="large" color="primary" onClick={prevFormStep}> Previous </Button>

      {/*Using quill to select bits of text. I leave it here for reference, but it is no longer useful */}
      {/* <ReactQuill theme={null}
                  defaultValue={content}
                  onChangeSelection={onChangeSelection}
      /> */}

      <pre className="line-numbers">
        <code
        onMouseUp={()=>setWhatsthat(window.getSelection().toString().trim())}
        className={`language-${language}`}>

        {content}
        </code>
      </pre>

      <h3 style={{width:'55vw'}}> you have selected: <span class="highlight" style={{color:"white"}}>{whatsthat}</span></h3>
      <input
        hidden="true"
        disabled="true"
        {...register("Whatsthat", { required: {value: true, message:"Please pick a word" }})} value={whatsthat}
        />
        {errors.Whatsthat && <p>{errors.Whatsthat.message}</p>}

      {whatsthat && 
      (
        <Button className={classes.button} variant="contained" size="large" color="primary"  onClick={nextFormStep}>
           What's that? </Button>)
      }
    </form>

  );
};

export default Step2;