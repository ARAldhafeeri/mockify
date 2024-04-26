import React from "react";
import { Modal } from "antd";
import MockifyModelProps from "./Modal.types";

const MockifyModal : React.FC<MockifyModelProps> = (props: MockifyModelProps) => {
    const { show, title, children, onOk, onCancel, okButtonProps, cancelButtonProps } = props;
    return (
        <Modal 
            title={title} 
            open={show}
            onCancel={onCancel}
            onOk={onOk}
            className="modal"
            centered
            okButtonProps={okButtonProps}
            maskStyle={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
            cancelButtonProps={cancelButtonProps}
            >
          {children}
        </Modal>
    )
}

export default MockifyModal;