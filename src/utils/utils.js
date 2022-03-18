export const convertToDate = (timestamp) => {
    const date = new Date(timestamp);
    const month = date.toLocaleDateString('default', {month: 'long'})
    const day = date.getDate();

    return `${month} ${day}`
}