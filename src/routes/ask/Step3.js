import React, {useEffect, useRef} from "react";
import Prism, { highlight } from "prismjs";
import './codeEditor.css';
import './prism.css'
import { useForm } from "react-hook-form";
import 'react-quill/dist/quill.snow.css';
import {useContext} from 'react'; 
import {AuthContext} from '../../context/AuthContext.js'; 
import {Button} from '@material-ui/core'
import useStyles from './styles.js'


const Step3 = ({language, content, setContent, prevFormStep, whatsthat, setWhatsthat, nextFormStep, setOnlineId}) => {

   const { register, handleSubmit, watch, formState: { errors, isValid} } = useForm({mode:"all"});
   const {user, getUser} = useContext(AuthContext); 
  const {_id}= user 
  const classes= useStyles();
  const serverLink = process.env.REACT_APP_ORIGIN || "http://localhost:3001";

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
      <Button className={classes.smallbutton} variant="contained" size="large" color="primary" onClick={prevFormStep}> Previous </Button>
      <h4> What is  </h4>
      <h4><span class="highlight">{whatsthat}</span></h4>
      <h4> in my code: </h4>
      <pre className="line-numbers" >
        <code ref={code}
          className={`language-${language}`}>
            {content}
         </code>
      </pre>

    <Button className={classes.button} variant="contained" size="large" color="primary" onClick={onSubmit}>Publish </Button>

    </form>)

      }

      export default Step3;