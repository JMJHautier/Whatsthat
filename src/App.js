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

import {Grid} from '@material-ui/core'

function App() {
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
        
        <Route path="/ask">
          <Grid item xs={12}> 
            <Nav selected="Ask" notSelected1="Guess" notSelected2="Search"/>
          </Grid>
          <Grid item xs={12} className="body" style={{marginTop: '16px'}}> 
            <Ask />
          </Grid>
        </Route>
          
        <Route path="/guess">
          <Grid item xs={12}> 
            <Nav selected="Guess" notSelected1="Ask" notSelected2="Search"/>
          </Grid>
          <Grid item xs={12} className="body" style={{marginTop: '16px'}}> 
            <Guess />
          </Grid>
        </Route>

        <Route path ="/search">
          <Grid item xs={12}> 
            <Nav selected="Search" notSelected1="Guess" notSelected2="Ask"/>
          </Grid>
          <Grid item xs={12} className="body" style={{marginTop: '16px'}}> 
            <Search />
          </Grid>
        </Route>

        <Route path="/About">
          <About />
        </Route>
        <Route path="/user">
          <User />
        </Route>
      </Switch>
      </Grid>
      </main>
    </div>
  );
}

export default App;
