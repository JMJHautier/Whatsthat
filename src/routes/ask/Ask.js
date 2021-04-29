import {Button} from '@material-ui/core'
import {Link} from 'react-router-dom'
import {useState} from 'react'
import { useForm } from "react-hook-form";
import Step1 from './Step1.js';
import Step2 from './Step2.js';
import Step3 from './Step3.js';
const Ask = () => {
      const [formStep, setFormStep] = useState(0);
      const [language, setLanguage] = useState("javascript");
      const [content, setContent] = useState();
      const [whatsthat, setWhatsthat] = useState(""); 

      const { register, handleSubmit, watch, formState: { errors, isValid} } = useForm({mode:"all"});
      const nextFormStep = () => {
            setFormStep(prevStep => prevStep+1)
      }
      const prevFormStep = () => {
            setFormStep(prevStep => prevStep -1)
      }
      const onSubmit = data => {
            setFormStep(prevStep => prevStep+1)
            console.log(data);
      }
   return (
 <div> 
      {formStep === 0 && (
      <section> 
            <h3>  1- Copy your code </h3>
            
                  <Step1 language={language} content={content} setContent={setContent} onSubmit={onSubmit} setLanguage={setLanguage} nextFormStep={nextFormStep}/>
      </section>)
      }
      {formStep===1 && (
      <section> 
            <h3> 2- Select the word that you don't know</h3>

                  <Step2 content={content} language={language} onSubmit={onSubmit} prevFormStep={prevFormStep} nextFormStep={nextFormStep} whatsthat={whatsthat} setWhatsthat={setWhatsthat}/>
            <form onSubmit={handleSubmit(onSubmit)}>
                  
            </form>
      </section>

      )}
      {formStep===2 &&(
      <section> 
            <h3> 3- Review your submission </h3>
                  <Step3 content={content} language={language} onSubmit={onSubmit} prevFormStep={prevFormStep} nextFormStep={nextFormStep} whatsthat={whatsthat}/>
            <input type="submit" onClick={prevFormStep} value="previous"/>

            <form onSubmit={handleSubmit(onSubmit)}>                  
                  <input type="submit" />
            </form>
      </section>)
}     
{formStep >=3 &&(
      <section>
            <h3> Congratulations! </h3>
            <p> Your submission is available at </p>
            Wanna be notified when you get an answer? 
            <Button to="/" onClick={nextFormStep}> Notify me per email</Button>
            <p hidden={formStep===4?false:true}> you will be notified by email! Go back to <Link to="/"> home page</Link></p>

      </section>
)}
<pre> {JSON.stringify(watch(), null, 2)}</pre>
</div>
   ) 
}

export default Ask;
