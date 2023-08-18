interface MockifyModelProps {
    show: boolean;
    showModal?: () => void;
    closeModal?: () => void;
    title?: string;
    children?: React.ReactNode;
}

export default MockifyModelProps;