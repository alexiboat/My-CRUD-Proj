import{useEffect, useState} from 'react'
import './App.css';
import axios from 'axios'
import Formtable from './component/Formtable';

axios.defaults.baseURL='http://localhost:9000/'

function App() {
  const [addSection, setAddSetion]=useState(false)
  const [dataList , setDatalist]=useState([])
  const [editSection, setEditSection]=useState(false)
  const [customers, setCustomers]=useState({
  name:"",
  email:"",
  phone:"",
  age:"",
  location:"",
  occupation:"",

  })
  const [update, setUpdate]=useState({name:"",
  email:"",
  phone:"",
  age:"",
  location:"",
  occupation:"",
  _id:"",
})

 console.log(update)
  const handleSubmit = async(e)=>{
    e.preventDefault()
    try {
      const postData = await axios.post("/posts", customers)
      if(postData.data.success){
        setCustomers(false)
        alert(postData.data.message)
      }
     window.location.reload()
    } catch (error) {
      
    }

  }



  const handleChange = (e)=>{
   const {name, value}=e.target
    setCustomers((prev)=>{
      return{
        ...prev, [name]:value
      }
    })
  }

    const fetchData = async()=>{
      const data = await axios.get("/receive")
     setDatalist(data.data.customer)

    }

    useEffect(()=>{
      fetchData()
    },[])


    const handleDelete = async (id)=>{
      const data = await axios.delete(`/delete/${id}`)
     // if(data.data.success){
       // fetchData()
       // alert(data.data.message)
      //}
      alert(data.data.message)
      window.location.reload()
    }


 const handleUpdateChange = (e)=>{
  const {name, value}=e.target
   setUpdate((prev)=>{
     return{
       ...prev, [name]:value
     }
   })
 }

 const handleUpdate = (da)=>{
  setEditSection(true)
  setUpdate(da)
 }

  const handleUpdateSubmit = async(e)=>{
    e.preventDefault()
   const data = await axios.put("/update", update)
   if(data.data.success){
    setUpdate(false)
    alert(data.data.message)
    window.location.reload()
  }
  }
  return (
    <>
      <div className='container'>
         <button className='btn btn-add'onClick={()=>setAddSetion(true)}>Add</button>
            {addSection && ( 
              <Formtable 
              handleChange={handleChange}
              rest={customers}
               handleSubmit={handleSubmit} 
               handleClose={()=>setAddSetion(false)}/>
            )}

            {editSection && (

              <Formtable 
               handleChange={handleUpdateChange}
               rest={update}
               handleSubmit={handleUpdateSubmit} 
               handleClose={()=>setEditSection(false)}/>
            )}

        <div className='tableContainer'>
          <table>
            <thead>
              <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone No.</th>
              <th>Age</th>
              <th>Location</th>
              <th>Occupation</th>
              </tr>
            </thead>
            <tbody>
             {dataList? (
              <>
               {dataList.map((da)=>(
              <tr key={da._id}>
                <td>{da.name}</td>
                <td>{da.email}</td>
                <td>{da.phone}</td>
                <td>{da.age}</td>
                <td>{da.location}</td>
                <td>{da.occupation}</td>
                 <td><button className='btn btn-edit' onClick={()=>handleUpdate(da)}>Edit</button>
                 <button className='btn btn-delete' onClick={()=>handleDelete(da._id)}>Delete</button></td>
                 
              </tr>
             ))}
              </>
             ):(<p>TThere is no Customer left</p>)}
            </tbody>
          </table>

        </div>
      </div>
     
    </>
  );



  
}

export default App;
