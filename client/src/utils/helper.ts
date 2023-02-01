export const uniteClasses = (classes: (string | boolean)[]): string  => {
    return classes.join(' ')
}
export const isExist = (x: any) : boolean => {
    return x !== undefined
}