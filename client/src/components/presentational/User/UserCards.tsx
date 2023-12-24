import React from 'react';
import { Col, Divider, Row, Tag, Typography } from 'antd';
import MockifyCard from 'components/commons/Card/Card';
import { ICardsProps, IUserCardProps } from 'types/Cards';
import CardTitleWithIcon from 'components/commons/Card/CardTitleWithIcon';
import { UserOutlined } from '@ant-design/icons';
import { Header } from 'antd/es/layout/layout';
import CardActions from 'components/commons/CardAction/CardActions';


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
      <div className="userCardBody">
        <div className="cardBodyItem">
          <Typography className='cardBodyItemTitle'>Email</Typography>
          <Typography className='cardBodyItemValue'>{email}</Typography>
        </div>
        <div className="cardBodyItem">
          <Typography className='cardBodyItemTitle'>Role</Typography>
          <Typography className='cardBodyItemValue'>{role}</Typography>
        </div>
        <div className="cardBodyItem">
          <Typography className='cardBodyItemTitle'>Created At</Typography>
          <Typography className='cardBodyItemValue'>{createdAt}</Typography>
        </div>
        <div className="cardBodyItem">
          <Typography className='cardBodyItemTitle'>Created By</Typography>
          <Typography className='cardBodyItemValue'>{createdBy}</Typography>
        </div>
      </div>
      <Divider />
      <CardActions actions={actions} record={{_id}} classes={["card-action"]} />
    </div>
  )
}

const UserCards :  React.FC<ICardsProps> = ({data, actions}) => {
  return (
    <Row>
      {data?.map((item : any) => (
        <Col xs={20} sm={16} md={12} lg={8} xl={6}>
          <MockifyCard 
            title={
            <CardTitleWithIcon 
              title={<Typography className='username'>{item.username}</Typography>} 
              icon={<UserOutlined />}
              extra={<Tag><Typography className='cardId'>{item._id}</Typography></Tag>}
            /> }
            children={<UserCard  { ...item } actions={actions} /> }
            classes={['mockify-card']}
          />
        </Col>
      ))}
    </Row>
  )
}

export default UserCards;