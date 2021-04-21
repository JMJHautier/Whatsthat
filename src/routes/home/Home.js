import HelpIcon from '@material-ui/icons/Help';
import {Link} from 'react-router-dom';

const Home = () => {

   return (
   <div>
      <Link to="/"> <h2>What's that?</h2></Link>
      <h3> Know your terms, understand your code, find solutions</h3>
      <Link to="/about"> <HelpIcon fontSize="large"/></Link>
      <Link to="/user">Log in/ register</Link>
      <Link to="/ask">Ask</Link>
      <Link to="/guess">Guess</Link>
      <Link to="/search">Search</Link>
   </div>
   )
}

export default Home;