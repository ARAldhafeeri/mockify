
interface IClasses {
    classes: Array<string>
}
export const addtionalClasses = (classes : IClasses) : string => {
    let result : string = "";
    classes.classes.forEach((item : string) => {
        result += " " + item;
    });
    return result;
}