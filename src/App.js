import './App.css';
import {Route, Switch} from 'react-router-dom'; 
import Home from "./routes/home/Home.js";
import Ask from './routes/ask/Ask.js'
import Guess from './routes/guess/Guess.js';
import Search from './routes/search/Search.js';
import About from './routes/about/About.js';
import User from './routes/user/User.js';
import Header from './components/Header.js'
import Nav from './components/Nav.js'
import SingleAsk from './routes/ask/SingleAsk.js'
import SingleGuess from './routes/guess/SingleGuess.js'
import {Grid} from '@material-ui/core'
import { SingleBedOutlined } from '@material-ui/icons';
import SignIn from './routes/user/SignIn';
import SignUp from './routes/user/SignUp';
import {useContext, Fragment} from 'react';
import {AuthContext} from './context/AuthContext'
function App() {
  const {isAuthenticated} = useContext(AuthContext)

  return (
    <div className="App">
      <Header />
      <main>
      <Grid container 
      direction="row"
      justify="center"
      alignItems="center"
      style={{width: "55%", margin: "auto"}}
      >  
        <Switch>
            <Route exact path="/">
              <Home />
            </Route>
          
          <Route exact path="/ask">
            <Grid item xs={12}> 
              <Nav selected="Ask" notSelected1="Guess" notSelected2="Search"/>
            </Grid>
            <Grid item xs={12} className="body" style={{marginTop: '16px',paddingRight:'96px', paddingLeft:'96px'}}> 
              <Ask />
            </Grid>
          </Route>

          <Route path="/ask/:id">
            <Grid item xs={12}> 
                <Nav selected="Ask" notSelected1="Guess" notSelected2="Search"/>
              </Grid>
              <Grid item xs={12} className="body" style={{marginTop: '16px', paddingRight:'96px', paddingLeft:'96px', marginBottom:"96px"}}> 
                <SingleAsk />
              </Grid>
            </Route>
            
          <Route exact path="/guess">
            <Grid item xs={12}> 
              <Nav selected="Guess" notSelected1="Ask" notSelected2="Search"/>
            </Grid>
            <Grid item xs={12} className="body" style={{marginTop: '16px', paddingRight:'96px', paddingLeft:'96px', marginBottom:"96px", paddingBottom:"48px"}}> 
              <Guess />
            </Grid>
          </Route>

          <Route path="/guess/:id">
            <Grid item xs={12}> 
              <Nav selected="Guess" notSelected1="Ask" notSelected2="Search"/>
            </Grid>
            <Grid item xs={12} className="body" style={{marginTop: '16px', paddingRight:'96px', paddingLeft:'96px', marginBottom:"96px", paddingBottom:"96px"}}> 
              <SingleAsk />
            </Grid>
          </Route>

          <Route path ="/search">
            <Grid item xs={12}> 
              <Nav selected="Search" notSelected1="Guess" notSelected2="Ask"/>
            </Grid>
            <Grid item xs={12} className="body" style={{marginTop: '16px', paddingRight:'96px', paddingLeft:'96px', marginBottom:"96px", paddingBottom:"48px"}}> 
              <Search />
            </Grid>
          </Route>

          <Route path="/About">
            <About />
          </Route>

          <Route path="/user">
            <Grid item xs={12} className="body" style={{marginTop: '16px', paddingRight:'96px', paddingLeft:'96px', marginBottom:"96px", paddingBottom:"48px"}}> 

              {isAuthenticated?
              (<Fragment> <User /> </Fragment>)
              :
              (<SignIn/>)}
            </Grid>
          </Route>

          <Route path="/signup">
            <Grid item xs={12} className="body" style={{marginTop: '16px', paddingRight:'96px', paddingLeft:'96px', marginBottom:"96px", paddingBottom:"48px"}}> 
                <SignUp />
            </Grid>
          </Route>
        </Switch>
        </Grid>
        </main>
      </div>
  );
}

export default App;
