import {Link} from 'react-router-dom';
import {Button} from '@material-ui/core';

const Step4 = ({askId, nextFormStep, formStep})=> {

   return (
   <div>
      <p> Your submission is available at: <Link to={askId}>https://whatsthat/{askId}</Link></p>
         Wanna be notified when you get an answer? 
      <Button to="/" onClick={nextFormStep}> Notify me per email</Button>
      <p hidden={formStep===4?false:true}> you will be notified by email! Go back to <Link to="/"> home page</Link></p>
   </div>
   ) 
}

export default Step4;
