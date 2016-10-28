import React from 'react';

export default class Vote extends React.Component{
	constructor(){
		super();
		this.getPair = this.getPair.bind(this);
		this.vote = this.vote.bind(this);
		this.isDisabled = this.isDisabled.bind(this);
		this.hasVotedFor = this.hasVotedFor.bind(this);
	}
	vote(entry){
		this.props.vote(entry);
	}
	getPair(){
		return this.props.pair || [];
	}
	isDisabled(){
		return !!this.props.hasVoted;
	}
	hasVotedFor(entry){
		return this.props.hasVoted === entry;
	}
	render(){
		return (
			<div className="voting">
				{
					this.getPair().map( entry => 
						<button 
							key={entry} 
							disabled={this.isDisabled()}
							onClick={ () => this.vote(entry) }
						>
							<h1>{entry}</h1>
							{this.hasVotedFor(entry) ? 
								<div className="label">Voted</div> :
								null
							}
						</button>
					)
				}
			</div>
		);
	}	
}