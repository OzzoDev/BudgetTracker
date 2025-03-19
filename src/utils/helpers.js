export function generateID(array) {
  if (array.length === 0) {
    return "1";
  } else {
    return String(Math.max(...array.map((item) => parseInt(item))) + 1);
  }
}

export const getTodayString = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

export const getFutureDateString = (days) => {
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + days);
  return futureDate.toISOString().split("T")[0];
};

export function capitalize(str) {
  if (!str) return "";

  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
