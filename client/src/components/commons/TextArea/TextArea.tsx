import React from "react";
import "./TextArea.module.scss";
import ITextAreaProps from "./TextArea.types";
import { addtionalClasses } from "../../../utils";
import { Input } from 'antd';
const { TextArea } = Input;

const MockifyTextArea : React.FC<ITextAreaProps> = (props: ITextAreaProps) => {
    const { classes, placeholder, rows, maxLength} = props;
    return (
        <React.Fragment>
            <TextArea 
                className={addtionalClasses({classes: classes})}
                placeholder={placeholder} rows={rows} maxLength={maxLength} />
        </React.Fragment>
    );
}

export default MockifyTextArea;