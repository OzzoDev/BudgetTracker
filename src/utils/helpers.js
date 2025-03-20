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

  const totalIncome = calcTotalIncome(goal, pay).totalIncome;

  const totalAmount = expenses.reduce((acc, curr) => {
    const dateSpent = new Date(curr.dateSpent);

    const isWithinTimeSpan = dateSpent >= startDate && dateSpent <= endDate;

    if (isWithinTimeSpan) {
      return (acc += curr.totalAmount);
    }

    return acc;
  }, 0);

  const percentage = Math.round(((totalIncome - totalAmount) / goal.target) * 100) / 100;

  return {
    percentage,
    totalAmount,
    goal,
  };
}

export function calcTotalIncome(goal, pay) {
  const start = new Date(goal.startDate);
  const end = new Date(goal.endDate);
  const numDays = (end - start) / (1000 * 60 * 60 * 24);
  const dailyIncome = pay / 30;
  const totalIncome = dailyIncome * numDays;

  return {
    goal,
    totalIncome,
  };
}

export function formatWithDaySuffix(number) {
  if (number < 1) {
    return "> Every day";
  } else if (number === 1) {
    return "Every day";
  }

  const roundedNumber = Math.round(number);

  const suffixes = ["th", "st", "nd", "rd"];
  const value = roundedNumber % 100;

  let suffix;

  if (value >= 11 && value <= 13) {
    suffix = suffixes[0];
  } else {
    suffix = suffixes[roundedNumber % 10] || suffixes[0];
  }

  return `${roundedNumber}:${suffix}`;
}

export function getMonthlySpendingStats(expenses) {
  const monthlyTotals = expenses.reduce((acc, expense) => {
    const month = new Date(expense.dateSpent).toLocaleString("default", {
      month: "long",
      year: "numeric",
    });

    if (!acc[month]) {
      acc[month] = 0;
    }

    acc[month] += expense.totalAmount;
    return acc;
  }, {});

  const monthlyStats = Object.entries(monthlyTotals).map(([month, total]) => ({
    month,
    total,
  }));

  const highest = monthlyStats.reduce(
    (prev, curr) => (curr.total > prev.total ? curr : prev),
    monthlyStats[0]
  );
  const lowest = monthlyStats.reduce(
    (prev, curr) => (curr.total < prev.total ? curr : prev),
    monthlyStats[0]
  );

  const averageTotal = monthlyStats.reduce((sum, stat) => sum + stat.total, 0);
  const averageValue = averageTotal / monthlyStats.length;

  const averageMonth = monthlyStats.reduce((prev, curr) => {
    return Math.abs(curr.total - averageValue) < Math.abs(prev.total - averageValue) ? curr : prev;
  });

  return {
    highest: {
      month: capitalize(highest.month),
      total: highest.total,
    },
    average: {
      month: capitalize(averageMonth.month),
      total: averageValue,
    },
    lowest: {
      month: capitalize(lowest.month),
      total: lowest.total,
    },
  };
}
