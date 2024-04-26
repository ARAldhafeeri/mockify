import React from "react";
import MockifyCardTypes from "./Card.types";
import { Card } from "antd";
import { addtionalClasses } from "utils";

const MockifyCard : React.FC<MockifyCardTypes> = (props: MockifyCardTypes) => {
  const { children, classes, title } = props;
  return (
    <Card className={addtionalClasses({classes: classes})} title={title}>
      {children}
    </Card>
  )
}

export default MockifyCard;