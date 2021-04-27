import HelpIcon from '@material-ui/icons/Help';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';
import './header.css'
const Header = () => {

   return (<header> 
      <Grid container
      direction="row"
      justify="space-around"
      alignItems="flex-start"> 

         <Link to="/about"> <HelpIcon fontSize="large"/></Link>
         <Link to="/user">Log in/ register</Link>

      </Grid>
   <Link to="/"> <h2>What's that?</h2></Link>
   <h3> Know your terms, understand your code, find solutions</h3>
   </header>)

}

export default Header