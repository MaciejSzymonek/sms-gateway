import React, { useEffect, useState } from "react";

interface TableRow {
  user_id: string;
  name: string;
  customer_id: string;
  phone: string;
  role: string;
  status: string;
  sms_sent: string;
}

interface TableProps {
  data: TableRow[];
}

const Table: React.FC<TableProps> = ({ data }) => {
  const [tableData, setTableData] = useState<TableRow[]>([]);

  useEffect(() => {
    setTableData(data); // Sync with incoming data
  }, [data]);

  const [formData, setFormData] = useState<Omit<TableRow, "user_id">>({
    name: "",
    customer_id: "",
    phone: "",
    role: "",
    status: "",
    sms_sent: "",
  });

  const [showForm, setShowForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addOrUpdateRow = () => {
    if (
      !formData.name ||
      !formData.customer_id ||
      !formData.phone ||
      !formData.role ||
      !formData.status ||
      !formData.sms_sent
    ) {
      setErrorMessage("Please fill in all fields before adding a user.");
      return;
    }

    if (editingId) {
      setTableData(
        tableData.map((row) =>
          row.user_id === editingId ? { ...row, ...formData } : row
        )
      );
      console.log(formData); //in med upsert funktionen här
      setEditingId(null);
    } else {
      const newRow: TableRow = {
        user_id: (tableData.length + 1).toString(),
        ...formData,
      };
      setTableData([...tableData, newRow]);
    }

    setFormData({
      name: "",
      customer_id: "",
      phone: "",
      role: "",
      status: "",
      sms_sent: "",
    });
    setErrorMessage("");
  };

  const deleteRow = (user_id: string) => {
    setTableData(tableData.filter((row) => row.user_id !== user_id));
  };

  const modifyRow = (user_id: string) => {
    const rowToEdit = tableData.find((row) => row.user_id === user_id);
    window.location.replace("http://localhost:5173/tables#upsertForm");
    if (rowToEdit) {
      setFormData({ ...rowToEdit });
      setEditingId(user_id);
      setShowForm(true);
    }
  };

  return (
    <div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Id</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Customer Id</th>
            <th className="border border-gray-300 px-4 py-2">Phone</th>
            <th className="border border-gray-300 px-4 py-2">Role</th>
            <th className="border border-gray-300 px-4 py-2">SMS sent</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <tr key={row.user_id} className="border border-gray-300">
              <td className="border border-gray-300 px-4 py-2">
                {row.user_id}
              </td>
              <td className="border border-gray-300 px-4 py-2">{row.name}</td>
              <td className="border border-gray-300 px-4 py-2">
                {row.customer_id}
              </td>
              <td className="border border-gray-300 px-4 py-2">{row.phone}</td>
              <td className="border border-gray-300 px-4 py-2">{row.role}</td>
              <td className="border border-gray-300 px-4 py-2">
                {row.sms_sent}
              </td>
              <td className="border border-gray-300 px-4 py-2">{row.status}</td>

              <td className="border border-gray-300 px-4 py-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600"
                  onClick={() => modifyRow(row.user_id)}
                >
                  Modify
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  onClick={() => {
                    deleteRow(row.user_id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4">
        <button
          id="upsertForm"
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          onClick={() => {
            setShowForm(!showForm);
            window.location.replace("http://localhost:5173/tables#upsertForm");
          }}
        >
          {showForm ? "Hide" : "Add User"}
        </button>
      </div>

      {showForm && (
        <div className="mt-4 p-4 border rounded-md bg-gray-100">
          <h3 className="text-lg font-bold mb-2">
            {editingId ? "Modify User" : "Add New User"}
          </h3>

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            className="block w-full px-3 py-2 border rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="text"
            name="customer_id"
            placeholder="Customer user_id"
            value={formData.customer_id}
            onChange={handleInputChange}
            className="block w-full px-3 py-2 border rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="block w-full px-3 py-2 border rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className="block w-full px-3 py-2 border rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Role</option>
            <option value="admin">admin</option>
            <option value="user">user</option>
            <option value="manager">manager</option>
          </select>

          <input
            type="text"
            name="sms_sent"
            placeholder="0"
            value={formData.sms_sent}
            onChange={handleInputChange}
            className="block w-full px-3 py-2 border rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="block w-full px-3 py-2 border rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600"
            onClick={addOrUpdateRow}
          >
            {editingId ? "Update" : "Add to List"}
          </button>

          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        </div>
      )}
    </div>
  );
};

export default Table;
