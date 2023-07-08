export const getDateToLocale = (timestamp: number) => {
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        minute: 'numeric',
        hour: 'numeric',
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
    }
    return new Date(timestamp).toLocaleString('ru-Ru', options)
}
