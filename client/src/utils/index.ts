import { toast } from "react-toastify";

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

export const ToastGuid = () => {
    var S4 = function() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
     };
     let guid = (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
     return {toastId: guid};
}


export const ToastifyMockify = (dispatchEvent : any) => {
    console.log(dispatchEvent)

    dispatchEvent.then((res : any) => {
        let payload = res?.payload;
        console.log(payload)
        payload?.status 
        ? toast.success(payload?.message,ToastGuid()) 
        : toast.error(payload?.message , ToastGuid());
    })
}