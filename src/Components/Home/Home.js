import Loading from '../Loading/Loading';
import StudentContainerComponent from '../StudentContainer/StudentContainerComponent';
import ErrorElement from '../ErrorElement/ErrorElement';
import useFetch from "../../Hooks/useFetch";
import SearchBar from '../SearchBar/Searchbar';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
const Home = (props) => {
  useEffect(()=>{
    props.setCurrentTab("home")
  },[props])
  const [isDeleted, setIsDeleted] = useState()
  const [url,setUrl]=useState("http://localhost:8080/api/students")
  const { datas, isPending, error } = useFetch(url,'get',isDeleted,setIsDeleted, setUrl)
    return ( 
        <>
        
        {!error &&
          <Helmet>
            <title>Home</title>
          </Helmet> 
        }
        {isPending && <Loading />}
        {datas && <SearchBar setUrl={setUrl} />}
        {!error && datas && <StudentContainerComponent datas={datas} role={props.role} setIsDeleted={setIsDeleted} userId={props.userId} />}
        {error && <ErrorElement msg={error} />}
        
        </>
     );
}
 
export default Home;
