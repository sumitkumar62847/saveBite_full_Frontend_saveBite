import React from 'react'
import { useNavigate } from 'react-router-dom';

function Help() {
    const navigate = useNavigate();
  return (
    <div>Help
        <br/>
        <button onClick={()=>{navigate(-1)}}>back</button>
    </div>
  )
}

export default Help;