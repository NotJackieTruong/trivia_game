import { ApiClient } from '../ApiService';

export const CategoryApi = {
  getListCategory: () => ApiClient.get('product-categories')
};

export default CategoryApi;
