import React from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const SideBar = () => {
	const history = useHistory();

	const HandleLogout = () => {
		return history.push("/");
	};

	return (
		<>
			<div class='sidebar'>
				<Link to='/home'>Home</Link>
				<Link to='/user'>Users</Link>
				<Link to='#' onClick={(e) => HandleLogout(e)}>
					LogOut
				</Link>
			</div>
		</>
	);
};

export default SideBar;
