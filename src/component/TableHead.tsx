import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "./Table";

interface TableRow {
  id: string;
  name: string;
  customer_id: string;
  phone: string;
  role: string;
  status: string;
}

const TableHead: React.FC = () => {
  const [users, setUsers] = useState<TableRow[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/GUIApi/user", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Raw response data:", response.data);

        let Snickers = JSON.stringify(response.data);
        const jsonString = Snickers.replace(/^string\(\d+\)\s+"/, "").trim();
        const usersArray = JSON.parse(jsonString);

        const tableData: TableRow[] = usersArray.map((user: any) => ({
          id: String(user.user_id), // Ensure id is a string
          name: user.user_name || "N/A",
          customer_id: user.customer_id ? String(user.customer_id) : "N/A", // Add customer_id
          phone: user.user_phonenumber || "N/A",
          role: user.user_role || "N/A",
          status: user.user_is_active ? "Active" : "Inactive",
        }));

        setUsers(tableData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <Table data={users} />
    </div>
  );
};

export default TableHead;
