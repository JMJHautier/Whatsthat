import {Button} from '@material-ui/core'
import {Link} from 'react-router-dom'
import {useState, useContext} from 'react'
import { useForm } from "react-hook-form";
import Step1 from './Step1.js';
import Step2 from './Step2.js';
import Step3 from './Step3.js';
import Step4 from './Step4.js';
import {AuthContext} from '../../context/AuthContext';

const Ask = () => {
      const [formStep, setFormStep] = useState(0);
      const [language, setLanguage] = useState("javascript");
      const [content, setContent] = useState();
      const [whatsthat, setWhatsthat] = useState(""); 
      const [onlineId, setOnlineId] = useState('');
       const askId = `ask/${onlineId}`;

      const { register, handleSubmit, watch, formState: { errors, isValid} } = useForm({mode:"all"});
      const nextFormStep = () => {
            setFormStep(prevStep => prevStep+1)
      }
      const prevFormStep = () => {
            setFormStep(prevStep => prevStep -1)
      }
      const onSubmit = data => {
            if(data.code){
            setContent(data.code)
            }
            setFormStep(prevStep => prevStep+1)
            console.log(data);
      }
   return (
 <div> 
      {formStep === 0 && (
      <section> 
            <h3 style={{width:"55vw"}}>  1- Pick your Language & Copy your code </h3>
            
                  <Step1 language={language} content={content} setContent={setContent} onSubmit={onSubmit} setLanguage={setLanguage} nextFormStep={nextFormStep}/>
      </section>)
      }
      {formStep===1 && (
      <section> 
            <h3 style={{width:'55vw'}}> 2- Select the word that you don't know</h3>

                  <Step2 content={content} language={language} onSubmit={onSubmit} prevFormStep={prevFormStep} nextFormStep={nextFormStep} whatsthat={whatsthat} setWhatsthat={setWhatsthat}/>
            <form onSubmit={handleSubmit(onSubmit)}>
                  
            </form>
      </section>

      )}
      {formStep===2 &&(
      <section> 
            <h3> 3- Review your submission </h3>
                  <Step3 content={content} language={language} onSubmit={onSubmit} prevFormStep={prevFormStep} nextFormStep={nextFormStep} whatsthat={whatsthat} setOnlineId={setOnlineId}/>

      </section>)
      }     
      {formStep >=3 &&(
            <section>
            <h3> Congratulations! </h3>

                  <Step4 askId={askId} nextFormStep={nextFormStep} formStep={formStep}/>

            </section>
      )}
{/* <pre> {JSON.stringify(watch(), null, 2)}</pre> */}
</div>
   ) 
}

export default Ask;
