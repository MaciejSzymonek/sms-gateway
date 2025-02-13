import React, { useEffect, useState } from "react";
import Table from "./Table copy";
import { readCall } from "./ApiManager";
import SearchBar from "./SearchBar";

interface Customer {
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
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const { success, data } = await readCall("customer", "");
      if (success && Array.isArray(data)) {
        const tableData: Customer[] = data.map((customer: any) => ({
          customer_id: String(customer.customer_id),
          customer_name: customer.customer_name || "N/A",
          customer_orgnr: customer.customer_orgnr || "N/A",
          customer_nr: customer.customer_nr || "N/A",
          customer_contact_person: customer.customer_contact_person || "N/A",
          customer_phone: customer.customer_phonenumber || "N/A",
          customer_final_date: customer.customer_final_date,
          customer_status: customer.customer_is_active ? "Active" : "Inactive",
        }));

        setCustomers(tableData);
        setFilteredCustomers(tableData);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div>
      <SearchBar
        data={customers}
        setFilteredData={setFilteredCustomers}
        searchFields={["customer_name", "customer_phone", "customer_orgnr"]}
      />
      {filteredCustomers.length > 0 ? (
        <Table data={filteredCustomers} />
      ) : (
        <p className="text-center text-gray-500">No results found.</p>
      )}
    </div>
  );
};

export default CustomerTableHead;
