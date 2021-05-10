import {useState, useEffect} from 'react';
import CheckIcon from '@material-ui/icons/Check';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import { Button, Checkbox } from '@material-ui/core';
import { ThumbUpAlt } from '@material-ui/icons';

const GuessByAsk = ({id, formSubmitted}) => {

const [allGuess, setAllGuess] = useState();
const [isIncrease, setIsIncrease] = useState(false);
const serverLink= process.env.REACT_APP_ORIGIN || "http://localhost:3001";


useEffect(() => {
   const getGuessesByAsk = async () => {
      try {
         console.log(id)
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
   console.log(event)

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
      const response = await fetch(`${serverLink}/guess/${event.target.id}`, options)
      const data = await response.json()
      console.log(data) 
      setIsIncrease(!isIncrease)
    } catch (error) {console.log(error)}
  
}

const getVerified = async (event) => {
   const newVerify = {
      isVerified: event.target.checked
   }
   console.log(event.target.checked)
   console.log(event)
   console.log(newVerify)

   const options = {
      method: 'PUT', 
      body: JSON.stringify(newVerify), 
      headers: {
         'Content-Type': 'application/json'
      }
   }
   try {
      const response = await fetch(`${serverLink}/guess/${event.target.id}`, options)
      
   }catch(error) {console.log(error)}
}

return (
   <div>
      <h3> Previous answers </h3>
      {allGuess&&allGuess[0]?
         (<table> <tr> <th>Answer</th> <th>comment</th> <th>rating</th></tr>
         {allGuess.map(singleAsk=>{
            return (<tr className={singleAsk.isVerified?"verified":"notverified"}> 
                     <td>{singleAsk.body}</td> 
                     <td>{singleAsk.comment}</td>
                     <td><button onClick={increaseRating} id={singleAsk["_id"]} className="rating_positive"> positive:</button>
                     <Button
                        id={singleAsk["_id"]}
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={increaseRating}
                        className="rating_positive"
                        startIcon={<ThumbUpAltIcon />}
                        ></Button>
                      {singleAsk["rating_positive"]} 
                      <button onClick={increaseRating} id={singleAsk["_id"]} className="rating_negative" > negative:</button>
                       {singleAsk["rating_negative"]}</td> 
                     <td> <Checkbox onClick={getVerified} checked={singleAsk.isVerified} id={singleAsk["_id"]} /> 
                      </td>
                  </tr>)
         })}
         </table>):<h4>No answer submitted yet!</h4>
      }
   </div>
   )
   }

   export default GuessByAsk
