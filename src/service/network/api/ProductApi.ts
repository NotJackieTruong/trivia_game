import { ApiClient } from '../ApiService';
import { CreateUploadProductPayload } from '../model/ApiPayload';

export const ProductApi = {
  requestListProduct: (payload?: any) => ApiClient.get('products'),
  requestUpdateProduct: (payload: CreateUploadProductPayload, id: number) => ApiClient.put(`products/${id}`, payload),
  requestCreateProduct: (payload: CreateUploadProductPayload) => ApiClient.post('products', payload)
};

export default ProductApi;
