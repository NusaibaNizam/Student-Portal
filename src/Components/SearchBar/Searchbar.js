import "./Searchbar.css"
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from "react";
const SearchBar = (props) => {
    const [name, setName] = useState("")
    const handleSearch=()=>{
        if(name!==""){
            props.setUrl("http://localhost:8080/api/students/?name="+name)
            setName("")
        }else{
            props.setUrl("http://localhost:8080/api/students")
        }
    }
    return (
        <>
            <div id="cover">
                <div className="searchfrm">
                    <div className="tb">
                        <div className="td"><input className="input_search" type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} required/></div>
                        <div className="td" id="s-cover">
                            <button className="searchbtn" onClick={handleSearch}>
                                <FontAwesomeIcon className="icon" icon={faSearch} size="2x" />
                                <span></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SearchBar;