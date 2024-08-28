export const formatDate = (dateString) => {
    const date = new Date(dateString);
    
    // Format the date, adjust as per your preferred format
    return new Intl.DateTimeFormat('ru-RU', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(date);
  };