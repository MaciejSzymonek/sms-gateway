import React, { useEffect, useState } from "react";

interface TableProps {
  data: Record<string, any>[]; // Accepts any key-value data
}

const Table: React.FC<TableProps> = ({ data }) => {
  const [tableData, setTableData] = useState<Record<string, any>[]>([]);
  const [columns, setColumns] = useState<string[]>([]);

  useEffect(() => {
    setTableData(data);
    if (data.length > 0) {
      setColumns(Object.keys(data[0])); // Extracts column headers dynamically
    }
  }, [data]);

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
              <td className="border border-gray-300 px-4 py-2">
                {/* Placeholder for future actions */}
                <button className="text-blue-500 hover:underline">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
