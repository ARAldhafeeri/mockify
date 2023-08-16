import React from "react";
import { Button } from "antd";
import { addtionalClasses } from "../../../utils/index";
import "./Button.module.scss";

interface MockifyButtonProps {
    text: string;
    classes: Array<string>;
}

const MockifyButton : React.FC<MockifyButtonProps> = (props : MockifyButtonProps) => {
    const { text, classes } = props;
    return (
        <React.Fragment>
            <Button type="primary" className={addtionalClasses({classes: classes})}>{text}</Button>
        </React.Fragment>
    );
}

export default MockifyButton;