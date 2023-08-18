import React from "react";
import "./Input.module.scss";
import IInputProps from "./Input.types";
import { addtionalClasses } from "../../../utils";

const MockifyInput : React.FC<IInputProps> = (props: IInputProps) => {
    const { classes, placeholder, type} = props;
    return (
        <React.Fragment>
            <input className={addtionalClasses({classes: classes})} placeholder={placeholder} type={type} />
        </React.Fragment>
    );
}

export default MockifyInput;