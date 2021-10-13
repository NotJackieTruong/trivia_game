export const isNumber = (num: any): boolean => !isNaN(parseFloat(String(num)));
export const tryParseNumber = (num: any): any => {
  if (isNumber(num)) {
    return parseFloat(String(num));
  }
  return num;
};

export const roundMaxFixed = (num: number, decimals: number): number =>
  Number(`${Math.round(Number(String(`${num}e${decimals}`)))}e-${decimals}`);
