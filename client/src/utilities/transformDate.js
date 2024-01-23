export function transformDate(date, time) {
    const currentDate = new Date();
  
    const comparatorDate = new Date(date.split('T')[0]);
  
    return comparatorDate.getDate() === currentDate.getDate() &&
      comparatorDate.getMonth() === currentDate.getMonth()
      ? `Today, ${time > 12 ? `${time % 12} PM` : `${time} AM`}`
      : `${date?.slice(0, 10).split('-').reverse().join('-')}, ${
          time > 12 ? `${time % 12} PM` : `${time} AM`
        }`;
  }