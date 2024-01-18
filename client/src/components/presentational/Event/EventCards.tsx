import React from 'react';
import { Col, Divider, Row, Tag, Typography } from 'antd';
import MockifyCard from 'components/commons/Card/Card';
import { ICardsProps, IEventCardProps } from 'types/Cards';
import CardTitleWithIcon from 'components/commons/Card/CardTitleWithIcon';
import { TransactionOutlined } from '@ant-design/icons';
import CardActions from 'components/commons/CardAction/CardActions';
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
      <div className="eventCardBody">
        <div className="cardBodyItem">

          <Typography className='cardBodyItemTitle'>Handler:</Typography>
          <Typography className='cardBodyItemValue'>{handler}</Typography>

        </div>
      </div>
      <Divider />
      <CardActions actions={actions} record={{
        _id,
        name,
        handler,
        resource,
      }} classes={["card-action"]} />
    </div>
  )
}

const EventCards :  React.FC<ICardsProps> = ({data, actions}) => {
  return (
    <Row>
      {data?.map((item : any) => (
        <Col xs={20} sm={14} md={8} lg={8} xl={6}>
          <MockifyCard 
            title={
            <CardTitleWithIcon 
              title={<Typography className='eventname'>{item.name}</Typography>} 
              icon={<TransactionOutlined />}
              extra={<Tag><Typography className='eventHandler'>{item.handler}</Typography></Tag>}
            /> }
            children={<EventCard  { ...item } actions={actions} /> }
            classes={['mockify-card']}
          />
        </Col>
      ))}
    </Row>
  )
}

export default EventCards;
