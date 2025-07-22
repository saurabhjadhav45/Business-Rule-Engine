import Button from '@submodules/Button/Button';
import React from 'react';
import './RuleHeader.scss';

interface RuleHeaderProps {
  title: string;
  onEdit?: () => void;
}

function RuleHeader({title, onEdit}: RuleHeaderProps) {
  return (
    <div className='rule-header'>
      <h2>{title}</h2>
      {onEdit && (
        <Button
          variant='contained'
          color='primary'
          onClick={onEdit}
          size='small'>
          Edit
        </Button>
      )}
    </div>
  );
}

export default RuleHeader;
