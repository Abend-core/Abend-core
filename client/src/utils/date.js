export const formatDate = (date) => {
  const newDate = new Date(date);
  const dateFormatted = newDate.toLocaleDateString("fr-FR");
  return dateFormatted;
};

export const formatDateTime = (date) => {
  const newDate = new Date(date);
  const dateFormatted = newDate.toLocaleString("fr-FR");
  return dateFormatted;
};
