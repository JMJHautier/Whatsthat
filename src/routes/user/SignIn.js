import { useForm } from "react-hook-form";
import {useContext} from 'react';
import {AuthContext} from '../../context/AuthContext'; 
import {Redirect} from 'react-router-dom';

const SignIn = () => {

   const {isAuthenticated, setIsAuthenticated, error, setError, getUser}= useContext(AuthContext); 
   const serverLink = process.env.REACT_APP_ORIGIN || "http://localhost:3001";
   const { register, handleSubmit, watch, formState: { errors, isValid, isSubmitted, onError} } = useForm({mode:"all"});
   
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

            <label htmlFor="email">Your email</label>
            <input
               id="email"
               type="text"
               {...register("email")}
            />
            {errors.email && <p>{errors.email.message}</p>}
   
            <label htmlFor="password">Password(at least 8 characters, including one special character)</label>
            <input
               id="password"
               type="password"
               {...register("password")}
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
   
   export default SignIn
   