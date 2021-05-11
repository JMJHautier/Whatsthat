import {useContext} from 'react';
import {AuthContext} from '../../context/AuthContext'; 
import {Redirect, Link} from 'react-router-dom';
import useStyles from '../ask/styles.js';
import { useForm,Controller} from "react-hook-form";
import {FormLabel, TextField, Button} from '@material-ui/core'

const SignIn = () => {

   const {isAuthenticated, setIsAuthenticated, error, setError, getUser}= useContext(AuthContext); 
   const serverLink = process.env.REACT_APP_ORIGIN || "http://localhost:3001";
   const { register, handleSubmit, watch, control, formState: { errors, isValid, isSubmitted, onError} } = useForm({mode:"all"});
   const classes = useStyles();

   const onSubmit = async (data, event) => 
      {
         const {password, email} = data;
         const login = {
            password,
            email
            }
   
         event.preventDefault()
         const options = 
         {
                method: 'POST',
                body: JSON.stringify(login),
                headers: {
                  'Content-Type': 'application/json'
                }
         }
        
          try {
            const response = await fetch(`${serverLink}/auth/signin`, options)
            const {token, error} = await response.json()
            if(error) {
               setError(error)
               return {error};
            }
            localStorage.setItem('token', token);
            setIsAuthenticated(true);
            getUser();
            console.log(token); 
          } catch (error) {console.log(error)}
         
         }
   if(isAuthenticated) return <Redirect to="/" />;
   
    return (<div>
       {error && <div> error {error}</div>}
   <form onSubmit={handleSubmit(onSubmit, onError)}>
   <h3> Sign in </h3>

   <FormLabel className={classes.label} component="label">Your email</FormLabel>

      <Controller
      name="email"
      control={control}
      defaultValue=""
      render={({field:{onChange, value}, fieldState:{error}})=> (
         <TextField
         label="type here"
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
  render={({field:{onChange, value}, fieldState:{error}})=> (
    <TextField
    label="type here"
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

   <Button className={classes.button} disabled={!isValid} type="submit" variant="contained" size="large" color="primary">Sign-in </Button>
   
         </form>
      <h4 style={{textAlign:"center"}}>No account yet? <Link to="/signup">Sign-up!</Link> </h4>
         </div>)
   }
   
   export default SignIn
   