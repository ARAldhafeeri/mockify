import React from "react";
import IInputProps from "./Input.types";
import { addtionalClasses } from "../../../utils";

const MockifyInput : React.FC<IInputProps> = (props: IInputProps) => {
    const { classes, placeholder, type, label, onChange, name, value} = props;
    return (
        <div className=" relative m-5">
            <label className=" bg-light-bg px-2 text-xs rounded-full absolute top-[-10px] left-0">{label}</label>
            <input  
                className="w-[150px] shadow rounded py-2 px-3 l focus:ring-1 dfocus:outline-none"
                placeholder={placeholder}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                />
        </div>
    );
}

export default MockifyInput;