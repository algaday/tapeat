export const translateUnit = (unit: string): string => {
  switch (unit) {
    case 'litre':
      return 'литр';
    case 'ml':
      return 'мл';
    case 'kg':
      return 'кг';
    case 'g':
      return 'грамм';
    case 'piece':
      return 'штук';
    case 'pack':
      return 'пачка';
    default:
      return unit;
  }
};
