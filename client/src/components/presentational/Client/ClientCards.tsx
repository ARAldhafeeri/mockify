import React from 'react';
import MockifyCard from 'components/commons/Card/Card';
import { ICardsProps, IClientCardProps } from 'types/Cards';
import CardTitleWithIcon from 'components/commons/Card/CardTitleWithIcon';
import { AiOutlineKey } from 'react-icons/ai';
import CardActions from 'components/commons/CardAction/CardActions';
import { Invisible } from 'components/commons/Invisible/Invisible';
import Horz from 'components/commons/Dividers/Horz';
import Tag from 'components/commons/Tag/Tag';
const ClientCard  : React.FC<IClientCardProps> = (
  {
    _id,
    name,
    id,
    secret,
    project,
    actions,
  }
) => {

  return (
    <div>
      <div className="flex flex-col ml-10">
        <div className="flex flex-row space-x-5 my-1">

          <p className='font-bold'>Client Id:</p>
          <p className='cardId'>{id}</p>
        </div>
        <div className="flex flex-row space-x-5 my-1">
          <p className='font-bold'>Client Credentials:</p>
          <p className='cardBodyItemValue'>{Invisible(secret)}</p>
        </div>
      </div>
      <Horz />
      <CardActions actions={actions} record={{
        _id,
        name,
        id,
        secret,
        project
      }} classes={["card-action"]} />
    </div>
  )
}

const ClientCards :  React.FC<ICardsProps> = ({currentItems, actions}) => {
  return (
    <div className='grid grid-cols-3 gap-4'>
      {currentItems?.map((item : any) => (
          <MockifyCard 
            title={
            <CardTitleWithIcon 
              title={<p className='cardTitle'>{item.name}</p>} 
              icon={<AiOutlineKey />}
              extra={<Tag text={item._id} />}
            /> }
            children={<ClientCard  { ...item } actions={actions} /> }
            classes={['mockify-card']}
          />
      ))}
    </div>
  )
}

export default ClientCards;
