import React, {useEffect} from "react";
import Prism from "prismjs";
import './codeEditor.css';
import './prism.css'
import { useForm } from "react-hook-form";
import ReactQuill, {Quill} from 'react-quill'; 
import 'react-quill/dist/quill.snow.css';

const Step3 = ({language, content, setContent, onSubmit, prevFormStep, whatsthat, setWhatsthat, nextFormStep}) => {

   const { register, handleSubmit, watch, formState: { errors, isValid} } = useForm({mode:"all"});


  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="submit" onClick={prevFormStep} value="previous"/>
      <p> Whats that: {whatsthat}</p>
      <pre className="line-numbers">
        <code
         className={`language-${language}`}>
            {content}
         </code>
      </pre>

      <pre> {JSON.stringify(watch(), null, 2)}</pre>
  
      {/* <p> You have selected:</p> */}

    </form>)

      }

      export default Step3;