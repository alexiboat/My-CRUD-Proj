import React from 'react'
import '../App.css'
import { FaClosedCaptioning } from 'react-icons/fa'


const Formtable = ({handleChange, handleSubmit, handleClose, rest}) => {
  return (
    <div className='addcontainer'>
         <form onSubmit={handleSubmit}>
          <div className='close-btn'onClick={handleClose} > <FaClosedCaptioning/></div>
           <label htmlFor='name'>Name:</label>
           <input type='text' name='name' id='name' placeholder='Name' value={rest.name} onChange={handleChange}/>
           <label htmlFor='email'>Email:</label>
           <input type='text' name='email' placeholder='Email' id='email' value={rest.email} onChange={handleChange}/>
           <label htmlFor='name'>Phone No.:</label>
           <input type='text' name='phone' placeholder='Phone No.' id='phone' value={rest.phone}onChange={handleChange}/>
           <label htmlFor='name'>Age:</label>
           <input type='text' name='age' placeholder='Age' id='age' value={rest.age}onChange={handleChange}/>
           <label htmlFor='name'>Location:</label>
           <input type='text' name='location' placeholder='Location' id='location' value={rest.location}onChange={handleChange}/>
           <label htmlFor='name'>Occupation:</label>
          <input type='text' name='occupation' placeholder='Occupation' id='occupation' value={rest.occupation} onChange={handleChange}/>
           <button type='submit' className='btn'>Submit</button>
         </form>
    </div>
  )
}

export default Formtable