import "./EditStudent.css"
import {useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";
import ErrorElement from "../ErrorElement/ErrorElement";
import { Helmet } from "react-helmet-async";

const AddStudent = (props) => {
    useEffect(()=>{
        props.setCurrentTab("addStudent")
    },[props])
    const navigate=useNavigate()
    const [name,setName]=useState("")
    const [address,setAddress]=useState("")
    const [age,setAge]=useState("")
    const [pass,setPass]=useState("")
    const [email,setEmail]=useState("")
    const [error, setError] = useState();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data={
            name:name,
            age:age,
            address:address,
            email:email,
            pass:pass,
            role:"student"

        }
        axios.post("http://localhost:8080/api/students",data,{
            headers: {
                'Authorization': localStorage.getItem('access_token')
              }
        })
        .then(response=>{
           navigate("/")
        }).catch(e=>{
            setError(e.response.data.error)
        })
    };
    return (
        <>{!error &&
            <>
            <Helmet>
                <title>Add Student</title>
            </Helmet>

            <div className="signupFrm">
                <form action="" className="form"  onSubmit={handleSubmit}>
                    <h1 className="title">Add Student</h1>

                    <div className="inputContainer">
                        <input type="text" className="input" value={name} onChange={(e) => setName(e.target.value)} required />
                        <label htmlFor="" className="label">Name</label>
                    </div>

                    <div className="inputContainer">
                        <input type="text" className="input" value={address} onChange={(e) => setAddress(e.target.value)} required />
                        <label htmlFor="" className="label">Address</label>
                    </div>
                    <div className="inputContainer">
                        <input type="text" className="input"  value={age} onChange={(e) => setAge(e.target.value)} required />
                        <label htmlFor="" className="label">Age</label>
                    </div>
                    <div className="inputContainer">
                        <input type="password" className="input"  value={pass} onChange={(e) => setPass(e.target.value)} required />
                        <label htmlFor="" className="label">Password</label>
                    </div>
                    <div className="inputContainer">
                        <input type="email" className="input"  value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <label htmlFor="" className="label">Email</label>
                    </div>

                    <input type="submit" className="updateBtn btn" value="Add" />
                </form>
            </div>
            </>
            
        }
        {
            error && <ErrorElement msg={error}/>
        }
            
        </>
    );
}

export default AddStudent;