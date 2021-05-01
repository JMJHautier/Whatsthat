import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react'; 

const Guess = ({formSubmitted}) => {
   const randomLink=""; 
   const [allAsks, setAllAsks] = useState(['']);
   const serverLink = process.env.ORIGIN || "http://localhost:3001";
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
         <h3>  Guess a term </h3>
         <p> 
         <Link to={randomLink}>Get a random "What's that"</Link>
         <div class="line"> </div>
         <table> 
            <tr> <th>Date of submission</th>
            <th>unknown word</th>
            </tr>
            {allAsks.map(singleAsk => 
               { 
                  const id = singleAsk["_id"];
                  const singleAskLink=`/guess/${id}`
                  return (
               <tr> 
                  <td>{singleAsk.time}</td>
                  <td><Link to={singleAskLink}>{singleAsk.whatsthat}</Link></td>
               </tr>
               )
               })
            }
         </table>
         </p>
      </div> 
)
}

export default Guess;