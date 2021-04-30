import {useRef} from 'react';
const code = useRef();

const Highlight = ({text}) => {
   let innerHTML = code.current.innerHTML;
   console.log(code)
   console.log(innerHTML)
   const index = innerHTML.indexOf(text);
   console.log(index);
   if (index >= 0) { 
    innerHTML = innerHTML.substring(0,index) + "<span class='highlight'>" + innerHTML.substring(index,index+text.length) + "</span>" + innerHTML.substring(index + text.length);
    code.current.innerHTML = innerHTML;
   }

 }

 export default Highlight