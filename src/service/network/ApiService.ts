import { load } from '../storage';

import { BASE_URL, TYPE_STORAGE } from '#config';
import { ResponseType } from '#models';
import NetworkHelper from '#utils/NetworkHelper';

const createAPI = () => {
  const APIInstant = require('axios').default.create();
  APIInstant.defaults.baseURL = BASE_URL;
  APIInstant.defaults.timeout = 20000;
  APIInstant.defaults.headers = { 'Content-Type': 'application/json' };
  APIInstant.interceptors.request.use(async (config: any) => {
    config.headers.token = await load(TYPE_STORAGE.TOKEN);
    return config;
  }, Promise.reject);

  APIInstant.interceptors.response.use((response: ResponseType<any>) => {
    const { data } = response;
    // if (data && data.code === 403) {
    //   showMessages(R.strings().notification, R.strings().re_login);
    //   AsyncStorage.setItem('token', '').then(() => {
    //     NavigationUtil.navigate('Auth');
    //   });
    // } else if (data && data.status !== 1) showMessages(R.strings().notification, data.message);
    return response;
  });
  return APIInstant;
};

const axiosClient = createAPI();

/* Support function */
function handleResult<T>(api: any, generic?: T) {
  if (NetworkHelper.isInternetReachable) {
    return api.then((res: any) => handleResponse<T>(res.data));
  } else {
    Promise.reject(new Error('Network offline'));
  }
}

function handleResponse<T>(data: ResponseType<T>) {
  // if (data.status != 1) return Promise.reject(new Error(data?.message || 'Co loi xay ra'));
  return Promise.resolve(data);
}

export const ApiClient = {
  get: (url: string, payload?: any) => handleResult(axiosClient.get(url, payload)),
  post: (url: string, payload: any) => handleResult(axiosClient.post(url, payload)),
  put: (url: string, payload?: any) => handleResult(axiosClient.put(url, payload)),
  path: (url: string, payload: any) => handleResult(axiosClient.patch(url, payload)),
  delete: (url: string, payload: any) => handleResult(axiosClient.delete(url, payload))
};
