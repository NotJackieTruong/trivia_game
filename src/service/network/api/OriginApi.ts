import { ApiClient } from '../ApiService';
import { CreateEditOriginPayload } from '../model/ApiPayload';

export const OriginApi = {
  getListOrigin: (payload?: any) => ApiClient.get('/product-origins'),
  createOrigin: (payload: CreateEditOriginPayload) => ApiClient.post('/product-origins', payload),
  updateOrigin: (payload: CreateEditOriginPayload, id: number) => ApiClient.put(`/product-origins/${id}`, payload)
};

export default OriginApi;
