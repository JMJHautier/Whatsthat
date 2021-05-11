import {useState, useContext,useEffect} from 'react';
import {AuthContext} from '../../context/AuthContext'
import {Link} from 'react-router-dom';
import {Pagination, Checkbox, FormGroup, FormControlLabel, Switch, FormControl} from '@material-ui/core';
import AvSkipNext from 'material-ui/svg-icons/av/skip-next';

const User = () => {
const {user, setUser, getUser} = useContext(AuthContext);
const {username, email, ask, alert} = user;
// const [statusCheckbox, setCheckbox] = useState([])
const [switchState, setSwitchState] = useState([]);
console.log(switchState)
const serverLink = process.env.REACT_APP_ORIGIN || "http://localhost:3001";

// useEffect(() => {
// if(ask) {
// setSwitchState(ask.map(singleAsk => {
//     if(user.alert.indexOf(singleAsk["_id"]) != -1) 
//     {
//       switchState.push(`{j${singleAsk["_id"]}:true}`)
//           }
//     else {
//       switchState.push(`{j${singleAsk["_id"]}:false}`)
//     }
//   }))
// console.log(switchState)
// }
// }
// , [])
// console.log(defaultStatus)

// setSwitchState(defaultStatus);

// console.log(switchState);

// const alertStatus = alert.map(SingleAsk=> {
//   {singleAsk["_id"]: true}
// })



// setSwitchState(prevState=> {...prevState, alertStatus})

// console.log(SwitchState); 

const updateAlert = async (event, id) => {
  const options = {
    method: 'PUT',
    body: JSON.stringify({alert: id}),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  if(event.target.checked){
    try {
      const response = await fetch(`${serverLink}/user/addalert/${user["_id"]}`, options)
      const data = await response.json()
      console.log(data) 
      getUser();
    } catch (error) 
    {console.log(error)}
  } else{
    const response = await fetch(`${serverLink}/user/removealert/${user["_id"]}`, options)
    const data = await response.json()
    console.log(data) 
    getUser();
  }

}
   return (<div> <h3 style={{width:"54.5vw"}}>Welcome, {username} </h3>
    {ask?
    (<div> 
   <h4 style={{textAlign:"center"}}> Your list of questions</h4>
   <table>
     <thead> 
        <tr> 
          <th>"What's that"</th>
          <th> Answers </th>
          <th> Submitted on</th>
          <th> Notify me </th>
        </tr> 
    </thead>
    
    <tbody> 
    {ask.map(singleAsk => {
        
      const hyperlink = `/ask/${singleAsk["_id"]}`

      return (
            <tr> 
              <td>
                <Link to={hyperlink}>{singleAsk.whatsthat}</Link>
              </td>
              <td>
                {singleAsk.guess.length}
              </td>
              <td>+
              {singleAsk.time}
              </td>
              <td>

            <FormControlLabel
              control={<Switch
                checked={alert.find(a =>a._id.trim() === singleAsk["_id"]) ? true :false }
                onChange={(event) => updateAlert(event, singleAsk["_id"])}  />}
            />
          </td>
            </tr>
      )
    })}
  </tbody>
   </table>
   <h4>With 'notify me' on, you will receive email notification every time that your question receives an answer. </h4>
   </div>):(<h4>You have not asked any question yet! </h4>)}
</div>)
   
}

export default User;