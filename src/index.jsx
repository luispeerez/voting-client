import React from 'react';
import ReactDOM from 'react-dom';
import Voting from './components/Voting';

const pair = ['Trainspotting', '28 days later'];
const winner = 'Trainspotting';

ReactDOM.render(
  <Voting pair={pair} hasVoted="Trainspotting" winner={winner} />,
  document.getElementById('app')
);