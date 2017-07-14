import React from "react";
import { Link } from "react-router-dom";

import Button from "./Button";
import Image from "./Image";

export default class Win extends React.Component {
	constructor() {
		super();

		this.state = {
			liked: false
		};
	}

	componentWillMount() {
		// default value
		this.setState({
			liked: this.props.liked 
		});
	}

	toggleLike() {
		// notify the app about the change
		const change = !this.state.liked;
		this.props.like(this.props.gridItem._id, change);
		
		// switch the liked state
		this.setState({
			liked: change
		});
	}

	render() {
		const { gridItem } = this.props;
		return(
			<div class="grid-item">
				<Image src={gridItem.imageurl}/>
				<p>{gridItem.desc}</p>

				<Link to={"/profile?id=" + gridItem.by_id}>
					{gridItem.by}
				</Link>

				{
					this.props.like ? (
						<div>
							<input id={"like-btn-" + gridItem._id} 
								className="like-btn"
								type="checkbox"
								onChange={this.toggleLike.bind(this)}
								checked={this.state.liked}
							/>
							<label for={"like-btn-" + gridItem._id}>
								<i className="fa fa-thumbs-up"/> {gridItem.likers.length}
							</label>
						</div>
					) : ""
				}

				{
					this.props.delete ? (
						<Button className="btn btn-danger"
							value={gridItem._id}
							action={this.props.delete}
						>
							Delete
						</Button>
					) : ""
				}
			</div>
		);
	}
}