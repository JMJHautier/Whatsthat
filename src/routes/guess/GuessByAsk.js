import {useState, useEffect} from 'react';


const GuessByAsk = ({id, formSubmitted}) => {

const [allGuess, setAllGuess] = useState();
const serverLink= process.env.ORIGIN || "http://localhost:3001";


useEffect(() => {
   const getGuessesByAsk = async () => {
      try {
      const link=`${serverLink}/guess/ask/${id}`
      const response = await fetch(link)
      const data = await response.json()
      setAllGuess(data);
      console.log(allGuess)
   } catch(error) {console.log(error)}
   }
   getGuessesByAsk();
}, [id, formSubmitted])

const increaseRating = ()=> {

   
}

const decreaseRating = () => {

}

return (
   <div>
      <h3> Previous answers </h3>
      {allGuess?
         (<table> <tr> <th>Answer</th> <th>comment</th> <th>rating</th></tr>
         {allGuess.map(singleAsk=>{
            return (<tr> 
                     <td>{singleAsk.body}</td> 
                     <td>{singleAsk.comment}</td>
                     <td><button onClick={increaseRating}> positive:</button> {singleAsk["rating_positive"]} <button onClick={decreaseRating}> negative:</button> {singleAsk["rating_negative"]}</td> 
                  </tr>)
         })}
         </table>):<p>Loading</p>
      }
   </div>
   )
   }

   export default GuessByAsk
