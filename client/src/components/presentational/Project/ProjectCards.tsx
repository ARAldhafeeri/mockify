import React from 'react';
import { Card, Space, Typography, Divider, Tag } from 'antd';
import { AiFillProject, AiOutlineKey, AiOutlineUser } from 'react-icons/ai';
import CardTitleWithIcon from 'components/commons/Card/CardTitleWithIcon';
import CardActions from 'components/commons/CardAction/CardActions';
import { Invisible } from 'components/commons/Invisible/Invisible';
import type { ICardsProps, IProjectCardProps } from 'types/Cards';

const { Text } = Typography;

const ProjectCard: React.FC<IProjectCardProps> = ({
  apiKey,
  name,
  user,
  _id,
  actions
}) => {
  const cardData = [
    {
      icon: <AiOutlineKey />,
      label: 'API Key',
      value: Invisible(apiKey),
      className: 'api-key-value'
    },
    {
      icon: <AiOutlineUser />,
      label: 'User',
      value: user
    }
  ];

  return (
    <Space direction="vertical" size="middle">
      <div className="user-card-details">
        {cardData.map((item, index) => (
          <div key={index} className="user-card-detail-row">
            <Space size="small" align="start">
              <span className="detail-icon">{item.icon}</span>
              <Text strong>{item.label}:</Text>
              <Text type="secondary" className={item.className}>
                {item.value}
              </Text>
            </Space>
          </div>
        ))}
      </div>
      <Divider style={{ margin: '12px 0' }} />
      <CardActions
        actions={actions}
        record={{ name, apiKey, user, _id }}
        classes={["card-action"]}
      />
    </Space>
  );
};

const ProjectCards: React.FC<ICardsProps> = ({ currentItems, actions }) => {
  return (
    <div className="user-cards-grid">
      {currentItems?.map((item: any) => (
        <Card
          key={item._id}
          className="user-card"
          title={
            <CardTitleWithIcon
              title={<span className="card-title">{item.name}</span>}
              icon={<AiFillProject size={20} className="card-title-icon" />}
            />
          }
          extra={item._id && <Tag color="blue">{item._id}</Tag>}
          hoverable
        >
          <ProjectCard {...item} actions={actions} />
        </Card>
      ))}
    </div>
  );
};

export default ProjectCards;