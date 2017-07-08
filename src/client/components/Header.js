import React from "react";

import { connect } from "react-redux";

@connect ((store) => {
	return {};
}) export default class Header extends React.Component {
	render() {
		return(
			<div>
				#header
			</div>
		);
	}
}