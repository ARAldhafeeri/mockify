import React from 'react';
import { Card, Space, Typography, Divider, Tag } from 'antd';
import { AiOutlineUser, AiOutlineMail, AiOutlineClockCircle, AiOutlineUserAdd } from 'react-icons/ai';
import { RiShieldUserLine } from 'react-icons/ri';
import CardTitleWithIcon from 'components/commons/Card/CardTitleWithIcon';
import CardActions from 'components/commons/CardAction/CardActions';
import type { ICardsProps, IUserCardProps } from 'types/Cards';

const { Text } = Typography;

const UserCard: React.FC<IUserCardProps> = ({
  username,
  email,
  role,
  createdAt,
  createdBy,
  actions,
  _id
}) => {
  const cardData = [
    { icon: <AiOutlineMail />, label: 'Email', value: email },
    { icon: <RiShieldUserLine />, label: 'Role', value: role },
    { icon: <AiOutlineClockCircle />, label: 'Created At', value: createdAt },
    { icon: <AiOutlineUserAdd />, label: 'Created By', value: createdBy }
  ];

  return (
    <Space direction="vertical" size="middle">
      <div className="user-card-details">
        {cardData.map((item, index) => (
          <div key={index} className="user-card-detail-row">
            <Space size="small">
              <span className="detail-icon">{item.icon}</span>
              <Text strong>{item.label}:</Text>
              <Text type="secondary" className="detail-value">
                {item.value}
              </Text>
            </Space>
          </div>
        ))}
      </div>
      <Divider style={{ margin: '12px 0' }} />
      <CardActions
        actions={actions}
        record={{ username, email, role, createdAt, createdBy, _id }}
        classes={["card-action"]}
      />
    </Space>
  );
};

const UserCards: React.FC<ICardsProps> = ({ currentItems, actions }) => {
  return (
    <div className="user-cards-grid">
      {currentItems?.map((item: any) => (
        <Card
          key={item._id}
          className="user-card"
          title={
            <CardTitleWithIcon
              title={<span className="card-title">{item.username}</span>}
              icon={<AiOutlineUser size={20} className="card-title-icon" />}
            />
          }
          extra={item.role && <Tag color="blue">{item.role}</Tag>}
          hoverable
        >
          <UserCard {...item} actions={actions} />
        </Card>
      ))}
    </div>
  );
};

export default UserCards;