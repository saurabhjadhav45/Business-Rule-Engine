// add needed utils here
export const falsyArray = [null, undefined, ''];

export const isFalsy = (key: unknown) =>
  falsyArray.includes(key as null | string | undefined);

// show amount with rupee symbol and coma as per indian standards.
export const InrAmount = (val: string | number) => {
  if (typeof val === 'number') val = val.toString();
  return `₹ ${val?.replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}`;
};
