import {createSlice} from '@reduxjs/toolkit';

export interface RuleNode {
  id: string;
  label: string;
}

interface RuleDetailsState {
  id: string;
  name: string;
  formula: string;
  nodes: RuleNode[];
}

const initialState: RuleDetailsState = {
  id: '1',
  name: 'Sample Rule',
  formula: 'A + B > C',
  nodes: [
    {id: '1', label: 'A'},
    {id: '2', label: 'B'},
    {id: '3', label: 'C'},
  ],
};

const ruleSlice = createSlice({
  name: 'ruleDetails',
  initialState,
  reducers: {
    setRule(state, action) {
      return {...state, ...action.payload};
    },
  },
});

export const ruleActions = ruleSlice.actions;

export default ruleSlice.reducer;
