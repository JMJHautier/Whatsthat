import {useState, useContext} from 'react';
import {AuthContext} from '../../context/AuthContext'
import {Link} from 'react-router-dom';
import {Checkbox} from '@material-ui/core';

const User = () => {
const {user, getUser} = useContext(AuthContext);
const {username, email, ask, alert} = user;
const [statusCheckbox, setCheckbox] = useState([])

const serverLink = process.env.ORIGIN || "http://localhost:3001";



const updateAlert = async (event, id) => {
  setCheckbox(prevState => [...prevState, {id: id, value: event.target.checked}])
  const alertId = {
      alert: id
    }

  const options = {
        method: 'PUT',
        body: JSON.stringify(alertId),
        headers: {
          'Content-Type': 'application/json'
        }
      }
  if(event.target.checked) {
  try {
    const response = await fetch(`http://localhost:3001/user/addalert/${user["_id"]}`, options)
    const data = await response.json()
    console.log(data) 
    getUser();
  } catch (error) {console.log(error)}
}
  else {
    const response = await fetch(`http://localhost:3001/user/removealert/${user["_id"]}`, options)
    const data = await response.json()
    console.log(data) 
    getUser();

  }
}
   return (<div> <h3>Welcome, {username} </h3>
   <h4> Your list of questions</h4>
   <table>
     <tr> 
      <th>"What's that"</th>
      <th> Answers </th>
      <th> time of submission</th>
      <th> Notify me </th>
    </tr> 
    {ask && ask.map(singleAsk => {
        
      // const checkCheck = statusCheckbox[statusCheckbox.indexOf(singleAsk["_id"])].value

      return (
        <tr> 
          <td>
            {singleAsk.whatsthat}
          </td>
          <td>
            filler
          </td>
          <td>
          {singleAsk.time}
          </td>
          <td>
            <Checkbox onChange={(event) => updateAlert(event, singleAsk["_id"])} />
          </td>
        </tr>
      )
    })}

   </table>
</div>)
   
}

export default User;