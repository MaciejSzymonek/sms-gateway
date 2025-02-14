import { useState } from "react";

interface SearchBarProps<T> {
  data: T[]; // Full list of items
  setFilteredData: (filtered: T[]) => void; // Function to update filtered data
  searchFields: (keyof T)[]; // List of fields to search in
}

const SearchBar = <T,>({
  data,
  setFilteredData,
  searchFields,
}: SearchBarProps<T>) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (!query) {
      setFilteredData(data); // Reset if empty search
      return;
    }

    const lowerCaseQuery = query.toLowerCase();

    const filteredResults = data.filter((item) =>
      searchFields.some((field) =>
        String(item[field]).toLowerCase().includes(lowerCaseQuery)
      )
    );

    setFilteredData(filteredResults);
  };

  return (
    <div className="flex items-center space-x-2 mb-4 w-full p-3 text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
