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

export function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function calcGoalProgression(goal, expenses, pay) {
  const startDate = new Date(goal.startDate);
  const endDate = new Date(goal.endDate);

  const totalAmount = expenses.reduce((acc, curr) => {
    const dateSpent = new Date(curr.dateSpent);

    const isWithinTimeSpan = dateSpent >= startDate && dateSpent <= endDate;

    if (isWithinTimeSpan) {
      return (acc += curr.totalAmount);
    }

    return acc;
  }, 0);

  console.log(pay, totalAmount, goal.target, (pay - totalAmount) / goal.target);

  const percentage = Math.round(((pay - totalAmount) / goal.target) * 100) / 100;

  return {
    percentage,
    totalAmount,
    goal,
  };
}
