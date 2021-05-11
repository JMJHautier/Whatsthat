import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react'; 
import SearchBar from './SearchBar.js'
import {Button, Accordion, AccordionSummary, AccordionDetails} from '@material-ui/core'
import useStyles from '../guess/styles.js'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Search = () => {
   const serverLink = process.env.REACT_APP_ORIGIN || "http://localhost:3001";
   const options = ['Option 1', 'Option 2'];
   const [value, setValue] = useState(options[0]);
   const [askByGuess, setAskByGuess] = useState();
   const classes= useStyles()
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
         (<div style={{textAlign:"center"}}>
            <h3> Entries for <span class="highlight" style={{color:"white"}}>{value.body}</span> in</h3>
            <div style={{display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column"}}>
               <div style={{paddingRight:"10px"}}>
                  <a href={webdoc} style={{display:"flex", fontSize:"1.5em", alignItems:"center", justifyContent:"center"}} target="_blank"> 
                     <img style={{height:"60px", textAlign:"center", marginRight:"10px"}} src="mdn.png" alt="mdn"/>
                  
                  <p>MDN Glossary</p> </a>
               </div>
               <div >
                  <a href={stack} style={{display:"flex", fontSize:"1.5em", alignItems:"center", justifyContent:"center"}} target="_blank"> 
                     <img style={{height:"60px", marginRight:"10px"}} src="stackoverflow.png" alt="stack" href={stack}/>
                  
                  <p>Stack Overflow</p></a>

               </div>
               <div style={{alignSelf:"center", justifySelf:"center"}}>
                  <Accordion  style={{backgroundColor:"#587291", 
                     color:"#D7CEB2",
                     width:"80%",
                     margin:"auto"
                     }}>
                     <AccordionSummary className={classes.accordionTitle}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                     >
         
                        <p style={{fontSize:"0.75em", textAlign:"center"}}> "What's that" database ({askByGuess.length} entry(ies))</p>
                        </AccordionSummary>

                     <AccordionDetails style={{backgroundColor:"#587291"}}>
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
                        </table>
                     </AccordionDetails>
                  </Accordion>
               </div>
            </div>
         </div>)
      :<p></p>}
         
   </div>
   )
}

export default Search;