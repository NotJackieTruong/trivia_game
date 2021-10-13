export interface LoginPayload {
  user: string;
  password: string;
  deviceId: string;
}

export interface CreateUploadProductPayload {
  name: string;
  category_id: number;
  provider_id: number;
  description: string;
  price: number;
  origin_id: number;
  age: number;
  size: number;
  has_certificate: boolean;
  certificate_url: string;
  imported_time?: Date;
}

export interface CreateEditOriginPayload {
  farm: string;
  description: string;
  date: string;
  image_urls: string[];
  video_urls: string[];
}

export interface GetListOrderPayload {
  search?: string;
  next?: string;
}
