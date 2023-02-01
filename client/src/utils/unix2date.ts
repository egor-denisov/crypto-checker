import { monthsType, dateType } from "../types/dateType"
const monthsMassiv:monthsType[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul' , 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export const unix2date = (unix: number):dateType => {
    const d = new Date(unix)
    return {
        year: d.getFullYear(),
        month: monthsMassiv[d.getMonth()],
        day: d.getDate(),
        hours: d.getHours(),
        minutes: d.getMinutes()
    }
}