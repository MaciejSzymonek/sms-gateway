import React, { useEffect, useState } from "react";
import Table from "./Table copy";
import { readCall } from "./ApiManager";
import SearchBar from "./SearchBar";

interface Token {
  token_id: string;
  token_user_id: string;
  token: string;
  token_created_at: string;
  token_expires_at: string;
  token_type: string;
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
          token_user_id: token.token_user_id || "N/A",
          token: token.token.split(".")[2] || "N/A",
          token_created_at: token.token_created_at || "N/A",
          token_expires_at: token.token_expires_at,
          token_type: token.token_type || "N/A",
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
        searchFields={["token_user_id", "token_type", "token_created_at"]}
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
