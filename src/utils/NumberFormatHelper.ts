export function formatNumberToString(value: string | number) {
  if (!value) {
    return '';
  }
  return value.toString().split(',').join('');
}

export function formatPrice(num: any, unit = '') {
  if (num === null || num === undefined || num === 0 || Number.isNaN(parseFloat(num))) {
    return '';
  }
  const result = num.toString().replace(/,/g, '');

  if (unit) {
    return `${result.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} ${unit}`;
  }
  return `${result.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;
}
