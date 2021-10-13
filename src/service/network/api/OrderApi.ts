import { ApiClient } from '../ApiService';
import { GetListOrderPayload } from '../model/ApiPayload';
import { getUrlNextPage } from '#utils/FuncHelper';

export const OrderApi = {
  listOrder: (payload?: GetListOrderPayload) => {
    const url = payload?.next ? getUrlNextPage(payload?.next) : '/orders';
    return ApiClient.get(`${url}?customer_name=${payload?.search || ''}`);
  },
  orderDetail: id => {
    return ApiClient.get(`/orders/${id}`);
  },
  createOrder: (payload: any) => ApiClient.post('/orders', payload),
  prePayment: (id: number, payload: any) => ApiClient.put(`/orders/${id}/perform_prepayment`, payload),
  providerConfirm: (id: number, payload?: any) => ApiClient.put(`/orders/${id}/provider_confirm`, payload),
  fullPayment: (id: number, payload?: any) => ApiClient.put(`/orders/${id}/perform_fullpayment`, payload),
  markShipping: (id: number, payload?: any) => ApiClient.put(`/orders/${id}/mark_shipping`, payload),
  markDone: (id: number, payload?: any) => ApiClient.put(`/orders/${id}/mark_done`, payload),
  performCancel: (id: number, payload?: any) => ApiClient.put(`/orders/${id}/perform_cancellation`, payload),
  claim: (id: number) => ApiClient.put(`/orders/${id}/claim`),
  perform_refunding: (id: number) => ApiClient.put(`/orders/${id}/claim`)
};

export default OrderApi;
