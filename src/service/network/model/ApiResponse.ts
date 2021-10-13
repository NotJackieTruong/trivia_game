export interface ResponseType<T> {
  status: number;
  code: number;
  message: string;
  data: any;
}
export declare namespace OrderResponse {
  export interface Category {
    id: number;
    name: string;
    description: string;
    image_url: string;
    parent?: any;
  }

  export interface Provider {
    id: number;
    name: string;
    address: string;
    tel: string;
    password: string;
    contact_person_name: string;
    contact_person_tel: string;
    is_active: boolean;
    charge_rate: number;
  }

  export interface Origin {
    id: number;
    provider_ids: number[];
    farm: string;
    description: string;
    date: string;
    image_urls: string[];
    video_urls: string[];
  }

  export interface Product {
    id: number;
    name: string;
    category: Category;
    provider: Provider;
    description: string;
    price: number;
    origin: Origin;
    age: number;
    size: number;
    has_certificate: boolean;
    certificate_url: string;
    imported_time: Date;
  }

  export interface Seller {
    name: string;
    tel: string;
    address: string;
    avatar_url: string;
    is_active: boolean;
    commission_rate: number;
  }

  export interface Customer {
    name: string;
    tel: string;
    address: string;
  }

  export interface OrderDetailResponse {
    id: number;
    product: Product;
    core_seller: Seller;
    initial_seller: Seller;
    customer: Customer;
    order_code: string;
    customer_name: string;
    customer_tel: string;
    customer_address: string;
    amount: number;
    charge_rate_from_provider: number;
    charge_from_provider: number;
    is_paid_from_provider: boolean;
    commission_rate_to_seller: number;
    commission_to_seller: number;
    is_paid_to_seller: boolean;
    status: string;
    paid_amount: number;
    refund_amount?: any;
  }
}

export declare namespace Origin {
  export interface ResponseDetail {
    id: number;
    provider_ids: number[];
    farm: string;
    description: string;
    date: string;
    image_urls: string[];
    video_urls: string[];
  }
}
