interface DateFormatterReturn {
  date: string
  color: string
}

export const dateFormatter = (inputDate: string): DateFormatterReturn => {
  const dateObj = new Date(inputDate)

  const year: number = dateObj.getFullYear()
  const month: number = dateObj.getMonth() + 1
  const day: number = dateObj.getDate()
  const hours: number = dateObj.getHours()
  const minutes: number = dateObj.getMinutes()

  const period: string = hours < 12 ? 'AM' : 'PM'

  const displayHours: number = hours > 12 ? hours - 12 : hours

  const date: string = `${year}/${month}/${day} ${displayHours}:${minutes} ${period}`

  const currentDate: Date = new Date()

  // Check how many seconds are between the two dates
  const timeDifferenceInSeconds: number = Math.floor(
    (dateObj.getTime() - currentDate.getTime()) / 1000
  )

  let color: string = 'black' // * Default color

  if (timeDifferenceInSeconds > 604800) {
    color = 'rgba(79, 192, 208, 1)' // * Green color if the date is more than a week away
  } else if (
    timeDifferenceInSeconds >= 259200 &&
    timeDifferenceInSeconds <= 432000
  ) {
    color = 'rgb(255, 163, 60)' // * Yellow color if the date is between 3 and 5 days away
  } else if (timeDifferenceInSeconds < 259200 && timeDifferenceInSeconds > 0) {
    color = 'red' // * Red color if the date is less than 3 days away
  } else if (timeDifferenceInSeconds < 0) {
    color = 'rgb(144, 12, 63)' // * Darker Red color if the date is in the past
  }

  return { date, color }
}
