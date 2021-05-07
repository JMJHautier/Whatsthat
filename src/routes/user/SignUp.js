import { useForm } from "react-hook-form";
import {useContext} from 'react';
import {AuthContext} from '../../context/AuthContext'; 
import {Redirect} from 'react-router-dom';

const SignUp = () => {
const {isAuthenticated, setIsAuthenticated, error, setError}= useContext(AuthContext); 
const serverLink = process.env.REACT_APP_ORIGIN || "http://localhost:3001";
const { register, handleSubmit, watch, formState: { errors, isValid, isSubmitted, onError} } = useForm({mode:"all"});

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
if(isAuthenticated) return <Redirect to="/" />;

 return (<div>
    {error && <div> error {error}</div>}
<form onSubmit={handleSubmit(onSubmit, onError)}>
         <h3> Sign up </h3>
         <label htmlFor="username">Your username</label>
         <input
            id="username"
            type="text"
         {...register("username", {
            required: {value: true, message:"Please provide a username" },
            maxLength:{value: 30, message:"that's too long! Please keep it under 30 characters"}})} 
         />
         {errors.username && <p>{errors.username.message}</p>}
         <label htmlFor="email">Your email</label>
         <input
            id="email"
            type="text"
            {...register("email", {
            pattern:{value: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
            message:"Please submit a valid email address" }})}
         />
         {errors.email && <p>{errors.email.message}</p>}

         <label htmlFor="password">Password(at least 8 characters, including one special character)</label>
         <input
            id="password"
            type="password"
            {...register("password",{
            required: {value:true, message:"Please provide a password"},
            maxLength:{value:20, message:"Your Password is too long! Please pick a password between 8 and 20 characters"}, 
            minLength:{value:8, message:"Your Password is too short! Please submit at least 8 characters"}, 
            pattern:{value: /(?=.*[!?@#$%^&-+=()])/, message:"Please include at least one special character(!?@#$%&*()-+=^)"}
            })}
         />
         {/* <input
            id="passwordCheck"
            type="password"
            {...register("passwordCheck",{
            required: {value:true, message:"Please rewrite your password"},
            maxLength:{value:20, message:"Your Password is too long! Please pick a passwordCheck between 8 and 20 characters"}, 
            minLength:{value:8, message:"Your Password is too short! Please submit at least 8 characters"}, 
            pattern:{value: /(?=.*[!?@#$%^&-+=()])/, message:"Please include at least one special character(!?@#$%&*()-+=^)"}
            })}

         />
         {errors.passwordCheck && <p>{errors.passwordCheck.message}</p>} */}

         <button type="submit">Submit</button>
      
      </form>
      <pre> {JSON.stringify(watch(), null, 2)}</pre>
      </div>)
}

export default SignUp