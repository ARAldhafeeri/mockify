import React from "react";
import { Button } from "antd";
import { addtionalClasses } from "utils/index";
import "./Button.module.scss";
import ButtonProps from "./Button.types";

const MockifyButton : React.FC<ButtonProps> = (props :ButtonProps) => {
    const { text, classes, onClick, htmlType, icon } = props;

    const content = text || icon;
    return (
        <React.Fragment>
            <Button 
                htmlType={htmlType}
                className={addtionalClasses({classes: classes})}
                onClick={onClick}
                >
                    {content} 
                </Button>
        </React.Fragment>
    );
}

export default MockifyButton;