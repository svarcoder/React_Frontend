import React, { useCallback, useContext, useEffect, useState } from "react";
import Context from "../Context/Context";

const UserTable = () => {
	const { details } = useContext(Context);
	const [limit] = useState(5);
	const [page, setPage] = useState(1);
	const [pagination, setPagination] = useState({
		totalPages: 0,
		startIndex: 0,
		totalLength: 0,
	});

	const [userDetails, setUserDetails] = useState([]);
	const [toggle, setToggle] = useState(false);
	const [toggle2, setToggle2] = useState(false);
	const [toggle3, setToggle3] = useState(false);

	useEffect(() => {
		if (!details?.data) return;
		setUserDetails(details?.data.slice(0, limit));

		setPagination((prevState) => ({
			...prevState,
			totalPages: Math.ceil(details?.data.length / limit),
			startIndex: limit,
			totalLength: details?.data.length,
		}));
	}, [details, limit]);

	const handleSortByName = useCallback(
		(e) => {
			if (!toggle) {
				console.log("SHORT");
				setUserDetails((prevState) =>
					prevState.sort((a, b) => {
						if (a.name < b.name) return -1;
						return 1;
					})
				);
			} else {
				setUserDetails((prevState) =>
					prevState.sort((a, b) => {
						if (a.id < b.id) return -1;
						return 1;
					})
				);
			}

			setToggle((prevState) => !prevState);
		},
		[setToggle, setUserDetails, toggle]
	);

	const handleSortByEmail = useCallback(
		(e) => {
			if (!toggle2) {
				console.log("SHORT");
				setUserDetails((prevState) =>
					prevState.sort((a, b) => {
						if (a.email < b.email) return -1;
						return 1;
					})
				);
			} else {
				setUserDetails((prevState) =>
					prevState.sort((a, b) => {
						if (a.id < b.id) return -1;
						return 1;
					})
				);
			}

			setToggle2((prevState) => !prevState);
		},
		[setToggle2, setUserDetails, toggle2]
	);
	const handleSortByUserName = useCallback(
		(e) => {
			if (!toggle3) {
				console.log("SHORT");
				setUserDetails((prevState) =>
					prevState.sort((a, b) => {
						if (a.username < b.username) return -1;
						return 1;
					})
				);
			} else {
				setUserDetails((prevState) =>
					prevState.sort((a, b) => {
						if (a.id < b.id) return -1;
						return 1;
					})
				);
			}

			setToggle3((prevState) => !prevState);
		},
		[setToggle3, setUserDetails, toggle3]
	);

	const handelNext = useCallback(
		(e) => {
			e.preventDefault();
			setUserDetails(
				details?.data.slice(pagination.startIndex, limit * (+page + 1))
			);
			setPagination((prevState) => ({
				...prevState,
				startIndex: limit * (+page + 1),
			}));
			setPage((prevState) => +prevState + 1);
		},
		[
			pagination,
			setPagination,
			setUserDetails,
			details?.data,
			limit,
			page,
			setPage,
		]
	);

	const handelPrev = useCallback(
		(e) => {
			e.preventDefault();
			console.log("GG", pagination.startIndex - limit * 2);
			setUserDetails(
				details?.data.slice(
					pagination.startIndex - limit * 2,
					pagination.startIndex - limit
				)
			);
			setPagination((prevState) => ({
				...prevState,
				startIndex: prevState.startIndex - limit,
			}));

			setPage((prevState) => +prevState - 1);
		},
		[pagination, setPagination, setUserDetails, details?.data, limit, setPage]
	);

	const handlePage = useCallback(
		(e) => {
			e.preventDefault();

			let tempPage = +e.target.name;
			setPage(tempPage);

			setUserDetails(
				details?.data.slice(limit * tempPage - limit, limit * tempPage)
			);
			setPagination((prevState) => ({
				...prevState,
				startIndex: limit * tempPage,
			}));
		},
		[details?.data, limit]
	);

	return (
		<>
			<div class='content p-4'>
				<div>
					<nav aria-label='Page navigation example'>
						<ul class='pagination'>
							<li class='page-item'>
								<button
									class='page-link'
									href='#'
									aria-label='Previous'
									onClick={handelPrev}
									disabled={page <= 1 ? true : false}>
									<span aria-hidden='true'>&laquo;</span>
								</button>
							</li>

							{Array(pagination.totalPages)
								.fill(0)
								.map((value, i) => (
									<li key={i} class='page-item' onClick={handlePage}>
										<button
											name={i + 1}
											class={
												page === i + 1 ? "bg-dark page-link" : " page-link"
											}>
											{i + 1}
										</button>
									</li>
								))}
							<li class='page-item'>
								<button
									class='page-link'
									href='#'
									aria-label='Next'
									onClick={handelNext}
									disabled={
										pagination.startIndex >= pagination.totalLength
											? true
											: false
									}>
									<span aria-hidden='true'>&raquo;</span>
								</button>
							</li>
						</ul>
					</nav>
				</div>

				<table class='table'>
					<thead>
						<tr>
							<th scope='col'>Id</th>
							<th scope='col' onClick={handleSortByName}>
								Name
							</th>
							<th scope='col' onClick={handleSortByEmail}>
								Email
							</th>
							<th scope='col' onClick={handleSortByUserName}>
								User Name
							</th>
							<th scope='col'>Phone</th>
							<th scope='col'>Website</th>
							<th scope='col'>Address</th>
							<th scope='col'>Company</th>
						</tr>
					</thead>
					<tbody>
						{userDetails &&
							userDetails.map((value, i) => (
								<tr key={i}>
									<th scope='row'>{value?.id}</th>
									<td>{value?.name}</td>

									<td>{value?.email}</td>
									<td>{value?.username}</td>
									<td>{value?.phone}</td>
									<td>{value?.website}</td>
									<td>
										{value?.address?.street +
											"," +
											value?.address?.city +
											"," +
											value?.address?.zipcode}
									</td>
									<td>{value?.company?.name}</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default UserTable;
