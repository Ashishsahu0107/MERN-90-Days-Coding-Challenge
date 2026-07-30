import axios from 'axios';
import React, { useEffect } from 'react'

const App = () => {
  const getData = async () => { 
    
    const res = axios.get("http://localhost:8000/");

    res.then((e) => { 
      console.log(e);
    })
    .catch((e) => { 
      console.log(e)
      })
    
  }



  return (
    <div>
      <div>{ name }</div>
      <button onClick={()=> getData()}>Click Me</button>
    </div>
  )
}

export default App