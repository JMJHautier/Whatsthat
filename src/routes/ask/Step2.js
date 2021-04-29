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

   const onChangeSelection = (range, source, editor) => {
     if(range) {
      const selection = editor.getSelection();
      const text = editor.getText();
      setWhatsthat(text.substring(selection.index, selection.length))
     } 
   }

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="submit" onClick={prevFormStep} value="previous"/>

      <ReactQuill defaultValue={content}
                  onChangeSelection={onChangeSelection}
      />

      <pre className="line-numbers">
        <code
         onSelect={(event)=>{setWhatsthat(event.target.value); console.log(whatsthat)}}
         className={`language-${language}`}>
            {content}
         </code>
      </pre>

      <pre> {JSON.stringify(watch(), null, 2)}</pre>
  
      <p> You have selected:</p>

      <input
         disabled="true"
         {...register("Whatsthat", { required: {value: true, message:"Please pick a word" }})} value={whatsthat}
         />
         {errors.Whatsthat && <p>{errors.Whatsthat.message}</p>}

      <input 
         disabled={!isValid} 
         type="submit" 
         onClick={nextFormStep} 
         value="What's that"/>
    </form>

  );
};

export default Step2;