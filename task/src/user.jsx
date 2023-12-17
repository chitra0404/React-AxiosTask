import React, { useEffect, useState } from 'react'
import axios from 'axios';
import EditList from './edit';
import { Link, useParams } from 'react-router-dom';


function Table1() {
    const [user, setUser] = useState([]);
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [update,setUpdate]=useState(-1);
  
    

    //Mount, UnMount, Update
    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/users`)
            .then(res => {
                
                setUser(res.data);
                console.log("Use data:", res.data);
                localStorage.setItem("data",JSON.stringify(res.data));
            })
    }, []);
    const addUser=()=>{
        try{
            const newUser = {
                id: user.length + 1, // Generate a unique ID for the new user
                name: name,
                email: email,
                address: {
                    "street": "Kulas Light",
                    "suite": "Apt. 556",
                    "city": "Gwenborough",
                    "zipcode": "92998-3874",
                    "geo": {
                      "lat": "-37.3159",
                      "lng": "81.1496"
              }},
              phone: "1-770-736-8031 x56442",
              website: "hildegard.org",
              company: {
                "name": "Romaguera-Crona",
                "catchPhrase": "Multi-layered client-server neural-net",
                "bs": "harness real-time e-markets"
            }
        }
        //post is used to create user   
              axios.post(`https://jsonplaceholder.typicode.com/users`,newUser)
              .then(res => {

              setUser([...user,res.data]);
              console.log(res.data);
               localStorage.setItem("new",JSON.stringify(setUser)) ;          
                
                setName("");
                setEmail("");
                
         } ) }
            catch(error){
console.log(error);
            }
        };
    const deleteUser=(id)=>{
        axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`,)
        .then(res => {
            console.log("delete",res.data);
        const removeUser=user.filter((user)=>user.id!=id);
        setUser(removeUser);
         } )}
 
const handleSubmit=(e)=>{
    e.preventDefault()
    
const name=e.target.elements.name.value

 const email=e.target.elements.email.value
// const address=e.target.elements.address.value
const updateList=  user.map((li)=>(li.id===update?{...li,name:name,email:email}:li))
        setUser(updateList);
        console.log("update",updateList);
        setUpdate(-1)
    
  

}


// const handleUpdateName = (id, name) => {
//     const updatedUsers = user.map((u) => {
//       if (u.id === id) {
//         return { ...u, name: name };
//       }
//       return u;
//     });

//     setUser(updatedUsers);
//   };

const handleEdit=(id)=>{
   
setUpdate(id)
}



    //https://jsonplaceholder.typicode.com/users

    return (
        <div className='container mt-4  row g-3'>
            <div>
          
   
            <input type="text" placeholder='enter the name' value={name}  
        onChange={(e) => setName(e.target.value)}/>
        
   
            <input type="text" placeholder='enter the emailId' value={email}  
        onChange={(e) => setEmail(e.target.value)}/>
                 
      
        
        <button className="btn btn-primary me-md-2" onClick={addUser}>Add</button>
        
        </div>
            <h2 className="bg-warning">UserData</h2>
            <form onSubmit={handleSubmit}>
            <table className='table table-hover'>
                <thead className='table-dark'>
                    <tr>
                        <th >ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                    user.map((item, index) => (
                        update===item.id?<EditList item={item} user={user} setUser={setUser} handleEdit={handleEdit}  />:
                        <tr  className="table-success" key={index}> 
                            <td >{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            {/* <td>{`${item.address.suite} ${item.address.street} ${item.address.city}`}</td> */}
                            <td><button type="submit" className="btn btn-success" onClick={()=>deleteUser(item.id)} >delete</button>
                            <button type="submit" className='btn btn-success' onClick={()=>handleEdit(item.id)}>Edit</button></td>

                        </tr>
                    ))}
                   
                </tbody>
            </table>
            </form>
            
        </div>
    )
   
}

    
   
    






export default Table1