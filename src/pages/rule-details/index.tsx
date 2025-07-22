import React from 'react';
import {useSelector} from 'react-redux';
import ReactFlow, {Background, Controls} from 'reactflow';
import 'reactflow/dist/style.css';
import KnockoutCard from './components/KnockoutCard';
import FormulaBlock from './components/FormulaBlock';
import RuleHeader from './components/RuleHeader';
import {RootState} from '@store';
import './index.scss';

function RuleDetailsPage() {
  const {id, name, formula, nodes} = useSelector(
    (state: RootState) => state.ruleDetails
  );

  const flowNodes = nodes.map((n, idx) => ({
    id: n.id,
    data: {label: n.label},
    position: {x: idx * 150, y: 50},
  }));

  return (
    <div className='rule-details-page'>
      <RuleHeader title={name} onEdit={() => {}} />
      <div className='rule-content'>
        <div className='left-panel'>
          <KnockoutCard label='Rule ID' value={id} />
          <FormulaBlock formula={formula} />
        </div>
        <div className='flow-panel'>
          <ReactFlow nodes={flowNodes} edges={[]} fitView>
            <Background />
            <Controls />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}

export default RuleDetailsPage;
