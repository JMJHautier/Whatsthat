import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react'; 
import SearchBar from './SearchBar.js'
import {Button} from '@material-ui/core'
// import mdn from '%PUBLIC_URL%/mdn.jpg';
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
      <div>
         <SearchBar value={value} setValue={setValue}/>

         {value&&askByGuess?
         (<div>
         <a href={webdoc} target="_blank"> <img src="mdn.jpg" alt="mdn" href={webdoc}/></a>
         <a href={stack} target="_blank"> <img src="stack.bmp" alt="stack" href={stack}/></a>
         <h3>Examples of {value.body}</h3> 
         
         <table>
            <tr>
               <th>Date</th>
               <th>Language</th>
               <th> Extract</th>
            </tr>
            
            
               {askByGuess.map(singleAsk => { 
                  const link= `/ask/${singleAsk["_id"]}`;
                  return (<tr>
                     <td>{singleAsk.time}</td>
                     <td> {singleAsk.language}</td>
                     <td> <Link to={link}>{singleAsk.body.substr(0,50)}...</Link></td>
                  </tr>)
               })}
            </table></div>)
            :<p></p>}

           
         
      </div>
   )
}

export default Search;