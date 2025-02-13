import React, { useEffect, useState } from "react";
import Table from "./Table copy";
import { readCall } from "./ApiManager";
import SearchBar from "./SearchBar";

interface Token {
  token_id: string;
  token_value: string;
  token_owner: string;
  token_expiry: string;
  token_status: string;
}

const TokenTableHead: React.FC = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [filteredTokens, setFilteredTokens] = useState<Token[]>([]);

  useEffect(() => {
    const fetchTokens = async () => {
      const { success, data } = await readCall("token", "");
      if (success && Array.isArray(data)) {
        const tableData: Token[] = data.map((token: any) => ({
          token_id: String(token.token_id),
          token_value: token.token_value || "N/A",
          token_owner: token.token_owner || "N/A",
          token_expiry: token.token_expiry || "N/A",
          token_status: token.token_is_active ? "Active" : "Inactive",
        }));

        setTokens(tableData);
        setFilteredTokens(tableData);
      }
    };

    fetchTokens();
  }, []);

  return (
    <div>
      <SearchBar
        data={tokens}
        setFilteredData={setFilteredTokens}
        searchFields={["token_value", "token_owner"]}
      />
      {filteredTokens.length > 0 ? (
        <Table data={filteredTokens} />
      ) : (
        <p className="text-center text-gray-500">No results found.</p>
      )}
    </div>
  );
};

export default TokenTableHead;
