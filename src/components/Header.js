import HelpIcon from '@material-ui/icons/Help';
import Grid from '@material-ui/core/Grid';
import {Link, Redirect} from 'react-router-dom';
import './header.css'
import {Fragment, useContext} from 'react'; 
import {AuthContext} from '../context/AuthContext.js'
const Header = () => {
   const {isAuthenticated, logOut, user} = useContext(AuthContext);
   const {username} = user;
   return (<header> 
      <Grid container
      direction="row"
      justify="space-around"
      alignItems="flex-start"> 

         <Link to="/about"> <HelpIcon fontSize="large"/></Link>
         {isAuthenticated?(<Link to="/user"> <span>My profile({username})</span> <div onClick={logOut}>Logout</div> </Link>)
         :(<div> <Link to="/user"> Log-in </Link> / <Link to="signup">Register</Link></div>)}

      </Grid>
   <Link to="/"> <h2>What's that?</h2></Link>
   <h3> Know your terms, understand your code, find solutions</h3>
   </header>)

}

export default Header