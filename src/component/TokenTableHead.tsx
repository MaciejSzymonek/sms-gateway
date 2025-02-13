import React, { useEffect, useState } from "react";
import Table from "./Table copy";
import { readCall } from "./ApiManager";

interface TableRow {
  token_id: string;
  token_user_id: string;
  token: string;
  token_created_at: string;
  token_expires_at: string;
  token_type: string;
}

const TokenTableHead: React.FC = () => {
  const [tokens, settokens] = useState<TableRow[]>([]);

  useEffect(() => {
    const fetchtokens = async () => {
      const { success, data, message } = await readCall("token", ""); // You can specify any ID if needed
      if (success) {
        try {
          // If 'data' is already an array, use it directly
          if (Array.isArray(data)) {
            const tableData: TableRow[] = data.map((token: any) => ({
              token_id: String(token.token_id),
              token_user_id: token.token_user_id || "N/A",
              // Split the token by the dots, then join everything after the second dot
              token: token.token
                ? token.token.split(".").slice(2).join(".")
                : "N/A",
              token_created_at: token.token_created_at || "N/A",
              token_expires_at: token.token_expires_at || "N/A",
              token_type: token.token_type || "N/A",
            }));

            settokens(tableData);
          } else {
            console.error("Expected an array but got:", data);
          }
        } catch (error) {
          console.error("Error parsing response data:", error);
        }
      } else {
        console.error("Error fetching tokens:", message);
      }
    };

    fetchtokens();
  }, []);

  return (
    <div>
      <Table data={tokens} />
    </div>
  );
};

export default TokenTableHead;
