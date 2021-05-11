import {useState, useEffect, useContext, Fragment} from 'react';
import CheckIcon from '@material-ui/icons/Check';
import { Button, Checkbox } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { DataGrid } from '@material-ui/data-grid';
import { SingleBedOutlined } from '@material-ui/icons';
import './guess.css';
import {AccordionDetails, AccordionSummary, Accordion, Typography} from '@material-ui/core'
import useStyles from './styles.js';
import {AuthContext} from '../../context/AuthContext';

const GuessByAsk = ({id, formSubmitted}) => {

const [allGuess, setAllGuess] = useState();
const [isIncrease, setIsIncrease] = useState(false);
const [hasVoted, setHasVoted] = useState([])
// const [rows, setRows] = useState()
const serverLink= process.env.REACT_APP_ORIGIN || "http://localhost:3001";
const {user} = useContext(AuthContext);
const classes= useStyles();

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
   if(event.target.innerHTML.includes("positive")||event.target.parentNode.outerHTML.includes("positive")){
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
      setHasVoted(prev=> [...prev, id]);

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
console.log(hasVoted)
return (
   <div>
      <Accordion className={classes.accordion} style={{backgroundColor:"#587291", 
   color:"#D7CEB2",
   marginLeft:"-96px",

   // width:"80%", 
   // margin:"auto"
   }}>
        <AccordionSummary className={classes.accordionTitle}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >

      {allGuess&&allGuess.length>0?<p> Check our {allGuess.length} responses</p>:<p>No response yet!</p>}
      </AccordionSummary>
      {/* {rows&&rows[0]?
         (<div style={{ height: 400, width: '100%' }}> 
            <DataGrid rows={rows} columns={columns}/>
         </div>):<h4>No answer submitted yet!</h4> */}
         <AccordionDetails style={{backgroundColor:"#587291"}}>
                {allGuess&&allGuess[0]?
                (<table>
                    <thead>
                    <tr>
                      <th class="radius">Answer</th>
                      <th>By </th>
                      <th>Rating </th>
                   </tr>
                   </thead>
                  <tbody> 
                  {allGuess.map(singleAsk => {
                     return (<tr className={singleAsk.isVerified?"verified":"notverified"}> 

                     <td>
                     <Accordion  style={{backgroundColor:"#587291", 
                     color:"#D7CEB2",
                     }}>
                        <AccordionSummary style={{fontSize:"1.5em"}}
                           expandIcon={<ExpandMoreIcon />}
                           aria-controls="panel1a-content"
                           id="panel1a-header"
                        >
                       
                           
                            {singleAsk.body}
                            </AccordionSummary>
                        <AccordionDetails style={{backgroundColor:"#587291",color:"white", fontSize:"1em", flexDirection:"column", alignItems:"start", justifyContent:"start", width:"40%"}}>

                       

  

                        {singleAsk.source!=''? <Typography style={{textAlign:"left" }}> <strong>source:</strong> <a href={singleAsk.source}>{singleAsk.source}</a> <br /></Typography >:<Typography style={{textAlign:"left" }}>No source provided</Typography>}
                        {singleAsk.comment!=''?<Typography style={{textAlign:"left"}}> <strong>comment:</strong> {singleAsk.comment}</Typography>:<Typography style={{textAlign:"left" }}>No comment provided</Typography>}
                        </AccordionDetails>
                        </Accordion>
                            </td>

                     <td className="author"> Jean <br/>(53 guesses, 6 verified)
                        {/* {singleAsk.author.username} */}
                     </td>
                     <td>
                     <Button
                        id={singleAsk["_id"]}
                        disabled={hasVoted.includes(singleAsk["_id"])}
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={increaseRating}
                        startIcon={<ThumbUpAltIcon disabled={true}
                        id={singleAsk["_id"]} className="rating_positive"/>}
                        >{singleAsk["rating_positive"]} </Button>

                     <Button
                        id={singleAsk["_id"]}
                        disabled={hasVoted.includes(singleAsk["_id"])}
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={increaseRating}
                        startIcon={<ThumbDownAltIcon disabled={hasVoted} id={singleAsk["_id"]} className="rating_negative"/>}
                        >{singleAsk["rating_negative"]}</Button>
                        </td>
                     <td> <Checkbox disabled={!user.admin} onClick={getVerified} checked={singleAsk.isVerified} id={singleAsk["_id"]} /></td>
                     </tr>)})}
                     </tbody>
                  </table>)
               :<h4>No answer submitted yet!</h4>
               }
         </AccordionDetails>
         </Accordion>
      </div>
   )
   }

   export default GuessByAsk
