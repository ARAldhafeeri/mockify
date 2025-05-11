import React from 'react';
import { Card, Space, Typography, Tag, Divider } from 'antd';
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
    <>
      <div className="project-card-details">
        {cardData.map((item, index) => (
          <div key={index} className="project-card-detail-row">
            <Space size="small" align="start">
              <span className="project-card-icon">{item.icon}</span>
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
    </>
  );
};

const ProjectCards: React.FC<ICardsProps> = ({ currentItems, actions }) => {
  return (
    <div className="grid grid-cols-3 gap-3">
      {currentItems?.map((item) => (
        <Card
          key={item._id}
          className="w-[300px]"
          title={
            <CardTitleWithIcon
              icon={<AiFillProject className="project-icon" />}
              title={<span className="project-name">{item.name}</span>}
              extra={<Tag className="project-id-tag">{item._id}</Tag>}
            />
          }
          hoverable
        >
          <ProjectCard {...item} actions={actions} />
        </Card>
      ))}
    </div>
  );
};

export default ProjectCards;