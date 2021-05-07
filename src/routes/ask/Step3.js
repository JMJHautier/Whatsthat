import React, {useEffect, useRef} from "react";
import Prism, { highlight } from "prismjs";
import './codeEditor.css';
import './prism.css'
import { useForm } from "react-hook-form";
import ReactQuill, {Quill} from 'react-quill'; 
import 'react-quill/dist/quill.snow.css';
import {useContext} from 'react'; 
import {AuthContext} from '../../context/AuthContext.js'; 


// import HighlightText from '../../components/highlight.js'

const Step3 = ({language, content, setContent, prevFormStep, whatsthat, setWhatsthat, nextFormStep, setOnlineId}) => {

   const { register, handleSubmit, watch, formState: { errors, isValid} } = useForm({mode:"all"});
   const {user, getUser} = useContext(AuthContext); 
  const {_id}= user 
  const serverLink = process.env.ORIGIN || "http://localhost:3001";

   const code = useRef();

  useEffect(() => {
    Prism.highlightAll();
    // <HighlightText text={whatsthat}/>;
    highlight(whatsthat)
  }, []);

  const highlight = (text) => {
    let innerHTML = code.current.innerHTML;
    console.log(code)
    console.log(innerHTML)
    const index = innerHTML.indexOf(text);
    console.log(index);
    if (index >= 0) { 
     innerHTML = innerHTML.substring(0,index) + "<span class='highlight'>" + innerHTML.substring(index,index+text.length) + "</span>" + innerHTML.substring(index + text.length);
     code.current.innerHTML = innerHTML;
    
    }
 
  }
  
const onSubmit = async (event) => {
  const newAsk = {
    body: content,
    whatsthat: whatsthat,
    language: language,
    author: _id
  }
  console.log(newAsk);
  event.preventDefault()
  const options = {
        method: 'POST',
        body: JSON.stringify(newAsk),
        headers: {
          'Content-Type': 'application/json'
        }
      }

  try {
    const response = await fetch(`${serverLink}/ask/`, options)
    const data = await response.json()
    console.log(data) 
    setOnlineId(data.newAsk["_id"])
    getUser();
    nextFormStep()
  } catch (error) {console.log(error)}

}

  return (
    <form onSubmit={onSubmit}>
      <input type="submit" onClick={prevFormStep} value="previous"/>
      <h3> What is  </h3>
      <h3><span class="highlight">{whatsthat}</span></h3>
      <h3> in my code: </h3>
      <pre className="line-numbers" >
        <code ref={code}
          className={`language-${language}`}>
            {content}
         </code>
      </pre>

      {/* <pre> {JSON.stringify(watch(), null, 2)}</pre> */}
    <input type="submit" onClick={onSubmit} value="submit"/>

    </form>)

      }

      export default Step3;