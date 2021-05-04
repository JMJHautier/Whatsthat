import {useContext} from 'react';
import {AuthContext} from '../../context/AuthContext'

const User = () => {
const {user} = useContext(AuthContext);
const {username, email} = user;
console.log(user);
const serverLink = process.env.ORIGIN || "http://localhost:3001";


   return (<div> <h3>User page</h3>
 <ul> 
   <li> username: {username}</li>
   </ul></div>)
   
}

export default User;