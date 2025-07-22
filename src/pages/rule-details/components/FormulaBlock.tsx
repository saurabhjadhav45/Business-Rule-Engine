import React from 'react';
import './FormulaBlock.scss';

interface FormulaBlockProps {
  formula: string;
}

function FormulaBlock({formula}: FormulaBlockProps) {
  return <div className='formula-block'>{formula}</div>;
}

export default FormulaBlock;
