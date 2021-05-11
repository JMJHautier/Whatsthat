import HelpIcon from '@material-ui/icons/Help';
import Grid from '@material-ui/core/Grid';
import {Link, Redirect} from 'react-router-dom';
import './header.css'
import {Fragment, useContext} from 'react'; 
import {AuthContext} from '../context/AuthContext.js'
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { motion, AnimateSharedLayout, useAnimation } from "framer-motion";


const Header = () => {
   const {isAuthenticated, logOut, user} = useContext(AuthContext);
   const {username} = user;
   return (<header> 
      <Grid container
      direction="row"
      justify="space-around"
      alignItems="flex-start"> 

         <Link to="/about"> <HelpIcon fontSize="large"/></Link>
         {isAuthenticated?(<Link to="/user"> <div onClick={logOut} style={{display:"inline"}}><ExitToAppIcon fontSize="large"/></div> <span><AccountBoxIcon fontSize="large"/><div styles={{verticalAlign:"middle", display:"inline", marginBottom:"10px"}}>{username}</div></span></Link>)
         :(<div> <Link to="/user"> Log-in </Link> / <Link to="signup">Register</Link></div>)}

      </Grid>
   <Link to="/"> <h2 style={{marginTop:"10px"}}>What's that?</h2></Link>
   <motion.h3 animate={{initial:{opacity:0}, opacity:1}}> Learn to describe your code</motion.h3>
   </header>)

}

export default Header