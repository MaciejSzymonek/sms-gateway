// src/Home.tsx
import { useNavigate } from "react-router-dom";

import Header from "../component/Header";
import TableNav from "../component/TableNavBody";

const Tables = () => {
  const navigate = useNavigate();
  const handleClick = (type: string) => {
    navigate(`/${type}`);
  };

  return (
    <>
      <Header title="Tables" />
      <TableNav
        onUserClick={() => handleClick("userTable")}
        onCustomerClick={() => handleClick("customerTable")}
        onTokenClick={() => handleClick("tokenTable")}
      />
    </>
  );
};

export default Tables;
