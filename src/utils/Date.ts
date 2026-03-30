function currentDay() {
  return new Date().getDate();
}

function currentMonth() {
  return new Date().getMonth() + 1;
}

function currentYear(): number {
  return new Date().getFullYear();
}

function dateToString(day: string, month: string, year: string): string {
  return `${day}/${month}/${year}`;
}

export { currentDay, currentMonth, currentYear, dateToString };
