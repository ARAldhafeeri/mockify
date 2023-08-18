interface IInputProps {
    name: string;
    label: string;
    value: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    placeholder?: string;
    type?: string;
    classes: Array<string>;
}

export default IInputProps;