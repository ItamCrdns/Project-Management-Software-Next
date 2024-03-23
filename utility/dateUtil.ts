export type TimePoints = 'future' | 'past'

export const dateUtil = (date: string, timePoints: TimePoints): string => {
  const currentDate = new Date()
  const inputDate = new Date(date)

  const timeDifff = timePoints === 'future' ? inputDate.getTime() - currentDate.getTime() : currentDate.getTime() - inputDate.getTime()
  const seconds = Math.floor(timeDifff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const months = Math.floor(days / 30)

  if (months > 12 && timePoints === 'past') {
    return 'Too long ago'
  }

  if (months > 0 && timePoints === 'past') {
    return months === 1 ? '1 month ago' : months + ' months ago'
  }

  if (days > 0 && timePoints === 'past') {
    return days === 1 ? '1 day ago' : days + ' days ago'
  }

  if (hours > 0 && timePoints === 'past') {
    return hours === 1 ? '1 hour ago' : hours + ' hours ago'
  }

  if (minutes > 0 && timePoints === 'past') {
    return minutes === 1 ? '1 minute ago' : minutes + ' minutes ago'
  }

  if (seconds > 30 && timePoints === 'past') {
    return seconds === 31 ? '31 seconds ago' : seconds + ' seconds ago'
  }

  if (months > 12 && timePoints === 'future') {
    return 'Too far in the future'
  }

  if (months > 0 && timePoints === 'future') {
    return months === 1 ? 'In 1 month' : 'In ' + months + ' months'
  }

  if (days > 0 && timePoints === 'future') {
    return days === 1 ? 'In 1 day' : 'In ' + days + ' days'
  }

  if (hours > 0 && timePoints === 'future') {
    return hours === 1 ? 'In 1 hour' : 'In ' + hours + ' hours'
  }

  if (minutes > 0 && timePoints === 'future') {
    return minutes === 1 ? 'In 1 minute' : 'In ' + minutes + ' minutes'
  }

  if (seconds > 30 && timePoints === 'future') {
    return seconds === 31 ? 'In 31 seconds' : 'In ' + seconds + ' seconds'
  }

  return 'Just now'
}
