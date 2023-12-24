import React from "react";
import MockifyButton from "components/commons/Button/Button";



const CardActions= (props: any) => {
  const { record , actions } = props;
  return (
  <div className="cardActions">
    {
      actions.map((action : any, key : any) => {
        return (
          <MockifyButton 
          icon={action.icon}
          classes={action.classes}
          text={action.text}
          onClick={() => action.onclick(record)} />
        )
      })
    }
  </div>
  )
}

export default CardActions;