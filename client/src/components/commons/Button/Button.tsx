import React from "react";
import { Button } from "antd";
import { addtionalClasses } from "utils/index";
import "./Button.module.scss";
import ButtonProps from "./Button.types";

const MockifyButton : React.FC<ButtonProps> = (props :ButtonProps) => {
    const { text, classes, onClick } = props;
    return (
        <React.Fragment>
            <Button 
                type="primary" 
                className={addtionalClasses({classes: classes})}
                onClick={onClick}
                >
                    {text}
                </Button>
        </React.Fragment>
    );
}

export default MockifyButton;