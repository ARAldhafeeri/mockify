import React from "react";
import { Modal } from "antd";
import "./Modal.module.scss";
import MockifyModelProps from "./Modal.types";

const MockifyModal : React.FC<MockifyModelProps> = (props: MockifyModelProps) => {
    const { show, title, children, onOk, onCancel, okButtonProps, cancelButtonProps } = props;
    console.log("show", show)
    return (
        <Modal 
            title={title} 
            open={show}
            onCancel={onCancel}
            onOk={onOk}
            okButtonProps={okButtonProps}
            cancelButtonProps={cancelButtonProps}
            >
          {children}
        </Modal>
    )
}

export default MockifyModal;