import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { deleteCall } from "./ApiManager";
import { MdOutlineDelete } from "react-icons/md";

interface TableProps {
  data: Record<string, any>[]; // Accepts any key-value data
}

const Table: React.FC<TableProps> = ({ data }) => {
  const [tableData, setTableData] = useState<Record<string, any>[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    setTableData(data);
    if (data.length > 0) {
      setColumns(Object.keys(data[0])); // Extract column headers dynamically
    }
  }, [data]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const deleteRow = (id: string) => {
    const response = deleteCall("user", id);
    setTableData(tableData.filter((row) => row.user_id !== id));
    console.log(response);
  };

  const modifyRow = (id: string) => {
    const rowToEdit = tableData.find((row) => row.user_id === id);
    if (rowToEdit) {
      setFormData({ ...rowToEdit });
      setEditingId(id);
      setShowForm(true);
    }
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
          row.user_id === editingId ? { ...row, ...formData } : row
        )
      );
      setEditingId(null);
    } else {
      const newRow = {
        user_id: (tableData.length + 1).toString(),
        ...formData,
      };
      setTableData([...tableData, newRow]);
    }

    setFormData({});
    setErrorMessage("");
    setShowForm(false);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            {columns.map((col) => (
              <th
                key={col}
                className="border border-gray-300 px-4 py-2 capitalize"
              >
                {col.replace("_", " ")}
              </th>
            ))}
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index} className="border border-gray-300">
              {columns.map((col) => (
                <td key={col} className="border border-gray-300 px-4 py-2">
                  {row[col]}
                </td>
              ))}
              <td className="border border-gray-300 px-4 py-2 flex gap-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  onClick={() => modifyRow(row.user_id)}
                >
                  <CiEdit />
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  onClick={() => {
                    if (
                      window.confirm(
                        `Are you sure you want to delete ${row.user_id}?`
                      )
                    ) {
                      deleteRow(row.user_id);
                    }
                  }}
                >
                  <MdOutlineDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        className="bg-green-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-green-600"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Hide Form" : "Add User"}
      </button>

      {showForm && (
        <div className="mt-4 p-4 border rounded-md bg-gray-100">
          <h3 className="text-lg font-bold mb-2">
            {editingId ? "Modify User" : "Add New User"}
          </h3>

          {columns.map((col) =>
            col !== "user_id" ? (
              <input
                key={col}
                type="text"
                name={col}
                placeholder={col.replace("_", " ")}
                value={formData[col] || ""}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 border rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            ) : null
          )}

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
