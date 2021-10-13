import { ApiClient } from '../ApiService';

export const ProviderApi = {
  getListProvider: () => ApiClient.get('providers')
};

export default ProviderApi;
