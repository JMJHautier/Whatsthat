import {Grid, Box, Button} from '@material-ui/core'
import {Link} from 'react-router-dom';

import './nav.css'

const Nav = ({selected, notSelected1, notSelected2}) => 
{
const routeSelected = `/${selected}`
const routeNotSelected1 = `/${notSelected1}`
const routeNotSelected2 = `/${notSelected2}`

 return (
 <div class="grid">
   <Grid container
   direction="row"
   justify="center"
   alignItems="center"
   spacing={2}
   >

            <Grid item xs={6} className="notSelected">
                  <Button component={Link} to={routeNotSelected1} variant="contained"  color="primary" style={{fontSize:"1.5em"}} fullWidth>
                     {notSelected1}
                  </Button> 
            </Grid>

            <Grid item xs={6} color="primary" className="notSelected">
               <Button component={Link} to={routeNotSelected2} variant="contained"  color="primary" style={{fontSize:"1.5em"}} fullWidth>
                     {notSelected2}
                  </Button>
            </Grid>

            <Grid item xs={12} className="selected" color="primary">
               <Button component={Link} to={routeSelected} variant="contained" color="primary" style={{fontSize:"2em"}} fullWidth>
                     {selected} 
                  </Button>
            </Grid>

       </Grid>
       
       </div>
 )
}

export default Nav
