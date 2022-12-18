import React, { useContext, useEffect, useState } from "react";
import SideBar from "./SideBar";
import Context from "../Context/Context";

const HomePage = () => {
	const { details } = useContext(Context);
	const [homeDetails, setHomeDetails] = useState(null);

	useEffect(() => {
		if (!details) return;
		setHomeDetails(details?.userDetails);
	}, [details]);

	return (
		<>
			<SideBar />
			<div class='content p-4'>
				<div class='card'>
					<h2 className='p-2 home_card'>Dashboard</h2>
					<div class='card-body home_card'>
						Log In Successfully! <br />
						Your UserName is {homeDetails?.email} & Password is{" "}
						{homeDetails?.password}
					</div>
				</div>
			</div>
		</>
	);
};

export default HomePage;
