import { useForm,Controller, control } from "react-hook-form";
import {useContext,useState} from 'react';
import {AuthContext} from '../../context/AuthContext'; 
import {Redirect} from 'react-router-dom';
import {FormLabel, TextField, Button} from '@material-ui/core'
import useStyles from '../ask/styles.js';

const SignUp = () => {
const {isAuthenticated, setIsAuthenticated, error, setError}= useContext(AuthContext); 
const [reload, setReload] = useState(true)
const serverLink = process.env.REACT_APP_ORIGIN || "http://localhost:3001";
const { register, handleSubmit, watch, control, formState: { errors, isValid, isSubmitted, onError} } = useForm({mode:"all"});
const classes = useStyles();

const onSubmit = async (data, event) => 
   {
      console.log(data, event)
      const {username, password, email} = data;
      const newUser = {
         username,
         password,
         email
         }

      event.preventDefault()
      const options = 
      {
             method: 'POST',
             body: JSON.stringify(newUser),
             headers: {
               'Content-Type': 'application/json'
             }
      }
     
       try {
         const response = await fetch(`${serverLink}/auth/signup`, options)
         const {token, error} = await response.json()
         if(error) {
            setError(error)
            return {error};
         }
         localStorage.setItem('token', token);
         setIsAuthenticated(true);
         console.log(token); 
       } catch (error) {console.log(error)}
      
      }
if(isAuthenticated) {

   // window.location.
   // setReload(false)
   const serverLink = process.env.REACT_APP_FRONT || "http://localhost:3000";

   setTimeout(()=> { window.location.href = serverLink }, 25000)
   return <h4> You have successfuly registered! You will be soon redirected </h4> 

}



 return (<div>
    {error && <div> error {error}</div>}
<form onSubmit={handleSubmit(onSubmit, onError)}>
         <h3> Sign up </h3>


      <FormLabel className={classes.label} component="label">Your username</FormLabel>

      <Controller
        name="username"
        control={control}
        defaultValue=""
        rules={{ required: {value: true, message:"Please provide a username" },
        maxLength:{value: 30, message:"that's too long! Please keep it under 30 characters"}}}
        render={({field:{onChange, value}, fieldState:{error}})=> (
          <TextField
          label="max 30 characters"
          rowsMax={1}
          fullWidth
          value={value}
          onChange={onChange}
          error={!!error}
          helperText={error?error.message:null}
          variant="outlined"
        />
        )}/>

      <FormLabel className={classes.label} component="label">Your email</FormLabel>

      <Controller
        name="email"
        control={control}
        defaultValue=""
        rules={{ pattern:{value: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
        message:"Please submit a valid email address" }}}
        render={({field:{onChange, value}, fieldState:{error}})=> (
          <TextField
          label="your email address"
          rowsMax={1}
          fullWidth
          value={value}
          onChange={onChange}
          error={!!error}
          helperText={error?error.message:null}
          variant="outlined"
        />
        )}/>

   <FormLabel className={classes.label} component="label">Your password</FormLabel>
      <Controller
        name="password"
        control={control}
        defaultValue=""
        rules={{required: {value:true, message:"Please provide a password"},
        maxLength:{value:20, message:"Your Password is too long! Please pick a password between 8 and 20 characters"}, 
        minLength:{value:8, message:"Your Password is too short! Please submit at least 8 characters"}, 
        pattern:{value: /(?=.*[!?@#$%^&-+=()])/, message:"Please include at least one special character(!?@#$%&*()-+=^)"}}}
        render={({field:{onChange, value}, fieldState:{error}})=> (
          <TextField
          label="at least 8 characters (including one special)"
          rowsMax={1}
          type="password"
          fullWidth
          value={value}
          onChange={onChange}
          error={!!error}
          helperText={error?error.message:null}
          variant="outlined"
        />
        )}/>

         <Button className={classes.button} disabled={!isValid} type="submit" variant="contained" size="large" color="primary">Sign-up </Button>
      
      </form>
      </div>)
}

export default SignUp