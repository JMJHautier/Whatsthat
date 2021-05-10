import {useState, useEffect, Fragment} from 'react';
import CheckIcon from '@material-ui/icons/Check';
import { Button, Checkbox } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import { DataGrid } from '@material-ui/data-grid';
import { SingleBedOutlined } from '@material-ui/icons';

const GuessByAsk = ({id, formSubmitted}) => {

const [allGuess, setAllGuess] = useState();
const [isIncrease, setIsIncrease] = useState(false);
// const [rows, setRows] = useState()
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

//    setRows([{answer:'hi', comment:"comment", rating:"rating", id:'2'},
//    {answer:'hi there', comment:"comment", rating:"rating", id:'1'},
// ]);
   }, [id, formSubmitted, isIncrease])

const increaseRating = async (event)=> {
   console.log(event)

   let newRating; 
   if(event.target.innerHTML.includes("positive")){
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
      let id;
      if(event.target.id!=''){id=event.target.id} else {id=event.target.parentNode.id}
      const response = await fetch(`${serverLink}/guess/${id}`, options)
      const data = await response.json()
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

// const columns = [
//    { field: 'answer', headerName: 'Answer'},
//    { field: 'comment', headerName: 'Comment'},
//    { field: 'rating', headerName: 'Rating'},
//    {field:'id', headerName:'id'}
// ];

// useEffect(() => {
// const myrows= allGuess&&allGuess[0]? allGuess.map(singleAsk => {
//    return ({
//       id: singleAsk["_id"],
//       answer: singleAsk.body,
//       comment:singleAsk.comment,
//       rating: (<Fragment> 
//                <Button
//                   id={singleAsk["_id"]}
//                   variant="contained"
//                   color="primary"
//                   size="small"
//                   onClick={increaseRating}
//                   startIcon={<ThumbUpAltIcon id={singleAsk["_id"]} className="rating_positive"/>}
//                   >{singleAsk["rating_positive"]} </Button>
//                <Button
//                   id={singleAsk["_id"]}
//                   variant="contained"
//                   color="primary"
//                   size="small"
//                   onClick={increaseRating}
//                   startIcon={<ThumbDownAltIcon id={singleAsk["_id"]} className="rating_negative"/>}
//                   >{singleAsk["rating_negative"]}</Button>
//                </Fragment>
//                   )
//          })
//       }):"undefined";
// console.log(myrows)
// setRows(myrows);
// console.log(rows);
// }, [allGuess])

return (
   <div>
      <h3> Previous answers </h3>
      {/* {rows&&rows[0]?
         (<div style={{ height: 400, width: '100%' }}> 
            <DataGrid rows={rows} columns={columns}/>
         </div>):<h4>No answer submitted yet!</h4> */}

                {allGuess&&allGuess[0]?
                (<table>
                   <tr>
                      <th>Answer</th>
                      <th> Comment </th>
                      <th> Rating </th>
                   </tr>

                  {allGuess.map(singleAsk => {
                     return (<tr className={singleAsk.isVerified?"verified":"notverified"}> 
                     <td>{singleAsk.body}</td> 
                     <td>{singleAsk.comment}</td>
                     <td>
                     <Button
                        id={singleAsk["_id"]}
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={increaseRating}
                        startIcon={<ThumbUpAltIcon id={singleAsk["_id"]} className="rating_positive"/>}
                        >{singleAsk["rating_positive"]} </Button>

                     <Button
                        id={singleAsk["_id"]}
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={increaseRating}
                        startIcon={<ThumbDownAltIcon id={singleAsk["_id"]} className="rating_negative"/>}
                        >{singleAsk["rating_negative"]}</Button>
                        </td>
                     <td> <Checkbox onClick={getVerified} checked={singleAsk.isVerified} id={singleAsk["_id"]} /></td>
                     </tr>)})}
                  </table>)
               :<h4>No answer submitted yet!</h4>
               }
      </div>
   )
   }

   export default GuessByAsk
