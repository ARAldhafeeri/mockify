import React, { useState, useEffect, ReactNode }from 'react';
import MockifyCard from 'components/commons/Card/Card';
import { Drawer } from 'antd';
import { IEdgeCardProps, ICardsProps } from 'types/Cards';
import CardTitleWithIcon from 'components/commons/Card/CardTitleWithIcon';
import { AiFillEye, AiOutlineFunction} from 'react-icons/ai';
import CardActions from 'components/commons/CardAction/CardActions';
import MockifyButton from 'components/commons/Button/Button';
import MockifyCodeEditor from 'components/commons/CodeEditor/CodeEditor';
import Horz from 'components/commons/Dividers/Horz';
import Tag from 'components/commons/Tag/Tag';


const EdgeCard  : React.FC<IEdgeCardProps> = (
  {
    _id,
    name,
    code,
    method,
    resource,
    actions,
  }
) => {
  const [showCode, setShowCode] = React.useState<boolean>(false);
  const showCodeDrawer = () => {
    setShowCode(true);
  }

  const hideCodeDrawer = () => {
    setShowCode(false);
  }

  return (
    <div>
      <div className="flex flex-col ml-10">
        <div className="flex flex-row space-x-5 my-1">
          <p className='flex flex-row space-x-5 my-1'>Name</p>
          <p className='flex flex-row space-x-5 my-1'>{name}</p>
        </div>
        <div className="flex flex-row space-x-5 my-1">

          <p className='flex flex-row space-x-5 my-1'>Code</p>
          <MockifyButton classes={['table-action-third', 'textAndIcon']}  icon={<AiFillEye size={25} />} onClick={showCodeDrawer} />
          <Drawer
            title="Edge Function Code"
            placement="right"
            onClose={hideCodeDrawer}
            open={showCode}
            width={600}
          >
            <MockifyCodeEditor 
            value={code} height={"auto"} width={"600px"} onChange={() => console} />
          </Drawer>

        </div>
      </div>
      <Horz />
      <CardActions actions={actions} record={{
        _id,
        name,
        code,
        method,
        resource,
      }} classes={["card-action"]} />
    </div>
  )
}




const EdgeCards: React.FC<ICardsProps> = ({ currentItems, actions }) => {

  return (
    <div> 
      <div className='grid grid-cols-3 gap-4'>
        {currentItems?.map((item : any) => ( 
          <MockifyCard 
            key={item._id}     
            title={ 
              <CardTitleWithIcon 
                title={<p className='edgename'>{item.name}</p>} 
                icon={<AiOutlineFunction size={40} />}
                extra={<Tag text={item._id} />}
              /> 
            }
            children={<EdgeCard  { ...item } actions={actions} /> }
            classes={['mockify-card']}
          />
        ))}
      </div>
    </div>
  );
};
export default EdgeCards;
