import {useState, useEffect} from 'react';


const GuessByAsk = ({id, formSubmitted}) => {

const [allGuess, setAllGuess] = useState();
const [isIncrease, setIsIncrease] = useState(false);
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
}, [id, formSubmitted, isIncrease])

const increaseRating = async (event)=> {
   let newRating; 
   if(event.target.className === "rating_positive"){
   newRating = {
      rating_positive: true
   }
   }
   else
   {
      newRating = {
         rating_negative: true
      }
   }
    event.preventDefault()
    const options = {
          method: 'PUT',
          body: JSON.stringify(newRating),
          headers: {
            'Content-Type': 'application/json'
          }
        }
   console.log(event);
    try {
      const response = await fetch(`http://localhost:3001/guess/${event.target.id}`, options)
      const data = await response.json()
      console.log(data) 
      setIsIncrease(!isIncrease)
    } catch (error) {console.log(error)}
  
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
                     <td><button onClick={increaseRating} id={singleAsk["_id"]} className="rating_positive"> positive:</button> {singleAsk["rating_positive"]} <button onClick={increaseRating} id={singleAsk["_id"]} className="rating_negative" > negative:</button> {singleAsk["rating_negative"]}</td> 
                  </tr>)
         })}
         </table>):<p>Loading</p>
      }
   </div>
   )
   }

   export default GuessByAsk
