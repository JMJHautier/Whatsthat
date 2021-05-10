import React, {useEffect, useState, useContext} from "react";
import {useParams} from 'react-router-dom';
import { useForm,Controller, control } from "react-hook-form";
import {TextField, Button, FormLabel} from '@material-ui/core'
import {AccordionDetails, AccordionSummary, Accordion} from '@material-ui/core'
import useStyles from './styles.js';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {AuthContext} from '../../context/AuthContext.js'
const SingleGuess = ({setFormSubmitted, formSubmitted}) => {
   const {user} = useContext(AuthContext);

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
         author: user["_id"].trim()
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
      <Accordion className={classes.accordion} style={{backgroundColor:"#587291", 
      color:"#D7CEB2",
      marginLeft:"-96px",
      // width:"80%", 
      // margin:"auto",
      }}>
           <AccordionSummary className={classes.accordionTitle}
             expandIcon={<ExpandMoreIcon />}
             aria-controls="panel1a-content"
             id="panel1a-header"
           >
   
         <p> Submit your answer</p>
         </AccordionSummary>

         <h3>  </h3>
      <AccordionDetails style={{backgroundColor:"#587291"}}>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormLabel className={classes.label} component="label">Your answer (50 characters max)</FormLabel>

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
      </AccordionDetails>
      </Accordion>
   ):<h3>Thanks for your contribution!</h3>} 
   
</div>
   )
}

export default SingleGuess