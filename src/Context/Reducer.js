/** @format */

import { PROFILE_DETAILS, USER_DETAILS } from "./action.type";

let initialState = {
	data: [],
	userDetails: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
	switch (action.type) {
		case PROFILE_DETAILS:
			return {
				...state,
				userDetails: action.payload,
			};
		case USER_DETAILS:
			return {
				...state,
				data: action.payload,
			};

		default:
			return state;
	}
};
