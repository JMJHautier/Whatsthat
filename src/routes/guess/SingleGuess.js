import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import { useForm,Controller, control } from "react-hook-form";
import {TextField, Button, FormLabel} from '@material-ui/core'
import useStyles from '../ask/styles.js'

const SingleGuess = ({setFormSubmitted, formSubmitted}) => {

   const {id} = useParams(); 
   console.log(id)
   const { register, handleSubmit, watch, control, formState: { errors, isValid, isSubmitted} } = useForm({mode:"all"});
   const serverLink = process.env.REACT_APP_ORIGIN || "http://localhost:3001";
   const classes = useStyles();
   const onSubmit = async (data, event) => 
   {
      console.log(data, event)
      const newGuess = {
         ask: id,
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
         const response = await fetch(`${serverLink}/guess`, options)
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
      <FormLabel className={classes.label} component="label"> (optional) Your answer (50 characters max)</FormLabel>

      <Controller
        name="body"
        control={control}
        defaultValue=""
        rules={{ required: {value: true, message:"Please provide an answer" }, maxLength:{value: 50, message:'Your answer is too long! Please keep it under 50 characters'}}}
        render={({field:{onChange, value}, fieldState:{error}})=> (
          <TextField
          label="write your answer here"
          rowsMax={1}
          fullWidth
          value={value}
          onChange={onChange}
          error={!!error}
          helperText={error?error.message:null}
          variant="outlined"
        />)}/>

         <FormLabel className={classes.label} component="label"> (optional) Your source</FormLabel>

         <Controller
        name="source"
        control={control}
        defaultValue=""
        rules={{ pattern:{value: /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
        message:"Please submit an hyperlink" }}}
        render={({field:{onChange, value}, fieldState:{error}})=> (
          <TextField
          label="share an hyperlink here"
          rowsMax={1}
          fullWidth
          value={value}
          onChange={onChange}
          error={!!error}
          helperText={error?error.message:null}
          variant="outlined"
        />)}/>
      <FormLabel className={classes.label} component="label" > (optional) Commment</FormLabel>
      <Controller
        name="comment"
        control={control}
        defaultValue=""
        rules={{ maxLength:{value:150, message:"Please keep it under 150 characters"}}}
        render={({field:{onChange, value}, fieldState:{error}})=> (
          <TextField
          label="add a 150 characters comment, if you wish"
          multiline
          rowsMax={2}
          fullWidth
          value={value}
          onChange={onChange}
          error={!!error}
          helperText={error?error.message:null}
          variant="outlined"
        />)}/>

      <Button className={classes.button} type="submit" variant="contained" size="large" color="primary">Publish </Button>
      
      </form>
   ):<h3>Thanks for your contribution!</h3>} 
   
</div>
   )
}

export default SingleGuess