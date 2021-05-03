import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react'; 
import SearchBar from './SearchBar.js'

const Search = () => {
   const serverLink = process.env.ORIGIN || "http://localhost:3001";
   const options = ['Option 1', 'Option 2'];
   const [value, setValue] = useState(options[0]);
   const [askByGuess, setAskByGuess] = useState();

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

   return (
      <div>
         <SearchBar value={value} setValue={setValue}/>

         {askByGuess?
         (<table>
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
            </table>)
            :<p>Loading</p>}

           
         
      </div>
   )
}

export default Search;