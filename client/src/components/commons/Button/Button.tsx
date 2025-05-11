import React from "react";
import { addtionalClasses } from "utils/index";
import ButtonProps from "./Button.types";

const MockifyButton: React.FC<ButtonProps> = (props: ButtonProps) => {
    const { 
        text, 
        classes, 
        onClick, 
        htmlType = "button", 
        icon,
    } = props;
    
    const baseClasses = `
        font-medium
        p-2
        m-3
        rounded-md
        shadow-sm
        transition-all
        duration-200
        ease-in-out
        flex items-center justify-center
        space-x-2
        border border-transparent
   
        bg-light-primary dark:bg-dark-primary text-white hover:bg-light-primary/90 dark:hover:bg-dark-primary/90
    `;
    
    const cls = baseClasses + addtionalClasses({classes: classes});
    
    const content = (
        <>
            {icon && <span className={text ? 'mr-2' : ''}>{icon}</span>}
            {text && <span>{text}</span>}
        </>
    );
    
    return (
        <button 
            type={htmlType}
            className={cls}
            onClick={onClick}

        >
            {content} 
        </button>
    );
};

export default MockifyButton;