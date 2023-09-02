import { ReactNode } from "react";

interface ButtonProps {
    text?: string;
    classes: Array<string>;
    onClick?: () => void;
    htmlType?: "button" | "submit" | "reset";
    icon?: ReactNode
}

export default ButtonProps;