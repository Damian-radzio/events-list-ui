const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = String(today.getMonth() + 1).padStart(2, '0');
const currentDay = String(today.getDate()).padStart(2, '0');
const currentHours = String(today.getHours()).padStart(2, '0');
const currentMinutes = String(today.getMinutes()).padStart(2, '0');

export const currentDayString = `${currentYear}-${currentMonth}-${currentDay}`;
export const currentTimeString = `${currentHours}:${currentMinutes}`;
