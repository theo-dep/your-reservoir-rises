function currentDay() {
  return new Date().getDate();
}

function currentMonth() {
  return new Date().getMonth() + 1;
}

function currentYear(): number {
  return new Date().getFullYear();
}

export { currentDay, currentMonth, currentYear };
