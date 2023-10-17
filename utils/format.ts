function getNum(value?: string | number) {
  const num = value || 0;
  return typeof num === 'string' ? Number(num) : num;
}

export const digitalFormat = {
  integer(value?: string | number) {
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      maximumFractionDigits: 0,
    }).format(getNum(value));
  },
  decimal(value?: string | number, fractionDigits?: number) {
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      maximumFractionDigits: fractionDigits,
    }).format(getNum(value));
  },
  significant(value?: string | number, significantDigits?: number) {
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      useGrouping: false,
      maximumSignificantDigits: significantDigits,
    }).format(getNum(value));
  },
  currency(value?: string | number) {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    }).format(getNum(value));
  },
  percent(value?: string | number) {
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
    }).format(getNum(value));
  },
};
