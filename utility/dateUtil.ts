type TimePoints = 'future' | 'past'

interface DateReturn {
  days: number
  text: string
  timePoint: TimePoints
}

const isTimeDiffNegative = (timeDiff: number): boolean => timeDiff < 0

export const dateUtil = (date: string): DateReturn => {
  const currentDate = new Date()
  const inputDate = new Date(date)

  const timeDiff = currentDate.getTime() - inputDate.getTime()
  const seconds = Math.abs(Math.floor(timeDiff / 1000))
  const minutes = Math.abs(Math.floor(seconds / 60))
  const hours = Math.abs(Math.floor(minutes / 60))
  const days = Math.abs(Math.floor(hours / 24))
  const months = Math.abs(Math.floor(days / 30))

  // * Past dates

  if (!isTimeDiffNegative(timeDiff)) {
    if (months > 12) {
      return { days, text: 'Too long ago', timePoint: 'past' }
    }

    if (months > 0) {
      return { days, text: months === 1 ? '1 month ago' : months + ' months ago', timePoint: 'past' }
    }

    if (days > 0) {
      return { days, text: days === 1 ? '1 day ago' : days + ' days ago', timePoint: 'past' }
    }

    if (hours > 0) {
      return { days, text: hours === 1 ? '1 hour ago' : hours + ' hours ago', timePoint: 'past' }
    }

    if (minutes > 0) {
      return { days, text: minutes === 1 ? '1 minute ago' : minutes + ' minutes ago', timePoint: 'past' }
    }

    if (seconds > 30) {
      return { days, text: seconds === 31 ? '31 seconds ago' : seconds + ' seconds ago', timePoint: 'past' }
    }
  }

  // * Future dates

  if (isTimeDiffNegative(timeDiff)) {
    if (months > 12) {
      return { days, text: 'Too far away', timePoint: 'future' }
    }

    if (months > 0) {
      return { days, text: months === 1 ? 'In 1 month' : 'In ' + months + ' months', timePoint: 'future' }
    }

    if (days > 0) {
      return { days, text: days === 1 ? 'In 1 day' : 'In ' + days + ' days', timePoint: 'future' }
    }

    if (hours > 0) {
      return { days, text: hours === 1 ? 'In 1 hour' : 'In ' + hours + ' hours', timePoint: 'future' }
    }

    if (minutes > 0) {
      return { days, text: minutes === 1 ? 'In 1 minute' : 'In ' + minutes + ' minutes', timePoint: 'future' }
    }

    if (seconds > 30) {
      return { days, text: seconds === 31 ? 'In 31 seconds' : 'In ' + seconds + ' seconds', timePoint: 'future' }
    }
  }

  return { days: timeDiff, text: 'Just now', timePoint: 'past' } // Uncertain if past or future
}
