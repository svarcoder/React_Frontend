import React, { useState, useContext } from "react";
import { useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validator from "validator";
import Context from "../Context/Context";
import { PROFILE_DETAILS } from "../Context/action.type";

const Login = () => {
	const history = useHistory();
	const { dispatchDetails } = useContext(Context);

	const [userDetails, setUserDetails] = useState({
		email: "",
		password: "",
	});

	const [errors, setErrors] = useState({
		email: false,
		password: false,
	});

	const handelChange = (e) => {
		setUserDetails({
			...userDetails,
			[e.target.id]: e.target.value,
		});
	};

	const HandleValidation = (e) => {
		e.preventDefault();
		let flag = false;
		setErrors({
			email: false,
			password: false,
		});
		for (let i in userDetails) {
			if (i === "email" && !validator.isEmail(userDetails[i])) {
				setErrors((prevState) => ({
					...prevState,
					[i]: true,
				}));
				flag = true;
			} else if (i === "email" && validator.isEmpty(userDetails[i])) {
				setErrors((prevState) => ({
					...prevState,
					[i]: true,
				}));
				flag = true;
			}
			if (
				i === "password" &&
				!userDetails[i].match(
					/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/gi
				)
			) {
				setErrors((prevState) => ({
					...prevState,
					[i]: true,
				}));
				flag = true;
			}
		}
		if (!flag) {
			onLogIn(e);
		}
	};

	const onLogIn = (e) => {
		e.preventDefault();
		dispatchDetails({
			type: PROFILE_DETAILS,
			payload: userDetails,
		});
		history.push("/home");
		toast.success("Log In Successfully!");
	};

	return (
		<>
			<div id='Sec' className='App' style={{ marginTop: "2%" }}>
				<ToastContainer />
				<div>
					<div class='wrapper fadeInDown'>
						<div id='formContent'>
							<div class='fadeIn first logo2'>
								<img
									src='https://cdn.logojoy.com/wp-content/uploads/2018/05/01104813/1268-768x591.png'
									id='icon'
									alt='User Icon'
								/>
							</div>
							<form>
								<div className='rowww2'>
									{errors.email && (
										<label style={{ color: "red" }}>
											Enter Your Right Email
										</label>
									)}

									<input
										type='email'
										id='email'
										className='fadeIn second raw'
										placeholder='Username'
										name='userName'
										value={userDetails.email}
										onChange={handelChange}
										autocomplete='off'
										style={errors.email ? { border: "1px solid red" } : {}}
									/>

									{errors.password && (
										<label style={{ color: "red" }}>
											Password is Minimum Eight Characters, <br />
											One Uppercase Letter, One Lowercase Letter <br />
											and One Number
										</label>
									)}
									<input
										type='password'
										id='password'
										class='fadeIn third raw'
										name='password'
										placeholder='Password'
										value={userDetails.password}
										onChange={handelChange}
										autocomplete='off'
										style={errors.password ? { border: "1px solid red" } : {}}
									/>
									<input
										type='submit'
										class='fadeIn fourth raww'
										value='Log In'
										onClick={(e) => HandleValidation(e)}
									/>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
