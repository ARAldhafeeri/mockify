import React, { ReactNode } from 'react';
import { ICardTitle } from './Card.types';

const CardTitleWithIcon: React.FC<ICardTitle> = ({ title, icon, extra }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 ">
      <div className="flex items-center justify-center gap-2">
        {icon && <span className="flex-shrink-0">{icon}</span>}
        <h2 className="text-xl font-semibold text-center">{title}</h2>
      </div>
      {extra && <div className="text-sm text-gray-500">{extra}</div>}
    </div>
  );
};

export default CardTitleWithIcon;