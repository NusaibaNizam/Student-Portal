import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import EditStudent from './Components/EditStudent/EditStudent';
import AddStudent from './Components/EditStudent/AddStudents';
import NavBar from './Components/Navbar/Navbar';
import ErrorElement from './Components/ErrorElement/ErrorElement';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';

function App() {
  const [authenticated, setAuthenticated] = useState(false)
  const [userName, setUserName] = useState()
  const [role, setRole] = useState()
  const [userId, setUserId] = useState()
  const [currentTab, setCurrentTab] = useState()
  useEffect(() => {
    setAuthenticated(localStorage.getItem("authenticated"))
    setUserName(localStorage.getItem("username"))
    setRole(localStorage.getItem("role"))
    setUserId(localStorage.getItem("userId"))
  }, [])
  return (
    <>
    <HelmetProvider>
      <Router>
        <div className="App">
          {authenticated && <NavBar setAuthenticated={setAuthenticated} userName={userName} role={role} currentTab={currentTab} />}
          <Routes>
            {!authenticated && <Route path='/' element={<Login setAuthenticated={setAuthenticated} setUserName={setUserName} setRole={setRole}
             setUserId={setUserId} />} />}
            {authenticated && <Route path='/' element={<Home role={role} userId={userId} setCurrentTab={setCurrentTab} />} />}
            {authenticated && <Route path='/edit_student' element={<EditStudent  setCurrentTab={setCurrentTab}  />}/>}
            {authenticated && <Route path='/add_student' element={<AddStudent setCurrentTab={setCurrentTab} />} />}
            <Route path='/*'  element={<ErrorElement msg="Not found" />}/>

          </Routes>
        </div>
      </Router>
      </HelmetProvider>
    </>
  );
}

export default App;
