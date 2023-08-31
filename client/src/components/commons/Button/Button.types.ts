interface ButtonProps {
    text: string;
    classes: Array<string>;
    onClick?: () => void;
    htmlType?: "button" | "submit" | "reset";
}

export default ButtonProps;