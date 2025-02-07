// src/Home.tsx
import { useNavigate } from "react-router-dom";
import TableHead from "../component/TableHead";
import LogOut from "../component/LogOut";

const Tables = () => {
  const navigate = useNavigate();

  const goTologinPage = () => {
    navigate("/"); // This will navigate to the login page
  };

  return (
    <div className="p-2">
      <LogOut />
      <button onClick={goTologinPage}></button>
      <TableHead />
    </div>
  );
};

export default Tables;
