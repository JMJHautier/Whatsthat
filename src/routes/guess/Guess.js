import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react'; 

const Guess = ({formSubmitted}) => {
   const randomLink=""; 
   const [allAsks, setAllAsks] = useState(['']);
   const serverLink = process.env.REACT_APP_ORIGIN || "http://localhost:3001";
   const allAsksLink = `${serverLink}/ask/`;

   useEffect (()=> {
      const getAllAsks = async () => {
      const response = await fetch(allAsksLink);
      const data = await response.json();
      setAllAsks(data); 
      console.log(allAsks)
      }
      getAllAsks()
   }, [formSubmitted]) 

   return (
      <div>
         {/* <p> You may either test yourself by guessing a term with a confirmed answer, or help the community by guessing a term that did not have a consensual answer yet.
            <h4>Test yourself </h4> */}
         {/* <Link to={randomLink}>Get a random "What's that" </Link> which has already been answered by the community. Can you get it right?  */}
         <h3>Help the community</h3>
         <p style={{textAlign:"center", fontSize:"1.25em"}}> Here is the list of all the 'What's that' without confirmed answer. Please help the community by providing an answer! </p>
         <div class="line"> </div>
         <table style={{borderRadius:"25px"}}> 
            <thead> 
            <tr> 
               <th>Term to describe</th>
               <th>Language</th>
               <th>Submitted on</th>

            </tr>
            </thead>
            <tbody> 
            {allAsks.map(singleAsk => 
               { 
                  const id = singleAsk["_id"];
                  const singleAskLink=`/guess/${id}`
                  return (
               <tr> 
                  <td><Link to={singleAskLink}>{singleAsk.whatsthat}</Link></td>
                  <td>{singleAsk.language}</td>
                  <td>{singleAsk.time}</td>

               </tr>
               )
               })
            }
            </tbody>
         </table>
         
      </div> 
)
}

export default Guess;