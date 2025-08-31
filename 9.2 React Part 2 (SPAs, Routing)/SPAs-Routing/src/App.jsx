import './App.css'
import { BrowserRouter, Routes, Route, Link, useNavigate, Outlet } from "react-router-dom"


function App() {
  return <div>
    <BrowserRouter>
      <Routes>
        <Route path='/' element= {<Layout />}>
          <Route path='/neet/online-coaching-class-11' element={<Class11Program />}></Route>
          <Route path='/neet/online-coaching-class-12' element={<Class12Program />}></Route>
          <Route path='/' element={<Landing />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </div>  
}

function Landing(){ 
  return <div>
    Welcome to Allen
  </div>
}

function Class11Program() {
  return <div>
    NEET programs for class 11th
  </div>
}

function Class12Program() {

  const navigate = useNavigate();
  function reidrectUser(){

    navigate("/")
  }
  return <div>
    NEET programs for class 12th
    <button onClick={reidrectUser}>Go back to landing page</button>
  </div>
}

function Header() {
  return <div>
    <Link to="/">Allen |</Link>
    <Link to="/neet/online-coaching-class-11"> Class 11 |</Link>
    <Link to="/neet/online-coaching-class-12"> Class 12</Link>
  </div>
}

function Layout() {
  return <div style={{ background: "green" }}>
    <Header />
    <div style={{ background: "red" }}>
      <Outlet />
    </div>
    footer
  </div>
}

export default App
