import React from 'react';
import { Col, Divider, Row, Tag, Typography } from 'antd';
import MockifyCard from 'components/commons/Card/Card';
import { ICardsProps, IEdgeCardProps } from 'types/Cards';
import CardTitleWithIcon from 'components/commons/Card/CardTitleWithIcon';
import { FunctionOutlined } from '@ant-design/icons';
import CardActions from 'components/commons/CardAction/CardActions';


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

  return (
    <div>
      <div className="edgeCardBody">
        <div className="cardBodyItem">
          <Typography className='cardBodyItemTitle'>Name</Typography>
          <Typography className='cardBodyItemValue'>{name}</Typography>
        </div>
        <div className="cardBodyItem">
          <Typography className='cardBodyItemTitle'>Code</Typography>
          {/* code view drawer */}
          <Typography className='cardBodyItemValue'>{code}</Typography>
        </div>
      </div>
      <Divider />
      <CardActions actions={actions} record={{_id}} classes={["card-action"]} />
    </div>
  )
}

const EdgeCards :  React.FC<ICardsProps> = ({data, actions}) => {
  return (
    <Row>
      {data?.map((item : any) => (
        <Col xs={20} sm={14} md={8} lg={8} xl={6}>
          <MockifyCard 
            title={
            <CardTitleWithIcon 
              title={<Typography className='edgename'>{item.name}</Typography>} 
              icon={<FunctionOutlined />}
              extra={<Tag><Typography className='cardId'>{item._id}</Typography></Tag>}
            /> }
            children={<EdgeCard  { ...item } actions={actions} /> }
            classes={['mockify-card']}
          />
        </Col>
      ))}
    </Row>
  )
}

export default EdgeCards;
