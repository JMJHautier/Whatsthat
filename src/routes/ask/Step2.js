import React, {useEffect} from "react";
import Prism from "prismjs";
import './codeEditor.css';
import './prism.css'
import { useForm } from "react-hook-form";
import ReactQuill, {Quill} from 'react-quill'; 
import 'react-quill/dist/quill.snow.css';

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

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="submit" onClick={prevFormStep} value="previous"/>
      {/*Using quill to select bits of text. I leave it here for reference, but it is no longer useful */}
      {/* <ReactQuill theme={null}
                  defaultValue={content}
                  onChangeSelection={onChangeSelection}
      /> */}

      <pre className="line-numbers">
        <code
         onMouseUp={()=>setWhatsthat(window.getSelection().toString())}
         className={`language-${language}`}>
            {content}
         </code>
      </pre>

      <pre> {JSON.stringify(watch(), null, 2)}</pre>
      <p> you have selected: <strong>{whatsthat}</strong></p>

      {/* <p> You have selected:</p> */}

      <input
        hidden="true"
         disabled="true"
         {...register("Whatsthat", { required: {value: true, message:"Please pick a word" }})} value={whatsthat}
         />
         {errors.Whatsthat && <p>{errors.Whatsthat.message}</p>}

      {whatsthat && 
      (<input 
         type="submit" 
         onClick={nextFormStep} 
         value="What's that"/>)}
    </form>

  );
};

export default Step2;