export const formatDate = (dayType, day, month, year) => {
    let dayFormatted
    let monthFormatted
    const formatter = {
        day: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        month: ['Jan', 'Feb', 'March', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
       }
    for (let i = 0; i < 7; i++) {
      if (dayType === i) {
        dayFormatted = formatter.day[i]
      } 
    }
    for (let i = 1; i <= 12; i++) {
      if (month === i) {
        monthFormatted = formatter.month[i - 1]      
      }
    }
      return {
        dayNum: day,
        dayName: dayFormatted,
        monthNum: month,
        monthName: monthFormatted,
        year: year
      }
  }