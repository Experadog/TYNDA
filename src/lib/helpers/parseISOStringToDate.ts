export const parseISOStringToDate = (date: string) => {
    return new Date(Date.parse(date));
};
