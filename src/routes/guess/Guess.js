import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react'; 

const Guess = () => {
   const randomLink=""; 
   const [allAsks, setAllAsks] = useState(['']);
   const serverLink = process.env.ORIGIN || "http://localhost:3001";
   const frontEndLink= process.env.ORIGIN2 || "http://localhost:3000";
   const singleAskLink= `${frontEndLink}/guess/:id`;
   const allAsksLink = `${serverLink}/ask/`;
   
   useEffect (()=> {
      const getAllAsks = async () => {
      const response = await fetch(allAsksLink);
      const data = await response.json();
      setAllAsks(data); 
      console.log(allAsks)
      }
      getAllAsks()
   }, []) 

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
               { return (
               <tr> 
                  <td>{singleAsk.time}</td>
                  <td><Link to="">{singleAsk.whatsthat}</Link></td>
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