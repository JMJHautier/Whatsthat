import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';
import {Button} from '@material-ui/core/';
import {useContext} from 'react'
import {AuthContext} from '../../context/AuthContext';
import useStyles from './styles.js'
import './home.css';

const Home = () => {
   const classes=useStyles();
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
         <Link to="/ask">
            <Button variant="contained" color="primary" className={classes.button} size="large"> 
             <strong>Ask</strong>
            </Button></Link>
         </Grid>

         <Grid item>
         <Link to="/guess">
            <Button variant="contained" color="primary" className={classes.button} size="large"> 
              <strong>Guess </strong>
            </Button>
            </Link>
         </Grid>

         <Grid item>
         <Link to="/search">
            <Button variant="contained" color="primary" className={classes.button} size="large"> 
              <strong> Search </strong>
             </Button>
             </Link>
          </Grid>
      </Grid>
      </div>
   </main>
   )
}

export default Home;