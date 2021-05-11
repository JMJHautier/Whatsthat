import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {useState, useEffect} from 'react';
import './search.css'

const SearchBar = ({value, setValue}) => {

const [allGuesses, setAllGuesses] = useState(); 
   const serverLink = process.env.REACT_APP_ORIGIN || "http://localhost:3001";

   useEffect(()=> {
      const getAllGuesses = async () => {
         try{
            const response = await fetch(`${serverLink}/guess`)
            const data = await response.json(); 
            setAllGuesses(data); 
            console.log(allGuesses);
         }catch(error) {console.log(error)}
      }
      getAllGuesses();
   }, [])

   const defaultProps = {
      options: allGuesses,
      getOptionLabel: (option) => option.body,
    };

   return (
      <div class="search">
      {allGuesses?
      (<Autocomplete
        {...defaultProps}
        value={value}
        style={{width:"40%", margin:"auto"}}
        onChange={(event, newValue) => {
           setValue(newValue)
        }}
        id="answers"
        debug
        renderInput={(params) => <TextField {...params} label="e.g. Tag, hook, propriety..." margin="normal" />}
      />):<p></p>}


</div>
   )

      }

      export default SearchBar