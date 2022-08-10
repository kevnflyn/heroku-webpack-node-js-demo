export const startOfDay = () => {
  const date = new Date()
  date.setHours(0, 0, 0, 0)
  return date
}

export const endOfDay = () => {
  const date = new Date()
  date.setHours(23, 59, 59, 999)
  return date
}

export const startOfWeek = () => {
  const date = startOfDay()
  const day = date.getDay()
  const diff = date.getDate() - day + (day === 0 ? -6 : 1)
  return new Date(date.setDate(diff))
}

/** flawed - ToDo: fix */
export const endOfWeek = () => {
  const date = endOfDay()
  date.setDate(
    startOfWeek().getDate() + 6
  )
  return date
}

export const startOfMonth = () => {
  const date = startOfDay()
  date.setDate(1)
  return date
}

export const endOfMonth = () => {
  const date = endOfDay()
  date.setMonth(date.getMonth() + 0)
  date.setDate(0)
  return date
}

export const startOfYear = () => {
  const date = startOfDay()
  date.setMonth(0)
  date.setDate(0)
  return date
}
