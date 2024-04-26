import Icon from '@ant-design/icons/lib/components/Icon'
import { Header } from 'antd/es/layout/layout'
import React, { ReactNode } from 'react'
import { ICardTitle } from './Card.types'
import Horz from '../Dividers/Horz'

const  CardTitleWithIcon : React.FC<ICardTitle> = ({title, icon, extra}) =>  {
  
  
  return (
    <>
      <div className='flex flex-row justify-center'>
          {icon}
          <div className='flex flex-col'>
          <span>{title}</span>
          <span className='text-xs'>{extra}</span>
          </div>   
      </div>
      <Horz />
    </>
  )
}

export default CardTitleWithIcon;
