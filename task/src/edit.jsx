import React, { useState,useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


function EditList({item,user,setUser}){
   
    const navigate=useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const {id}=useParams();
    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/users/${item.id}`)
            .then(res => {
              
                
                console.log("Use data1:", res.data);
                localStorage.setItem("data",JSON.stringify(res.data));
            })
    }, [id]);

    function handleInput(e){
      e.preventDefault()
      const name=e.target.name;
      const value=e.target.value;
      axios.put(`https://jsonplaceholder.typicode.com/users/${item.id}`,{name})
    .then(res=>{
        console.log("update",res.data)});

      // const address=e.target.elements.address.value
      
     
     
     const updateList= user.map((li)=>(li.id===item.id)?{...li,name:value}:li)
     setUser(updateList)
  }


  function handleEmail(e){
    e.preventDefault()
    const email=e.target.name;
    const value=e.target.value;
    axios.put(`https://jsonplaceholder.typicode.com/users/${item.id}`,{email})
  .then(res=>{
      console.log("update",res.data)});

    // const address=e.target.elements.address.value
    
   
   
   const updateList= user.map((li)=>(li.id===item.id)?{...li,email:value}:li)
   setUser(updateList)
}


    
    
    
    

    
  return(
    <tr key={item.id}>
    
    <td>
      <input type="text" name='name'value={item.name} onChange={handleInput} />
    </td>
    <td>
      <input type="text" name='email'value={item.email} onChange={handleEmail} />
    </td>
    <td>
      <button className="btn btn-success" type="submit">Update</button>
    </td>
  </tr>
)

   }

   export default EditList;