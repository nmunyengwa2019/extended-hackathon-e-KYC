import { useEffect, useState } from 'react';
import './App.css';
import azleLogo from './assets/azle_logo.svg';
import azleShadow from './assets/azle_shadow.png';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import { backend } from './declarations/backend';
import {
  BrowserRouter as Router,
  
  Route,
  Link
} from "react-router-dom";
import { e, s } from 'vitest/dist/reporters-qc5Smpt5';

function App() {
  const [loading, setLoading] = useState(false);
 

  //.. Bank User.............
const [fullName, setfullName] = useState('');
const [password, setPassword] = useState('');
const [role, setRole] = useState('');



const createBankUser = async()=>{
  try{
    setLoading(true);
    const user = await backend.addBankUser({fullName, password, role});
    console.log(user);
  }catch(err){
    console.error(err);
  }
}

  const loginBankUser = async()=>{
    try{
      setLoading(true);
      const user = await backend.loginBankUser({fullName:fullName, password:password});
      console.log(user);
    }catch(err){
      console.error(err);
    }
  }

  const [bankUsers, setBankUsers] = useState<Array<{ id: string; active: boolean; password: string; role: string; fullName: string; }>>([]);
  const getBankUsers = async()=>{
    try{
      setLoading(true);
      const users = await backend.getBankUsers();
      console.log(users);
      setBankUsers(users);
    }catch(err){
      console.error(err);
    }
  }

  const [allCustomers, setAllCustomers] = useState<Array<{id: string; address: string; gender: string; contact: string; fullName: string; }>>([]);
  const getAllCustomers = async()=>{
    try{
      setLoading(true);
      const users = await backend.getCustomers();
      console.log(users);
      setAllCustomers(users);
    }catch(err){
      console.error(err);
    }
  }
  
  //...Contact ................
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');


  const createCustomer = async()=>{
      try{
          setLoading(true);
          const customer = await backend.addCustomer({
            contact: contact,
            fullName: fullName,
            address:  address,
            gender: gender
          });
          console.log(customer);
      }
      catch(err){

      }
  }

  const [owner, setOwner] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File|null>(null);


  const handleSubmit = () => {
    

    // Perform upload logic with owner, description, and image data
    // Example: Send data to an API endpoint

    console.log('Owner:', owner);
    console.log('Description:', description);
    console.log('Image:', image);
  };



  return (
    <div className='App'>
      <h2>Bank User Management</h2>

      <h3>Create Bank User</h3>
      <form onSubmit={createBankUser}>
        <div>
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setfullName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="role">Role:</label>
          <select id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}>
           <option value="admin">Admin</option>
          <option value="auditor">Auditor</option>
          <option value="clerk">Clerk</option>
          </select>
        </div>
        <button type="submit">Create</button>
      </form>

      <h3>Login Bank User</h3>
      <form onSubmit={loginBankUser}>
        <div>
          <label htmlFor="fullNameLogin">Full Name:</label>
          <input
            type="text"
            id="fullNameLogin"
            value={fullName}
            onChange={(e) => setfullName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="passwordLogin">Password:</label>
          <input
            type="password"
            id="passwordLogin"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>

     

      <h3>Get Bank Users</h3>

      <button onClick={getBankUsers}>Get Users</button>
      <ul>
        {bankUsers.map((user) => (
          <li key={user.id}>
            Full Name: {user.fullName}, Role: {user.role}
          </li>
        ))}
      </ul>


      <div>
            <h2>Create Customer</h2>
            <form onSubmit={createCustomer}>
                <div>
                    <label>Contact:</label>
                    <input type="text" value={contact} onChange={(e)=>setContact(e.target.value)} />
                </div>
                <div>
                    <label>Full Name:</label>
                    <input type="text" value={fullName} onChange={(e) => setfullName(e.target.value)} />
                </div>
                <div>
                    <label>Address:</label>
                    <input type="text" value={address} onChange={(e)=>setAddress(e.target.value)} />
                </div>
                <div>
                    <label>Gender:</label>
                    <select value={gender} onChange={(e)=>setGender(e.target.value)}>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <button type="submit">Create</button>
            </form>

        </div>


        <form onSubmit={handleSubmit}>
        <h2>Add Customer KYC</h2>
      <div>
        <label htmlFor="owner">Owner:</label>
        <input
          type="text"
          id="owner"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="image">Image:</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={(e) => {
            const selectedImage = e.target.files?.[0];
    if (selectedImage) {
      setImage(selectedImage);
    }
          }}
        />
      </div>
      <button type="submit">Upload KYC</button>
    </form>


    
    <h3>Get All Customers</h3>

<button onClick={getBankUsers} >Get Customers</button>
<ul>
  {allCustomers.map((user) => (
    <li key={user.id}>
      Full Name: {user.fullName}, Address: {user.address}, Contact: {user.contact}, Gender: {user.gender}
    </li>
  ))}
</ul>

      
    </div>
  );
}

export default App;
