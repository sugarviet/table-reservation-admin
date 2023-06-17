import { Route, Routes } from "react-router-dom";
import Home from '../pages/Home'
import Login from "../pages/Login";


const Routers = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
       
      </Routes>
    </div>
  );
};

export default Routers;
