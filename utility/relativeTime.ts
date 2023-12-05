export const relativeTime = (date: string): string => {
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
  const pastDate = new Date(date)

  const userTimezoneOffset = pastDate.getTimezoneOffset() * 60000
  const UTCTimeRightNow = new Date(pastDate.getTime() - userTimezoneOffset)

  const currentDateUTC = new Date(
    Date.UTC(
      new Date().getUTCFullYear(),
      new Date().getUTCMonth(),
      new Date().getUTCDate(),
      new Date().getUTCHours(),
      new Date().getUTCMinutes(),
      new Date().getUTCSeconds()
    )
  )

  const timeDifferenceInSeconds = Math.floor(
    (currentDateUTC.getTime() - UTCTimeRightNow.getTime()) / 1000
  )

  if (timeDifferenceInSeconds < 60) {
    return rtf.format(Math.round(-timeDifferenceInSeconds), 'second')
  } else if (timeDifferenceInSeconds < 3600) {
    return rtf.format(Math.round(-timeDifferenceInSeconds / 60), 'minute')
  } else if (timeDifferenceInSeconds < 86400) {
    return rtf.format(Math.round(-timeDifferenceInSeconds / 3600), 'hour')
  } else if (timeDifferenceInSeconds < 604800) {
    return rtf.format(Math.round(-timeDifferenceInSeconds / 86400), 'day')
  } else if (timeDifferenceInSeconds < 2419200) {
    return rtf.format(Math.round(-timeDifferenceInSeconds / 604800), 'week')
  } else {
    return rtf.format(Math.round(-timeDifferenceInSeconds / 2419200), 'month')
  }
}
