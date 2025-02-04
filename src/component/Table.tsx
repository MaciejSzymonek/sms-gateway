import React, { useState } from "react";

interface TableRow {
  id: string;
  name: string;
  customer_id: string;
  phone: string;
  role: string;
  status: string;
}

interface TableProps {
  data: TableRow[];
}

const Table: React.FC<TableProps> = ({ data }) => {
  const [tableData, setTableData] = useState<TableRow[]>(data);
  const [formData, setFormData] = useState<Omit<TableRow, "id">>({
    name: "",
    customer_id: "",
    phone: "",
    role: "",
    status: "",
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
      !formData.status
    ) {
      setErrorMessage("Please fill in all fields before adding a user.");
      return;
    }

    if (editingId) {
      setTableData(
        tableData.map((row) =>
          row.id === editingId ? { ...row, ...formData } : row
        )
      );
      setEditingId(null);
    } else {
      const newRow: TableRow = {
        id: (tableData.length + 1).toString(),
        ...formData,
      };
      setTableData([...tableData, newRow]);
    }

    setFormData({ name: "", customer_id: "", phone: "", role: "", status: "" });
    setErrorMessage("");
  };

  const deleteRow = (id: string) => {
    setTableData(tableData.filter((row) => row.id !== id));
  };

  const modifyRow = (id: string) => {
    const rowToEdit = tableData.find((row) => row.id === id);
    if (rowToEdit) {
      setFormData({ ...rowToEdit });
      setEditingId(id);
      setShowForm(true);
    }
  };

  return (
    <div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Customer ID</th>
            <th className="border border-gray-300 px-4 py-2">Phone</th>
            <th className="border border-gray-300 px-4 py-2">Role</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <tr key={row.id} className="border border-gray-300">
              <td className="border border-gray-300 px-4 py-2">{row.id}</td>
              <td className="border border-gray-300 px-4 py-2">{row.name}</td>
              <td className="border border-gray-300 px-4 py-2">
                {row.customer_id}
              </td>
              <td className="border border-gray-300 px-4 py-2">{row.phone}</td>
              <td className="border border-gray-300 px-4 py-2">{row.role}</td>
              <td className="border border-gray-300 px-4 py-2">{row.status}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => modifyRow(row.id)}
                >
                  Modify
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => deleteRow(row.id)}
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
          className="bg-green-500 text-white px-4 py-2 rounded-md"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Hide Add User Form" : "Show Add User Form"}
        </button>
      </div>

      {showForm && (
        <div className="mt-4 p-4 border rounded-md bg-gray-100">
          <h3 className="text-lg font-bold">
            {editingId ? "Modify User" : "Add New User"}
          </h3>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            className="block w-full px-3 py-2 border rounded-md mt-2"
          />
          <input
            type="text"
            name="customer_id"
            placeholder="Customer ID"
            value={formData.customer_id}
            onChange={handleInputChange}
            className="block w-full px-3 py-2 border rounded-md mt-2"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="block w-full px-3 py-2 border rounded-md mt-2"
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className="block w-full px-3 py-2 border rounded-md mt-2"
          >
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
            <option value="Guest">Guest</option>
            <option value="Manager">Manager</option>
            <option value="Support">Support</option>
          </select>

          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="block w-full px-3 py-2 border rounded-md mt-2"
          >
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Pending">Pending</option>
          </select>

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
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
