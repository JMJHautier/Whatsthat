import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react'; 
import SearchBar from './SearchBar.js'
import {Button} from '@material-ui/core'
import GitHubIcon from '@material-ui/icons/GitHub';

const Search = () => {
   const serverLink = process.env.REACT_APP_ORIGIN || "http://localhost:3001";
   const options = ['Option 1', 'Option 2'];
   const [value, setValue] = useState(options[0]);
   const [askByGuess, setAskByGuess] = useState();
   console.log(serverLink)
   useEffect (
      ()=> {
         const getAsksByGuesses = async() => {

            const {body} = value
            const bodytrim = body.trim()
            console.log(body)
            const response = await fetch(`${serverLink}/ask/guess/${bodytrim}`)
            const data = await response.json();
            setAskByGuess(data); 
            console.log(askByGuess);
         }
         if (value=== null) {console.log("value is null")}
         else if(value.body) {getAsksByGuesses()}
         else{console.log("no search done")}
      }
   , [value])
      const webdoc=`https://developer.mozilla.org/en-US/docs/Glossary/${value.body}`
      const stack=`https://stackoverflow.com/search?q=${value.body}`
   return (
      <div class="search">
         <SearchBar value={value} setValue={setValue}/>

         {value&&askByGuess?
         (<div>
            <h4> Entries for <span class="highlight">{value.body}</span> in</h4>
            <div style={{display:"flex", alignItems:"start", justifyContent:"center", flexDirection:"row"}}>
               <div style={{paddingRight:"10px"}}><a href={webdoc} target="_blank"> <img style={{height:"60px", textAlign:"center"}} src="mdn.png" alt="mdn"/></a></div>
               <div><a href={stack} target="_blank"> <img style={{height:"60px"}} src="stackoverflow.png" alt="stack" href={stack}/></a></div>
            </div>
         <h4>Examples of <span class="highlight">{value.body}</span> in our database</h4> 
         
         <table>
            <tr>
               <th>Language</th>
               <th>Extract</th>
               <th>Submitted on</th>

            </tr>
            
            
               {askByGuess.map(singleAsk => { 
                  const link= `/ask/${singleAsk["_id"]}`;
                  return (<tr>
                     <td> {singleAsk.language}</td>
                     <td> <Link to={link}>{singleAsk.body.substr(0,50)}...</Link></td>
                     <td>{singleAsk.time}</td>

                  </tr>)
               })}
            </table></div>)
            :<p></p>}

           
         
      </div>
   )
}

export default Search;