import React from 'react';
import { Col, Divider, Row, Tag, Typography } from 'antd';
import MockifyCard from 'components/commons/Card/Card';
import { ICardsProps, IClientCardProps } from 'types/Cards';
import CardTitleWithIcon from 'components/commons/Card/CardTitleWithIcon';
import { KeyOutlined } from '@ant-design/icons';
import CardActions from 'components/commons/CardAction/CardActions';
import { Invisible } from 'components/commons/Invisible/Invisible';
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
      <div className="clientCardBody">
        <div className="cardBodyItem">

          <Typography className='cardBodyItemTitle'>Client Id:</Typography>
          <Typography className='cardId'>{id}</Typography>
        </div>
        <div className="cardBodyItem">
          <Typography className='cardBodyItemTitle'>Client Credentials:</Typography>
          <Typography className='cardBodyItemValue'>{Invisible(secret)}</Typography>
        </div>
      </div>
      <Divider />
      <CardActions actions={actions} record={{
        _id,
        name,
        id,
        secret,
        project,
        actions,
      }} classes={["card-action"]} />
    </div>
  )
}

const ClientCards :  React.FC<ICardsProps> = ({data, actions}) => {
  return (
    <Row>
      {data?.map((item : any) => (
        <Col xs={20} sm={14} md={8} lg={8} xl={6}>
          <MockifyCard 
            title={
            <CardTitleWithIcon 
              title={<Typography className='cardTitle'>{item.name}</Typography>} 
              icon={<KeyOutlined />}
              extra={<Tag><Typography className='cardId'>{item.project}</Typography></Tag>}
            /> }
            children={<ClientCard  { ...item } actions={actions} /> }
            classes={['mockify-card']}
          />
        </Col>
      ))}
    </Row>
  )
}

export default ClientCards;
