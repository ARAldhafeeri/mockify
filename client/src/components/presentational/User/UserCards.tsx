import React from 'react';
import { Col, Divider, Row} from 'antd';
import MockifyCard from 'components/commons/Card/Card';
import { ICardsProps, IUserCardProps } from 'types/Cards';
import CardTitleWithIcon from 'components/commons/Card/CardTitleWithIcon';
import { AiOutlineUser } from 'react-icons/ai';
import { Header } from 'antd/es/layout/layout';
import CardActions from 'components/commons/CardAction/CardActions';
import Horz from 'components/commons/Dividers/Horz';
import Tag from 'components/commons/Tag/Tag';

const UserCard  : React.FC<IUserCardProps> = (
  {
    username,
    email,
    role,
    createdAt,
    createdBy,
    actions,
    _id
  }
) => {

  return (
    <div>
      <div className="flex flex-col ml-10">
        <div className="flex flex-row space-x-5 my-1">
          <p className=' font-bold'>Email</p>
          <p className='text-xs'>{email}</p>
        </div>
        <div className="flex flex-row space-x-5 my-1">
          <p className='font-bold'>Role</p>
          <p className='text-xs'>{role}</p>
        </div>
        <div className="flex flex-row space-x-5 my-1">
          <p className='font-bold'>Created At</p>
          <p className='text-xs'>{createdAt}</p>
        </div>
        <div className="flex flex-row space-x-5 my-1">
          <p className='font-bold'>Created By</p>
          <p className='cardBodyItemValue'>{createdBy}</p>
        </div>
      </div>
      <Horz />
      <CardActions actions={actions} record={{
        username,
        email,
        role,
        createdAt,
        createdBy,
        _id,
      }} classes={["card-action"]} />
    </div>
  )
}

const UserCards :  React.FC<ICardsProps> = ({currentItems, actions}) => {
  return (
    <div className='grid grid-cols-3 gap-4'>
      {currentItems?.map((item : any) => (
          <MockifyCard 
            title={
            <CardTitleWithIcon 
              title={<p className='text-1xl'>{item.username}</p>} 
              icon={<AiOutlineUser  size={40} className='mt-2' />}
              extra={<Tag text={item?._id} />}
            /> }
            children={<UserCard  { ...item } actions={actions} /> }
            classes={['mockify-card']}
          />
      ))}
    </div>
  )
}

export default UserCards;