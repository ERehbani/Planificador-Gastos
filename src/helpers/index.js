export const formatQuantity = quantity => {
  return Number(quantity).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export const formatDate = date => {
  const newDate = new Date(date);
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };

  return newDate.toLocaleDateString('es-ES', options);
};

export const generateId = () => {
  const random = Math.random().toString(36).substring(2, 11);
  const fecha = Date.now().toString(36);
  return random + fecha;
};
