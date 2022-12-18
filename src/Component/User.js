import axios from "axios";
import React, { useContext, useEffect } from "react";
import SideBar from "./SideBar";
import UserTable from "./UserTable";
import Context from "../Context/Context";
import { USER_DETAILS } from "../Context/action.type";

const User = () => {
	const { dispatchDetails } = useContext(Context);

	useEffect(() => {
		axios
			.get(`https://jsonplaceholder.typicode.com/users`)
			.then(({ data }) => {
				console.log("admin", data);
				dispatchDetails({
					type: USER_DETAILS,
					payload: data,
				});
			})
			.catch((err) => {
				console.log("err", err);
			});
	}, []);

	return (
		<>
			<SideBar />
			<div>
				<h2 className='p-2'>Users</h2>
			</div>
			<UserTable />
		</>
	);
};

export default User;
