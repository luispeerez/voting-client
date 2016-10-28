import React from 'react';

export default class Winner extends React.Component{
	render(){
		return(
			<h1 className="winner">
				Winner is {this.props.winner}
			</h1>
		);
	}	
}