interface ITextAreaProps {
    name: string;
    label: string;
    value: string;
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    error?: string;
    placeholder?: string;
    rows?: number;
    maxLength?: number;
    classes: Array<string>;
}

export default ITextAreaProps;