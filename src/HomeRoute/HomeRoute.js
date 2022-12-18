import React from "react";
import { Route, Switch } from "react-router";
import HomePage from "../Component/HomePage";
import Login from "../Component/Login";
import User from "../Component/User";

const HomeRoute = () => {
	return (
		<>
			<Switch>
				<Route exact path='/' component={Login}></Route>
				<Route exact path='/home' component={HomePage}></Route>
				<Route exact path='/user' component={User}></Route>
			</Switch>
		</>
	);
};

export default HomeRoute;
