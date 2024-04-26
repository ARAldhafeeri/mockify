import React from "react";
import { addtionalClasses } from "utils/index";
import ButtonProps from "./Button.types";

const MockifyButton : React.FC<ButtonProps> = (props :ButtonProps) => {
    const { text, classes, onClick, htmlType, icon } = props;
    const cls = 'bg-light-primary m-2  hover:bg-light-bg text-bg-light py-1 px-2 rounded-lg shadow' + addtionalClasses({classes: classes});
    let content = text || icon;
    if ( text && icon ) content = <>{icon} {text}</>;
    return (
        <button 
            type={htmlType}
            className={cls}
            onClick={onClick}
            >
                {content} 
        </button>
    );
}

export default MockifyButton;