import {Button} from '@material-ui/core'
import {Link} from 'react-router-dom'
import {useState} from 'react'
import { useForm } from "react-hook-form";
import CodeEditor from './CodeEditor.js';

const Ask = () => {
      const [formStep, setFormStep] = useState(0);
      const [language, setLanguage] = useState("javascript");
      const [content, setContent] = useState();

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
            <form onSubmit={handleSubmit(onSubmit)}>
            {/* register your input into the hook by invoking the "register" function */}
                  <input  {...register("code",{required:{value:true, message:"Please insert code",}})} />

                  <fieldset>
                        <legend>Choose language:</legend>
                        <input
                        type="radio"
                        id="javascript"
                        name="language"
                        value="javascript"
                        checked={language === "javascript"}
                        onChange={() => setLanguage("javascript")}
                        />
                        <label htmlFor="javascript">JavaScript</label>
                        <input
                        type="radio"
                        id="xml"
                        name="language"
                        value="markup"
                        checked={language === "markup"}
                        onChange={() => setLanguage("markup")}
                        />
                        <label htmlFor="Html">HTML</label>
                        <input
                        type="radio"
                        id="css"
                        name="language"
                        value="css"
                        checked={language === "css"}
                        onChange={() => setLanguage("css")}
                        />
                        <label htmlFor="css">CSS</label>
                  </fieldset>

                  <CodeEditor language={language} content={content} setContent={setContent}/>

                  <input disabled={!isValid} type="submit" onClick={nextFormStep} value="Next"/>
            {/* include validation with required or other standard HTML validation rules */}
            {errors.code && <p>{errors.code.message}</p>}
            </form>
      </section>)
      }
      {formStep===1 && (
      <section> 
            <h3> 2- Select the word to be highlighted and click on </h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                  <input {...register("Whatsthat", { required: {value: true, message:"Please pick a word" }})} />
            {/* errors will return when field validation fails  */}
            {errors.Whatsthat && <p>{errors.Whatsthat.message}</p>}

                  <input type="submit" onClick={prevFormStep} value="previous"/>
                  <input type="submit" disabled={!isValid} onClick={nextFormStep} value="Next"/>
                  
            </form>
      </section>

      )}
      {formStep===2 &&(
      <section> 
            <h3> 3- Review your submission </h3>
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
