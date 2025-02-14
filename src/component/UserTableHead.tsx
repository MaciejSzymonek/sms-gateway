import React, { useEffect, useState } from "react";
import { readCall } from "./ApiManager";
import SearchBar from "./SearchBar";
import Table from "./Table copy";

// Define the interface for a user
interface User {
  user_id: string;
  user_name: string;
  user_email: string;
  user_role: string;
  user_status: string;
}

const UserTableHead: React.FC = () => {
  // State to store all users
  const [users, setUsers] = useState<User[]>([]);

  // State to store filtered users
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      const { success, data } = await readCall("user", "");

      // Make sure data is in the correct format
      if (success && Array.isArray(data)) {
        const tableData: User[] = data.map((user: any) => ({
          user_id: String(user.user_id),
          user_name: user.user_name || "N/A",
          user_email: user.user_email || "N/A",
          user_role: user.user_role || "N/A",
          user_status: user.user_is_active ? "Active" : "Inactive",
        }));

        setUsers(tableData);
        setFilteredUsers(tableData);
      }
    };

    fetchUsers();
  }, []); // Empty array means this effect runs only once on mount

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-700">
        User Management
      </h2>

      <div className="mb-4">
        <SearchBar
          data={users}
          setFilteredData={setFilteredUsers}
          searchFields={["user_name", "user_id", "user_role"]}
        />
      </div>

      {filteredUsers.length > 0 ? (
        <Table data={filteredUsers} />
      ) : (
        <p className="text-center text-gray-500">No results found.</p>
      )}
    </div>
  );
};

export default UserTableHead;
