import { Route, Routes } from "react-router-dom";
import Home from '../pages/Home'
import Login from "../pages/Login";
import CreateTable from "../pages/CreateTable";

const Routers = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<CreateTable />} />
       
      </Routes>
    </div>
  );
};

export default Routers;
