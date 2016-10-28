import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Router, hashHistory, browserHistory} from 'react-router';
import App from './components/App';
import Results from './components/Results';
import {createStore} from 'redux';
import reducer from './reducer';
import {Provider} from 'react-redux';
import {VotingContainer} from './components/Voting';
import {ResultsContainer} from './components/Results';
import io from 'socket.io-client';

const store = createStore(reducer);
store.dispatch({
	type: 'SET_STATE',
	state:{
		vote:{
			pair:['Sunshine', '28 days later'],
			tally:{Sunshine:2}
		}
	}
});

const location = {
	protocol: 'http',
	hostname: 'localhost'
};
//const socket = io('${location.protocol}//${location.hostname}:8090');
//const socket = io(`${location.protocol}//${location.hostname}:8090`);
const socket = io('http://localhost:8090');

socket.on('state', state => 
	store.dispatch({type:'SET_STATE', state})
);

const routes = <Route component={App}>
	<Route path="/results" component={ResultsContainer} />
	<Route path="/" component={VotingContainer} />
</Route>;

ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory}>{routes}</Router>
	</Provider>,
  document.getElementById('app')
);
