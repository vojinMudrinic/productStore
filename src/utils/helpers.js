export const formatPrice = (price) => {
  if (!price) return;
  const formattedPrice = price.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return "$" + formattedPrice;
};

export const formatText = (text) => {
  if (!text || text.length === 0) return;

  return text.charAt(0).toUpperCase() + text.slice(1);
};
