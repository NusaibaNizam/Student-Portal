import "./Login.css"
import { useState} from "react";
import axios from "axios";
import ErrorElement from "../ErrorElement/ErrorElement";
import { Helmet } from "react-helmet-async";

const Login = (props) => {    
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState();

const handleSubmit = (event) => {
    event.preventDefault();
    const data={
        username:email,
        password:password
    }
    axios.post("http://localhost:8080/authenticate",data)
    .then(response=>{
        localStorage.setItem("access_token", 'Bearer '+response.data.accessToken)
        localStorage.setItem("authenticated", true)
        localStorage.setItem("username", response.data.username)
        localStorage.setItem("role", response.data.role)
        localStorage.setItem("userId", response.data.id)
        props.setUserName(response.data.username)
        props.setRole(response.data.role)
        props.setAuthenticated(true)
        props.setUserId( response.data.id) 
    }).catch(e=>{
        setError(e.response.data.message)
        
    })
};


    return (
        <>{ !error&&
            <>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <div className="main">
                <p className="sign" align="center">Login</p>
                <form onSubmit={handleSubmit} className="form1">

                    <input className="un " type="text" name="uname" placeholder="email" value={email}
                        onChange={(e) => setEmail(e.target.value)} required />

                    <input className="pass" type="password" name="pass" placeholder="password" value={password}
                        onChange={(e) => setPassword(e.target.value)} required />
                    <input type="submit" className="submit" />
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

export default Login;