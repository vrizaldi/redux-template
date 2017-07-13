import React from "react";
import Masonry from "react-masonry-component";

import Win from "./Win";

import sortWins from "../utils/sortWins";

export default class Wins extends React.Component {
	render() {
		sortWins(this.props.wins); // sort the wins in dates

		return(
			<Masonry id="wins-list" 
				className="grid"
				updateOnEachImageLoad={true}
				options={{
					columnWidth: "#grid-sizer", 
					itemSelector: ".grid-item"
				}}
			>
				<div id="grid-sizer"/>
				{
					this.props.wins.map((gridItem) => {
						var liked = gridItem.likers.findIndex((liker) => {
							// check if user is one of the likers
							return liker._id == this.props.user_id;
						}) > -1;	// -1 means they're not one of them
						return(
							<Win key={gridItem._id}
								gridItem={gridItem} 
								delete={this.props.delete}
								like={this.props.like}
								liked={liked}
							/>
						);
					})
				}
			</Masonry>
		);
	}
}