/*
Let's set up the skeleton for this middleware. 
It is a function that takes a Redux store, and returns another function that takes a "next" callback. 
That function returns a third function that takes a Redux action. 
The innermost function is where the middleware implementation will actually go:
export default function(store) {
  return function(next) {
    return function(action) {

    }
  }
}
*/
export default socket => store => next => action=> {
	/*
	console.log('socket', socket);
	console.log('action',action);
	*/
	if(action.meta && action.meta.remote){
		socket.emit('action', action);
	}
	return next(action);
}
