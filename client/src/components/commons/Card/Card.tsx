import React from "react";
import MockifyCardTypes from "./Card.types";
import { addtionalClasses } from "utils";

const MockifyCard: React.FC<MockifyCardTypes> = (props: MockifyCardTypes) => {
  const { children, classes, title } = props;
  const cls = addtionalClasses({classes: classes}) + " m-2 w-[350px] h-[300px] rounded-lg overflow-hidden shadow-lg hover:scale-105 transform transition duration-500 ease-in-out flex flex-col items-center justify-center";
  return (
    <div className={cls}>
      <div className="mb-5 text-center">{title}</div>
      <div className="flex justify-center w-full">
        {children}
      </div>
    </div>
  )
}

export default MockifyCard;