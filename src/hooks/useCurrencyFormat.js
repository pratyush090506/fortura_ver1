import { useCurrency } from '../context/CurrencyContext';

export const useCurrencyFormat = () => {
  const { convertCurrency, formatCurrency, currentCurrency, isLoading } = useCurrency();

  const formatAmount = (amount, fromCurrency = 'INR') => {
    try {
      if (isLoading) return `${amount}`;
      const convertedAmount = convertCurrency(amount, fromCurrency);
      return formatCurrency(convertedAmount);
    } catch (error) {
      console.error('Error formatting amount:', error);
      return `${amount}`;
    }
  };

  const formatAmountWithSymbol = (amount, fromCurrency = 'INR') => {
    try {
      if (isLoading) return {
        amount,
        formatted: `${amount}`,
        currency: currentCurrency
      };
      const convertedAmount = convertCurrency(amount, fromCurrency);
      return {
        amount: convertedAmount,
        formatted: formatCurrency(convertedAmount),
        currency: currentCurrency
      };
    } catch (error) {
      console.error('Error formatting amount with symbol:', error);
      return {
        amount,
        formatted: `${amount}`,
        currency: currentCurrency
      };
    }
  };

  return {
    formatAmount,
    formatAmountWithSymbol,
    currentCurrency,
    isLoading
  };
}; 