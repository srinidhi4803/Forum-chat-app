import axios from "axios";
import { useState } from "react"

function Login() {
  const [formData,setFormData]=useState({
    email: '',
    password: ''
  });
  const [message,setMessage]=useState('');
  const {email,password}=formData;
  const handleSubmit = async (e)=>{
    e.preventDefault();
    const response = await axios.post('http://localhost:4000/api/user/login',
      {"email":email,
        "password":password
      });
      if(response.data.message){
        setMessage(response.data.message);
        }else{
          setMessage('Login Successful');
          localStorage.setItem('token',response.data.token);
          window.location.href = '/';
          }
  }
  
  return (
   <div>
    <h1>Login</h1>
      <form onSubmit={handleSubmit}>

        <div>
          <label htmlFor="email">Email</label>
          <input 
          type="email" 
          name="email" 
          value={email} 
          placeholder="password"
          onChange={e=>setFormData({...formData,email:e.target.value})}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
          value={password}
          onChange={e=>setFormData({...formData,password:e.target.value})}
          />
        </div>
        <div>
          <input
           type="submit"
           value="Login"
           />
        </div>
        <div>
          {message && <p>{message}</p>}
        </div>
      </form>
   </div>
  )
}

export default Login