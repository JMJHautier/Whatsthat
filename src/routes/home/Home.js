import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';
import {Button} from '@material-ui/core/';
import {useContext, useState} from 'react'
import {AuthContext} from '../../context/AuthContext';
import useStyles from './styles.js'
import './home.css';
import { motion, AnimateSharedLayout, useAnimation } from "framer-motion";

const Home = () => {
   const classes=useStyles();
   const [isSubtitleOn, setIsSubtitleOn] = useState({ask:false, search:false, guess:false})
   const [makeBigger, setmakeBigger] = useState(0)
   const controls= useAnimation();
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
             <motion.strong whileHover={{scale:1.2, textShadow:"0px 0px 20px rgb(255, 255, 255)"}}
                            onHoverStart={()=>{setIsSubtitleOn((prevState)=>({...prevState, ask:true})); setmakeBigger(1.5)}}
                            onHoverEnd={()=>setIsSubtitleOn((prevState)=>({...prevState, ask:false}))}>
                               Ask
                               </motion.strong>
            </Button></Link>
         </Grid>

         <Grid item>
         <Link to="/guess">
            <Button variant="contained" color="primary" className={classes.button} size="large"> 
            <motion.strong whileHover={{scale:1.2, textShadow:"0px 0px 20px rgb(255, 255, 255)"}}
                            onHoverStart={()=>setIsSubtitleOn((prevState)=>({...prevState, guess:true}))}
                            onHoverEnd={()=>setIsSubtitleOn((prevState)=>({...prevState, guess:false}))}>
                               Guess
                               </motion.strong>
            </Button>
            </Link>
         </Grid>

         <Grid item>
         <Link to="/search">
            <Button variant="contained" color="primary" className={classes.button} size="large"> 
            <motion.strong whileHover={{scale:1.2, textShadow:"0px 0px 20px rgb(255, 255, 255)"}}
                            onHoverStart={()=>setIsSubtitleOn((prevState)=>({...prevState, search:true}))}
                            onHoverEnd={()=>setIsSubtitleOn((prevState)=>({...prevState, search:false}))}>
                               Search
                               </motion.strong>
             </Button>
             </Link>
          </Grid>
      </Grid>
      <div class="bar"></div>
      <AnimateSharedLayout>
      <motion.h4 className="titlehover" hidden={!isSubtitleOn.ask} layout>Can't name a word in your code? Ask the community!</motion.h4>
      <h4 className="titlehover" hidden={!isSubtitleOn.guess}>Help fellow users describe their codes</h4>
      <h4 className="titlehover" hidden={!isSubtitleOn.search}>Find definitions and examples of coding concepts </h4>
      </AnimateSharedLayout>
      </div>
   </main>
   )
}

export default Home;