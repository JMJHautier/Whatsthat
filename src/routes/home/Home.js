import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';
import {Button} from '@material-ui/core/';
import './home.css';

const Home = () => {

   return (
   <main>
      <div>
      <Grid container 
      direction="row"
      justify="center"
      style={{maxWidth:'100vw', minWidth:'50vw'}}
      spacing={2}
      > 
         <Grid item>
            <Button variant="contained" color="primary" className="button" size="large"> 
               <Link to="/ask"><strong>Ask</strong></Link>
            </Button>
         </Grid>

         <Grid item>
            <Button variant="contained" color="primary" className="button" size="large"> 
               <Link to="/guess"><strong>Guess </strong></Link>
            </Button>
         </Grid>

         <Grid item>
            <Button variant="contained" color="primary" className="button" size="large"> 
               <Link to="/search"><strong> Search </strong></Link>
             </Button>
          </Grid>
      </Grid>
      </div>
   </main>
   )
}

export default Home;