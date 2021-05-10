import React, {useEffect, useState, useRef} from "react";
import Prism from "prismjs";
import './codeEditor.css';
import './prism.css'
import {useParams} from 'react-router-dom';
import Guesses from '../guess/GuessByAsk.js';
import GuessForm from '../guess/SingleGuess.js';
import {Button} from '@material-ui/core';
import './ask.css'
const SingleAsk = () => {
   const [ask, setAsk] = useState([])
   const [formSubmitted, setFormSubmitted] = useState(false); 
   const serverLink = process.env.REACT_APP_ORIGIN || "http://localhost:3001";
   const {id} = useParams();

   const code = useRef();

   const highlight = (text) => {
      
      let innerHTML = code.current.innerHTML;
     

            console.log(innerHTML)
            console.log(ask.whatsthat.length)
            console.log(text.length)
         const index = innerHTML.indexOf(text.trim());
         console.log(index);
         if (index >= 0) { 
            innerHTML = innerHTML.substring(0,index) + "<span class='highlight'>" + innerHTML.substring(index,index+text.length) + "</span>" + innerHTML.substring(index + text.length);
            code.current.innerHTML = innerHTML;
            }
      
      }
   
   
   useEffect(() => {
      const getAsk = async () => {
         const response = await fetch(`${serverLink}/ask/${id}`)
         const data = await response.json();
         setAsk(data);
         console.log(ask);
         ask.whatsthat?highlight(ask.whatsthat):console.log("loading")

      }
      getAsk();

      Prism.highlightAll();

   }, [ask.whatsthat])


return (
<div> 
         {ask?
         (<div> 
            <div class="submission">
            <p> Submitted by <strong> Jean</strong> on {ask.time}</p>
            <h4> What is  </h4>
            <h4><span class="highlight">{ask.whatsthat}</span></h4>
            <h4> in my code: </h4>
            <pre className="line-numbers" >
               <code
               ref={code}
               className={`language-${ask.language}`}>
                  {ask.body}
               </code>
            </pre>
            </div>
            <Guesses id={id} formSubmitted={formSubmitted} setFormSubmitted={setFormSubmitted}/>

         <GuessForm setFormSubmitted={setFormSubmitted}/>
         </div>)
         :(<p>Loading</p>)
         }
   </div>
)

}

export default SingleAsk