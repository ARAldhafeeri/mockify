import React from "react";
import { Modal } from "antd";
import "./Model.module.scss";
import MockifyModelProps from "./Model.types";
import MockifyButton from "../Button/Button";

const MockifyModel : React.FC<MockifyModelProps> = (props: MockifyModelProps) => {
    const { show, showModal, closeModal, title, children } = props;
    return (
        <>
        <MockifyButton text="Open" classes={['button']} onClick={showModal} />
        <Modal title={title} open={show} onCancel={closeModal}>
          {children}
        </Modal>
      </>
    )
}

export default MockifyModel;