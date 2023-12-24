import React from 'react';
import { Col, Divider, Row, Tag, Typography } from 'antd';
import MockifyCard from 'components/commons/Card/Card';
import { ICardsProps, IProjectCardProps } from 'types/Cards';
import CardTitleWithIcon from 'components/commons/Card/CardTitleWithIcon';
import { ProjectOutlined } from '@ant-design/icons';
import CardActions from 'components/commons/CardAction/CardActions';
import { Invisible } from 'components/commons/Invisible/Invisible';


const ProjectCard  : React.FC<IProjectCardProps> = (
  {
    apiKey,
    user,  
    _id,
    actions,
  }
) => {

  return (
    <div>
      <div className="projectCardBody">
        <div className="cardBodyItem">
          <Typography className='cardBodyItemTitle'>API key</Typography>
          <Typography className='cardBodyItemValue'>{Invisible(apiKey)}</Typography>
        </div>
        <div className="cardBodyItem">
          <Typography className='cardBodyItemTitle'>User</Typography>
          <Typography className='cardBodyItemValue'>{user}</Typography>
        </div>
      </div>
      <Divider />
      <CardActions actions={actions} record={{_id}} classes={["card-action"]} />
    </div>
  )
}

const ProjectCards :  React.FC<ICardsProps> = ({data, actions}) => {
  return (
    <Row>
      {data?.map((item : any) => (
        <Col xs={20} sm={16} md={12} lg={8} xl={6}>
          <MockifyCard 
            title={
            <CardTitleWithIcon 
              title={<Typography className='projectname'>{item.name}</Typography>} 
              icon={<ProjectOutlined />}
              extra={<Tag><Typography className='cardId'>{item._id}</Typography></Tag>}
            /> }
            children={<ProjectCard  { ...item } actions={actions} /> }
            classes={['mockify-card']}
          />
        </Col>
      ))}
    </Row>
  )
}

export default ProjectCards;
