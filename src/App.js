import './App.css';
import {Route, Switch} from 'react-router-dom'; 
import Home from "./routes/home/Home.js";
import Ask from './routes/ask/Ask.js'
import Guess from './routes/guess/Guess.js';
import Search from './routes/search/Search.js';
import About from './routes/about/About.js';
import User from './routes/user/User.js';
import Header from './components/Header.js'

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        
        <Route path="/ask">
          <Ask />
        </Route>
          
        <Route path="/guess">
          <Guess />
        </Route>

        <Route path ="/search">
          <Search />
        </Route>

        <Route path="/About">
          <About />
        </Route>
        <Route path="/user">
          <User />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
