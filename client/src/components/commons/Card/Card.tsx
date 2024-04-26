import React from "react";
import MockifyCardTypes from "./Card.types";
import { addtionalClasses } from "utils";

const MockifyCard : React.FC<MockifyCardTypes> = (props: MockifyCardTypes) => {
  const { children, classes, title } = props;
  const cls = addtionalClasses({classes: classes}) + " m-2 w-[275px] rounded-lg overflow-hidden shadow-lg hover:scale-105 transform transition duration-500 ease-in-out hover:";
  return (
      <div className={cls}>
      <div className="font-bold text-xl m-5">{title}</div>
      {children}
      </div>
  )
}

export default MockifyCard;