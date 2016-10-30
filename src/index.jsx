import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Router, hashHistory, browserHistory} from 'react-router';
import App from './components/App';
import Results from './components/Results';
import {createStore, applyMiddleware} from 'redux';
import reducer from './reducer';
import {Provider} from 'react-redux';
import {VotingContainer} from './components/Voting';
import {ResultsContainer} from './components/Results';
import io from 'socket.io-client';
import {setState} from './action_creators';
import remoteActionMiddleware from './remote_action_middleware';

//const store = createStore(reducer);
const location = {
	protocol: 'http',
	hostname: 'localhost'
};
//const socket = io('${location.protocol}//${location.hostname}:8090');
//const socket = io(`${location.protocol}//${location.hostname}:8090`);
const socket = io('http://localhost:8090');

const createStoreWithMiddleware = applyMiddleware(
	remoteActionMiddleware(socket)
)(createStore);
const store = createStoreWithMiddleware(reducer);


socket.on('state', state => 
	store.dispatch(setState(state))
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
