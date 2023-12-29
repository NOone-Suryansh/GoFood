import React,{useState} from 'react'
import {Link} from 'react-router-dom'
export default function Signup() {
    const [credentials, setcred] = useState({name:"",email:"",password:"",geolocation:""})
    const onChange=(e)=>{
        setcred({...credentials,[e.target.name]:e.target.value})
    }
    const handleSubmit= async(e)=>{
        e.preventDefault();
        const response= await fetch("http://localhost:5000/api/createuser",{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password,location:credentials.geolocation})
        })
        const json=await response.json()
        console.log(json);
        if(!json.success){
            alert("Enter Valid Credentials")
        }
    }
  return (
    <div>
        <div className="container">
      <form onSubmit={handleSubmit}>
  <div className="form-group">
    <label htmlFor="name">Name</label>
    <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} />
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email"/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange} placeholder="Password"/>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Address</label>
    <input type="text" className="form-control" id="exampleInputPassword1" name='geolocation' value={credentials.geolocation} onChange={onChange} placeholder="Password"/>
  </div>
  <button type="submit" className="m-3 btn btn-success">Submit</button>
  <Link to='/Login' className='m-3 btn btn-danger'>Already a user</Link>
</form>
</div>
    </div>
  )
}
