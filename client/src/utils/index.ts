import { toast } from "react-toastify";

interface IClasses {
  classes: Array<string>;
}

export const addtionalClasses = (classes: IClasses): string => {
  let result: string = "";
  classes.classes.forEach((item: string) => {
    result += " " + item;
  });
  return result;
};

export const ToastGuid = () => {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  let guid =
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4();
  return { toastId: guid };
};

export const ToastifyMockify = (dispatchEvent: Promise<any>) => {
  dispatchEvent
    .then((res: any) => {
      let payload = res?.payload;
      payload?.status
        ? toast.success(payload?.message, ToastGuid())
        : toast.error(payload?.message, ToastGuid());
    })
    .catch((error: any) => {
      toast.error("An error occurred", ToastGuid());
    });
};

export const getnameByProjectId = (projects: any, projectId: string) => {
  let project = projects.find((item: any) => item._id === projectId);
  return project?.name;
};

export const ConditionalProp = (condition: boolean, prop: any) => {
  return { ...(condition ? prop : {}) };
};

export const normlizeSelectOptions = (
  items: any,
  value: string,
  label: string
) => {
  return items.map((item: any) => {
    return {
      value: item[value],
      label: item[label],
    };
  });
};

export const normlizeSelectOptionsList = (items: any) => {
  return items.map((item: any) => {
    return {
      value: item,
      label: item,
    };
  });
};
