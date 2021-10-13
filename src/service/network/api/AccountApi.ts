import { ApiClient } from '../ApiService';
import { LoginPayload } from '../model/ApiPayload';

export const AccountApi = {
  login: (payload: LoginPayload) => ApiClient.put('users/login', payload)
};

export default AccountApi;
