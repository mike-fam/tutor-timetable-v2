export const setDateHours = (date: Date, time: number): Date => {
    const startHour = Math.floor(time);
    const startMinute = (time % 1) * 60;
    const dateCopy = new Date(date);
    dateCopy.setHours(startHour, startMinute, 0, 0);
    return dateCopy;
};
