export interface Address {
  id: string;
  label: string;
  recipient_name: string;
  phone: string;
  province_id: number;
  city_id: number;
  district: string;
  postal_code: string;
  full_address: string;
  is_default: boolean;
}

export interface AddressRequest {
  label: string;
  recipient_name: string;
  phone: string;
  province_id: number;
  city_id: number;
  district: string;
  postal_code: string;
  full_address: string;
  is_default?: boolean;
}
