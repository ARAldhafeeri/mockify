import React from 'react';
import { Col, Divider, Drawer, Row, Tag, Typography } from 'antd';
import MockifyCard from 'components/commons/Card/Card';
import { ICardsProps, IEdgeCardProps } from 'types/Cards';
import CardTitleWithIcon from 'components/commons/Card/CardTitleWithIcon';
import { EyeFilled, EyeTwoTone, FunctionOutlined } from '@ant-design/icons';
import CardActions from 'components/commons/CardAction/CardActions';
import MockifyButton from 'components/commons/Button/Button';
import MockifyCodeEditor from 'components/commons/CodeEditor/CodeEditor';


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
      <div className="edgeCardBody">
        <div className="cardBodyItem">
          <Typography className='cardBodyItemTitle'>Name</Typography>
          <Typography className='cardBodyItemValue'>{name}</Typography>
        </div>
        <div className="cardBodyItem">

          <Typography className='cardBodyItemTitle'>Code</Typography>
          <MockifyButton classes={['table-action-third', 'textAndIcon']} text="Show code" icon={<EyeFilled />} onClick={showCodeDrawer} />
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
      <Divider />
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
