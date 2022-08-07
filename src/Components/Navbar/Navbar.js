import { Link } from "react-router-dom";
import './Navbar.css'
import { useNavigate } from "react-router-dom";
const NavBar = (props) => {
    const navigate=useNavigate()
    const handleLogout=()=>{
        localStorage.setItem("access_token","")
        localStorage.setItem("authenticated", false)
        props.setAuthenticated(false)
        localStorage.setItem("username", "")
        localStorage.setItem("role", "")
        localStorage.clear();
        navigate("/")
    }
    return (<>
        <div className="navbar">
            <ul>
                <li>
                    <h1>{props.userName}</h1>
                </li>
                <div>
                {props.currentTab!=="home"&&
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                }
                {props.role==="admin" && props.currentTab!=="addStudent" &&
                    <li>
                        <Link to="/add_student">Add Student</Link>
                    </li>
                }
                <li>
                    <button onClick={()=>{handleLogout()}} className="logout">Logout</button>
                </li>
                </div>
                
            </ul>
        </div>
    </>);
}

export default NavBar;