import React from 'react';
import MockifyCard from 'components/commons/Card/Card';
import { ICardsProps, IEventCardProps } from 'types/Cards';
import CardTitleWithIcon from 'components/commons/Card/CardTitleWithIcon';
import { TransactionOutlined } from '@ant-design/icons';
import { AiOutlineTransaction } from "react-icons/ai";
import CardActions from 'components/commons/CardAction/CardActions';
import Tag from 'components/commons/Tag/Tag';
import Horz from 'components/commons/Dividers/Horz';
const EventCard  : React.FC<IEventCardProps> = (
  {
    _id,
    name,
    handler,
    resource,
    actions,
  }
) => {

  return (
    <div>
      <div className="flex flex-col ml-10">
        <div className="flex flex-row space-x-5 my-1">

          <p className='font-bold'>Handler:</p>
          <p className='flex flex-row space-x-5 my-1'>{handler}</p>

        </div>
      </div>
      <Horz />
      <CardActions actions={actions} record={{
        _id,
        name,
        handler,
        resource,
      }} classes={["card-action"]} />
    </div>
  )
}

const EventCards :  React.FC<ICardsProps> = ({currentItems, actions}) => {
  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
      {currentItems?.map((item : any) => (
          <MockifyCard 
            title={
            <CardTitleWithIcon 
              title={<p className='eventname'>{item.name}</p>} 
              icon={<AiOutlineTransaction size={40} />}
              extra={<Tag text={item._id}
              />}
            /> }
            children={<EventCard  { ...item } actions={actions} /> }
            classes={['mockify-card']}
          />
      ))}
      </div>
    </div>
  )
}

export default EventCards;
