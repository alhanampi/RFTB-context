import React, { useReducer } from "react";
import axios from "axios";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";
import {
	SEARCH_USERS,
	GET_USER,
	CLEAR_USERS,
	GET_REPOS,
	SET_LOADING,
} from "../types";

//state inicial para todo lo que tenga que ver con github. Incluye todas las acciones
const GithubState = (props) => {
	const initialState = {
		users: [],
		user: {},
		repos: [],
		loading: false,
	};

	//dispatch al reducer:
	const [state, dispatch] = useReducer(GithubReducer, initialState);

	// search users:
	const searchUsers = async (text) => {
		//el true del reducer
		setLoading();

		const res = await axios.get(
			`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);

		//en vez del setUsers, hago un dispatch al reducer, y en el payload envío la data:
		dispatch({ type: SEARCH_USERS, payload: res.data.items });
		//no necesito poner setLoading en false porque lo va a traer el payload de SEARCH_USERS
	};

	// get user:
	const getUser = async (username) => {
		setLoading();

		const res = await axios.get(
			`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);
		dispatch({ type: GET_USER, payload: res.data });
	};

	// get repos:
	const getRepos = async (username) => {
		setLoading();

		const res = await axios.get(
			`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);
		dispatch({ type: GET_REPOS, payload: res.data });
	};

	// clear users:
	const clearUsers = () => dispatch({ type: CLEAR_USERS });

	// set loading: lo único que quiero que haga es el dispatch al reducer
	const setLoading = () =>
		dispatch({
			type: SET_LOADING,
		});

	// provider: va a estar alrededor de la aplicación. En value paso todo lo que quiera que esté disponible para toda la app. Props.children porque voy a envolver toda la app en ese provider
	return (
		<GithubContext.Provider
			value={{
				users: state.users,
				user: state.user,
				repos: state.repos,
				loading: state.loading,
				searchUsers,
				clearUsers,
				getRepos,
				getUser,
			}}
		>
			{props.children}
		</GithubContext.Provider>
	);
};

export default GithubState;
