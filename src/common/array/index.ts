import { onChangeAlias } from '../string/index';

export const onSearchAllProperties = (source: Array<any>, textSearch: string | number): Array<any> =>
  source.filter(x => Object.keys(x).some(key => onChangeAlias(x[key]).search(onChangeAlias(textSearch)) !== -1));
export const onCheckArray = (source: any) => {
  if (Array.isArray(source)) {
    return source;
  }
  return [];
};
