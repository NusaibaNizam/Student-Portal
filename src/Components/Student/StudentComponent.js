import React from 'react';
import "./Student.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom";
import { faUserPen, faTrashCan} from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import {useNavigate } from 'react-router-dom';

const StudentComponent = (props) => {

    const navigate=useNavigate()
    const handleDelete=()=>{
        axios.delete("http://localhost:8080/api/students/?id="+props.id,{
            headers: {
                'Authorization': localStorage.getItem('access_token')
              }
        })
        .then(response=>{
            props.setIsDeleted(true)
            navigate("/")
        }).catch(e=>{
            console.log(e)
            navigate("/*")
        })
    }
    return (
        <>
            <div className="employee_card">
                <div className="img_container">
                    <img src="https://cdn-icons-png.flaticon.com/512/147/147142.png" alt="profile" />
                </div>
                <div className="container">
                    <div className="details_container">

                        <h1>{props.name}</h1>
                        <div className='details'>Student ID: {props.id}</div>
                        <div className='details'>Address: {props.address}</div>
                        {props.age && <div className='details'>Age: {props.age}</div>}
                    </div>
                    <div className="button_container">
                    {props.role==="admin" && <Link className="btn" to='/edit_student' state={{id:props.id,name:props.name,address:props.address,age:props.age}}><FontAwesomeIcon icon={ faUserPen} size="1x" /></Link>}
                    {props.role==="admin" &&props.userId!==props.id &&<button className="btn" target="Delete student?" onClick={handleDelete}><FontAwesomeIcon icon={faTrashCan} size="1x" /></button>}
                    </div>
                </div>

            </div>
        </>
    );
}

export default StudentComponent;