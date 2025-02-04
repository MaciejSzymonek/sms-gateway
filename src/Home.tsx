// src/Home.tsx
import { useNavigate } from "react-router-dom";
import TableHead from "./component/TableHead";
import LogOut from "./component/LogOut";

const Home = () => {
  const navigate = useNavigate();

  const goToAboutPage = () => {
    navigate("/Login"); // This will navigate to the About page
  };

  return (
    <div className="p-2">
      <LogOut />
      <button onClick={goToAboutPage}></button>
      <TableHead />
    </div>
  );
};

export default Home;
