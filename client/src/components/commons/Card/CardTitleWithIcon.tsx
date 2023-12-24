import Icon from '@ant-design/icons/lib/components/Icon'
import { Header } from 'antd/es/layout/layout'
import React, { ReactNode } from 'react'
import { ICardTitle } from './Card.types'
import { Col, Row } from 'antd'

const  CardTitleWithIcon : React.FC<ICardTitle> = ({title, icon, extra}) =>  {
  return (
    <div className='titleCard'>
      <div className="titleAndIcon">
        {icon}    {title}
      </div>
      <div className="titleExtra">
        {extra}
      </div>
    </div>
  )
}

export default CardTitleWithIcon;
