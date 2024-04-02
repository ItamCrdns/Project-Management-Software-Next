export const timeAmPmTo24h = (time: string): string => {
  const timeParts = time.split(' ')

  const hour = Number(timeParts[0].split(':')[0])
  const minutes = Number(timeParts[0].split(':')[1])
  const meridiemIndicator = timeParts[1]

  if (meridiemIndicator === 'AM') {
    return `${hour === 12 ? '00' : hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
  } else if (meridiemIndicator === 'PM') {
    return `${hour === 12 ? '12' : hour + 12}:${minutes.toString().padStart(2, '0')}`
  } else {
    return time
  }
}
