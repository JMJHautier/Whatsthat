import {createContext, useState, useEffect} from 'react';

export const AuthContext = createContext();

const AuthState = ({children}) => {
   const [isAuthenticated, setIsAuthenticated] = useState(false); 
   const [user, setUser] = useState({});
   const [error, setError] = useState('')
   const serverLink = process.env.ORIGIN || "http://localhost:3001";

   const logOut = () => {
      localStorage.removeItem('token');
      setIsAuthenticated(false);
   }
   const getUser = async() => {
      const token = localStorage.getItem('token');
      console.log(token);
      
         const options = {
            headers: {
               token
            }
         }
      
      const response = await fetch(`${serverLink}/auth/me`, options)
      const data = await response.json();
      setUser(data);
      console.log(data);
   }
   useEffect(()=> {
      const token = localStorage.getItem('token');
      console.log(token);
      const verifySession = async () => {
         const options = {
            headers: {
               token
            }
         };
      
      const res = await fetch(`${serverLink}/auth/verify-session`, options);
      const {success} = await res.json();
      if(success) {
         setIsAuthenticated(true); 

         getUser();
         
      } else {
         localStorage.removeItem('token');
         setIsAuthenticated('false'); 
         setUser('');
         console.log('token removed')
      }
   }
      if(token) {
         verifySession();
         console.log('hi')
      }
            
   }, [])

   useEffect (()=> {
      setTimeout(()=> setError(''), 3000);
   }, [error])

  


   return (<AuthContext.Provider value={{isAuthenticated, setIsAuthenticated, user, setUser, getUser, error, setError,logOut}}>
      {children}
   </AuthContext.Provider>)
}

export default AuthState;