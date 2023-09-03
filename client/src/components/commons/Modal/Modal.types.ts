interface MockifyModalProps {
    show: boolean;
    title?: string;
    children?: React.ReactNode;
    onOk: () => void;
    onCancel: () => void;
}


export default MockifyModalProps;