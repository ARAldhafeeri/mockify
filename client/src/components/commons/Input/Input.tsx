import React from "react";
import "./Input.module.scss";
import IInputProps from "./Input.types";
import { addtionalClasses } from "../../../utils";
import { Input } from "antd";

const MockifyInput : React.FC<IInputProps> = (props: IInputProps) => {
    const { classes, placeholder, type, label} = props;
    return (
        <div className="mockify-input">
            <Input  className={addtionalClasses({classes: classes})} placeholder={placeholder} type={type} />
            <label className="input-label">{label}</label>
        </div>
    );
}

export default MockifyInput;