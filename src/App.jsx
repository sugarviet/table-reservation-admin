import { Fragment } from 'react';
import './App.css'
import Layout from './components/Layout';
import Login from './pages/Login/Login';
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");


  if(!token) {
    navigate("/", { replace: true });
    return (
      <Login />
    )
  }

  return (
    <Fragment>
      <Layout />
    </Fragment>
  )
}

export default App
