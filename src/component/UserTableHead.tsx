import React, { useEffect, useState } from "react";
import Table from "./Table copy";
import { readCall } from "./ApiManager";
import SearchBar from "./SearchBar";

interface User {
  user_id: string;
  user_name: string;
  user_phonenumber: string;
  user_role: string;
  user_is_active: string;
  user_total_sms_sent: string;
}

const UserTableHead: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { success, data } = await readCall("user", "");
      if (success && Array.isArray(data)) {
        const tableData: User[] = data.map((user: any) => ({
          user_id: String(user.user_id),
          user_name: user.user_name || "N/A",
          user_phonenumber: user.user_phonenumber || "N/A",
          user_role: user.user_role || "N/A",
          user_is_active: user.user_is_active ? "Active" : "Inactive",
          user_total_sms_sent: user.total_sms_sent || "0",
        }));

        setUsers(tableData);
        setFilteredUsers(tableData);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <SearchBar
        data={users}
        setFilteredData={setFilteredUsers}
        searchFields={["user_name", "user_id", "user_role"]}
      />
      {filteredUsers.length > 0 ? (
        <Table data={filteredUsers} />
      ) : (
        <p className="text-center text-gray-500">No results found.</p>
      )}
    </div>
  );
};

export default UserTableHead;
