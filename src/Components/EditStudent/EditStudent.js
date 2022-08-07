import "./EditStudent.css"
import { useLocation, useNavigate } from 'react-router-dom';
import { useState,useEffect } from "react";
import axios from "axios";
import ErrorElement from "../ErrorElement/ErrorElement";
import { Helmet } from "react-helmet-async";

const EditStudent = (props) => {
    useEffect(()=>{
        props.setCurrentTab("")
    },[props])

    const navigate = useNavigate()
    const location = useLocation();
    const id = location.state.id;
    const nameProp = location.state.name;
    const addressProp = location.state.address;
    const ageProp = location.state.age;


    const [name, setName] = useState(nameProp)
    const [address, setAddress] = useState(addressProp)
    const [age, setAge] = useState(ageProp)
    const [error, setError] = useState();


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            id: id,
            name: name,
            age: age,
            address: address
        }
        axios.put("http://localhost:8080/api/students/?id=" + id, data, {
            headers: {
                'Authorization': localStorage.getItem('access_token')
            }
        })
            .then(response => {
                navigate("/")
            }).catch(e => {
                setError(e.response.data.error)
            })
    };
    return (
        <>{!error &&

            <>
            <Helmet>
                <title>Update Student</title>
            </Helmet>

            <div className="signupFrm">
                <form action="" className="form" onSubmit={handleSubmit}>
                    {id && <h1 className="title">Student ID: {id}</h1>}

                    <div className="inputContainer">
                        <input type="text" className="input" value={name} onChange={(e) => setName(e.target.value)} required />
                        <label htmlFor="" className="label">Name</label>
                    </div>

                    <div className="inputContainer">
                        <input type="text" className="input" value={address} onChange={(e) => setAddress(e.target.value)} required />
                        <label htmlFor="" className="label">Address</label>
                    </div>
                    <div className="inputContainer">
                        <input type="text" className="input" value={age} onChange={(e) => setAge(e.target.value)} required />
                        <label htmlFor="" className="label">Age</label>
                    </div>

                    {id && <input type="submit" className="updateBtn btn" value="Update" />}
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

export default EditStudent;