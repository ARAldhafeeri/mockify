import React from "react";
import "./Card.module.scss"
import MockifyCardTypes from "./Card.types";
import { Card } from "antd";
import { addtionalClasses } from "utils";

const MockifyCard : React.FC<MockifyCardTypes> = (props: MockifyCardTypes) => {
  const { children, classes } = props;
  return (
    <Card className={addtionalClasses({classes: classes})}>
      {children}
    </Card>
  )
}

export default MockifyCard;