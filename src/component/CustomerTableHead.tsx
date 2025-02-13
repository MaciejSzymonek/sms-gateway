import React, { useEffect, useState } from "react";
import Table from "./Table copy";
import { readCall } from "./ApiManager";

interface TableRow {
  customer_id: string;
  customer_name: string;
  customer_orgnr: string;
  customer_nr: string;
  customer_contact_person: string;
  customer_phone: string;
  customer_final_date: string;
  customer_status: string;
}

const CustomerTableHead: React.FC = () => {
  const [customers, setCustomers] = useState<TableRow[]>([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const { success, data, message } = await readCall("customer", ""); // You can specify any ID if needed
      if (success) {
        try {
          // If 'data' is already an array, use it directly
          if (Array.isArray(data)) {
            const tableData: TableRow[] = data.map((customer: any) => ({
              customer_id: String(customer.customer_id),
              customer_name: customer.customer_name || "N/A",
              customer_orgnr: customer.customer_orgnr || "N/A",
              customer_nr: customer.customer_nr || "N/A",
              customer_contact_person:
                customer.customer_contact_person || "N/A",
              customer_phone: customer.customer_phonenumber || "N/A",
              customer_final_date: customer.customer_final_date,
              customer_status: customer.customer_is_active
                ? "Active"
                : "Inactive",
            }));

            setCustomers(tableData);
          } else {
            console.error("Expected an array but got:", data);
          }
        } catch (error) {
          console.error("Error parsing response data:", error);
        }
      } else {
        console.error("Error fetching customers:", message);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div>
      <Table data={customers} />
    </div>
  );
};

export default CustomerTableHead;
