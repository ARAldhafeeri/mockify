
export interface IFormMakerPolicyProps {
handleFormChange: (value : string, type: string, index: number) => void;
handleRemove: (value: number, type: string) => void;
handleAdd: (value: string, type: string) => void;
data?: any;
fields?: Array<string>;
fieldsType: string;
}

export interface IFormMakerPolicyData {
handleChange:(e: React.ChangeEvent<HTMLInputElement> | boolean) => void;
data?: any;
fields?: Array<string>;
}