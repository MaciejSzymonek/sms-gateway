import React, { useEffect, useState } from "react";
import Table from "./Table copy";
import { readCall } from "./ApiManager";

interface TableRow {
  user_id: string;
  name: string;
  customer_id: string;
  phone: string;
  role: string;
  status: string;
  sms_sent: string;
}

const UserTableHead: React.FC = () => {
  const [users, setUsers] = useState<TableRow[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { success, data, message } = await readCall("user", ""); // You can specify any ID if needed
      if (success) {
        try {
          // If 'data' is already an array, use it directly
          if (Array.isArray(data)) {
            const tableData: TableRow[] = data.map((user: any) => ({
              user_id: String(user.user_id),
              name: user.user_name || "N/A",
              customer_id: user.customer_id ? String(user.customer_id) : "N/A",
              phone: user.user_phonenumber || "N/A",
              role: user.user_role || "N/A",
              sms_sent: user.total_sms_sent,
              status: user.user_is_active ? "Active" : "Inactive",
            }));

            setUsers(tableData);
          } else {
            console.error("Expected an array but got:", data);
          }
        } catch (error) {
          console.error("Error parsing response data:", error);
        }
      } else {
        console.error("Error fetching users:", message);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <Table data={users} />
    </div>
  );
};

export default UserTableHead;
