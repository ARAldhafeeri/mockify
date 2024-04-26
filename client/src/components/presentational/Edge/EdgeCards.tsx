import React, { useState, useEffect }from 'react';
import MockifyCard from 'components/commons/Card/Card';
import { Drawer } from 'antd';
import {  IEdgeCardProps } from 'types/Cards';
import CardTitleWithIcon from 'components/commons/Card/CardTitleWithIcon';
import { AiFillEye, AiOutlineFunction} from 'react-icons/ai';
import CardActions from 'components/commons/CardAction/CardActions';
import MockifyButton from 'components/commons/Button/Button';
import MockifyCodeEditor from 'components/commons/CodeEditor/CodeEditor';
import Horz from 'components/commons/Dividers/Horz';
import Tag from 'components/commons/Tag/Tag';


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
      <div className="flex flex-col ml-10">
        <div className="flex flex-row space-x-5 my-1">
          <p className='flex flex-row space-x-5 my-1'>Name</p>
          <p className='flex flex-row space-x-5 my-1'>{name}</p>
        </div>
        <div className="flex flex-row space-x-5 my-1">

          <p className='flex flex-row space-x-5 my-1'>Code</p>
          <MockifyButton classes={['table-action-third', 'textAndIcon']}  icon={<AiFillEye size={25} />} onClick={showCodeDrawer} />
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
      <Horz />
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


interface ICardsProps<T> { // Changed slightly to focus on 'data'
  data: T[];  
  itemsPerPage: number;
  actions: any; 
}

const EdgeCards: React.FC<ICardsProps<any>> = ({ data, itemsPerPage, actions }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState<any[]>([]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setCurrentItems(data.slice(startIndex, endIndex));
  }, [currentPage, data, itemsPerPage]);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1)); // Prevent going below page 1
  };

  const handleNextPage = () => {
    const maxPages = Math.ceil(data.length / itemsPerPage);
    setCurrentPage((prevPage) => Math.min(prevPage + 1, maxPages)); // Prevent going past the last page
  };

  return (
    <div> {/* Added the outer div */}
      <div className='grid grid-cols-3 gap-4'>
        {currentItems?.map((item) => (  // Using 'currentItems'
          <MockifyCard 
            key={item._id}     //  Assuming _id is your unique identifier
            title={ 
              <CardTitleWithIcon 
                title={<p className='edgename'>{item.name}</p>} 
                icon={<AiOutlineFunction size={40} />}
                extra={<Tag text={item._id} />}
              /> 
            }
            children={<EdgeCard  { ...item } actions={actions} /> }
            classes={['mockify-card']}
          />
        ))}
      </div>

      {/* Pagination controls */}
      <div className="pagination-controls mt-4 flex items-center justify-between">
          <button className=' bg-light-secondary rounded-lg hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-l' onClick={handlePreviousPage}>Previous</button>
          <button className='bg-light-secondary rounded-lg  hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-r' onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
};
export default EdgeCards;
