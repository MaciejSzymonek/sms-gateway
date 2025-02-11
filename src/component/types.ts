export interface UserParams {
  user_id: string;
  customer_id: number;
  user_name: string;
  user_phonenumber: string;
  user_role: string;
  user_is_active: boolean;
}

export interface CustomerParams {
  customer_name: string;
  customer_orgnr: number;
  customer_nr: string;
  customer_contact_person: string;
  customer_phonenumber: string;
  customer_final_date: string;
  customer_is_active: boolean;
}
