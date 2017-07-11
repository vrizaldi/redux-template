import React from "react";

export default class Wins extends React.Component {
	render() {
		return(
			<div class="grid">
				{
					this.props.wins.map((gridItem) => {
						return(
							<div class="grid-item">
								<img src={gridItem.imageurl} alt={gridItem.title}/>
								<p>{gridItem.desc}</p>
							</div>
						);
					})
				}
			</div>
		);
	}
}