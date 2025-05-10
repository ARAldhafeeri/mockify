import React from 'react';
import MockifyCard from 'components/commons/Card/Card';
import { ICardsProps, IProjectCardProps } from 'types/Cards';
import CardTitleWithIcon from 'components/commons/Card/CardTitleWithIcon';
import { AiFillProject } from 'react-icons/ai';
import CardActions from 'components/commons/CardAction/CardActions';
import { Invisible } from 'components/commons/Invisible/Invisible';
import Tag from 'components/commons/Tag/Tag';
import Horz from 'components/commons/Dividers/Horz';


const ProjectCard  : React.FC<IProjectCardProps> = (
  {
    apiKey,
    name,
    user,  
    _id,
    actions,
  }
) => {

  return (
    <div>
      <div className="flex flex-col ml-10">
        <div className="flex flex-row space-x-5 my-1">
          <p className='font-bold'>API key</p>
          <p className='text-xs'>{Invisible(apiKey)}</p>
        </div>
        <div className="flex flex-row space-x-5 my-1">
          <p className='font-bold'>User</p>
          <p className='text-xs'>{user}</p>
        </div>
      </div>
      <Horz />
      <CardActions actions={actions} record={{
        name,
        apiKey,
        user,
        _id,
      }} classes={["card-action"]} />
    </div>
  )
}

const ProjectCards :  React.FC<ICardsProps> = ({ currentItems, actions }) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>      
    {currentItems?.map((item : any) => (
          <MockifyCard 
            title={
            <CardTitleWithIcon 
              title={<p className='text-md'>{item.name}</p>} 
              extra={<Tag text={item._id} />}
            /> }
            children={<ProjectCard  { ...item } actions={actions} /> }
            classes={['mockify-card']}
          />
      ))}
    </div>
  )
}

export default ProjectCards;
