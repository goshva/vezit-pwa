export const formatDate = (dateString) => {
  const date = new Date(dateString);

  // Format the date, adjust as per your preferred format
  return new Intl.DateTimeFormat("ru-RU", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};
export const formatTimeElapsed = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();

  // Разница во времени в миллисекундах
  const timeDifference = now - date;

  // Переводим миллисекунды в дни, часы, минуты
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);

  let result = "";

  if (days > 0) {
    result = `${days} ${days === 1 ? "день" : days < 5 ? "дня" : "дней"}`;
  } else if (hours > 0) {
    result = `${hours} ${hours === 1 ? "час" : hours < 5 ? "часа" : "часов"}`;
  } else if (minutes > 0) {
    result = `${minutes} ${
      minutes === 1 ? "минута" : minutes < 5 ? "минуты" : "минут"
    }`;
  } else {
    result = "менее минуты";
  }

  return result;
};
// Method to toggle date format
// Method to toggle date format
export const toggleDateFormat = (dateFormat) => {
  dateFormat.value = dateFormat.value === "elapsed" ? "absolute" : "elapsed";
};

// Method to format date based on the current format
export const formatDateBasedOnFormat = (dateString, dateFormat) => {
  return dateFormat.value === "elapsed"
    ? formatTimeElapsed(dateString)
    : formatDate(dateString);
};
