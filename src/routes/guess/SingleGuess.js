import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import { useForm } from "react-hook-form";


const SingleGuess = ({setFormSubmitted, formSubmitted}) => {

   const {id} = useParams(); 
   console.log(id)
   const { register, handleSubmit, watch, formState: { errors, isValid, isSubmitted} } = useForm({mode:"all"});

   const onSubmit = async (data, event) => 
   {
      console.log(data, event)
      const newGuess = {
         ask_id: id,
         body: data.body,
         source: data.source,
         comment: data.comment,
         }
      console.log(newGuess);
      event.preventDefault()
      const options = 
      {
             method: 'POST',
             body: JSON.stringify(newGuess),
             headers: {
               'Content-Type': 'application/json'
             }
      }
     
       try {
         const response = await fetch(`http://localhost:3001/guess/`, options)
         const data = await response.json()
         console.log(data) 
         setFormSubmitted(!formSubmitted)
       } catch (error) {console.log(error)}
      
      }
   

   const onError = (errors, event)=> {
      console.log(errors, event); 
   }

// useEffect(() => {
//    const getAllAsks = async () => {
//       try {
//       const link=`${serverLink}/guess/ask/${id}`
//       const response = await fetch(link)
//       const data = await response.json()
//       setAllAsks(data);
//       console.log(allAsks)
//    } catch(error) {console.log(error)}
//    }
//    getAllAsks();
// }, [id])

   return (
<div> 
   {!isSubmitted?(
      <form onSubmit={handleSubmit(onSubmit, onError)}>
         <h3> Submit your answer </h3>
         <label for="body">Your answer (50 characters max)</label>
         <input
            id="body"
            type="text"
         {...register("body", { required: {value: true, message:"Please provide an answer" }, maxLength:{value: 50, message:'Your answer is too long! Please keep it under 50 characters'}})} 
         />
         {errors.body && <p>{errors.body.message}</p>}
         <label for="source">(optional) Your source</label>
         <input
            id="source"
            type="text"
            {...register("source", { pattern:{value: /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            message:"Please submit an hyperlink" }})}
         />
         {errors.source && <p>{errors.source.message}</p>}

         <label for="comment">(optional) comment</label>
         <input
            id="comment"
            type="text"
            {...register("comment")}
         />
         {errors.comment && <p>{errors.comment.message}</p>}

         <button type="submit">Submit</button>
      
      </form>
   ):<h3>Thanks for your contribution!</h3>} 
   
</div>
   )
}

export default SingleGuess