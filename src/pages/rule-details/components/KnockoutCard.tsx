import Card from '@submodules/Card/Card';
import React from 'react';
import './KnockoutCard.scss';

interface KnockoutCardProps {
  label: string;
  value: string;
}

function KnockoutCard({label, value}: KnockoutCardProps) {
  return (
    <Card
      border
      content={
        <div className='knockout-card-content'>
          <p className='label'>{label}</p>
          <p className='value'>{value}</p>
        </div>
      }
    />
  );
}

export default KnockoutCard;
