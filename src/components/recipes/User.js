import React, { useEffect, Fragment, useContext } from "react";
import Spinner from "../layout/Spinner";
import Repos from "../repos/Repos";
import { Link } from "react-router-dom";
import GithubContext from "../../context/github/githubContext";

const User = ({ match }) => {
	const githubContext = useContext(GithubContext);
	const { user, loading, repos, getUser, getRepos } = githubContext;

	useEffect(() => {
		getUser(match.params.login);
		getRepos(match.params.login);
		// eslint-disable-next-line
	}, []);

	const {
		name,
		avatar_url,
		location,
		bio,
		blog,
		login,
		company,
		html_url,
		followers,
		following,
		public_repos,
		public_gists,
		hireable,
	} = user;

	if (loading) return <Spinner />;
	else
		return (
			<Fragment>
				<Link to="/" className="btn btn-light">
					Back to Search
				</Link>
				<span>
					Hireable:{" "}
					{hireable ? (
						<i className=" fa fa-check text-success"></i>
					) : (
						<i className=" fa fa-times-circle text-danger"></i>
					)}
				</span>
				<div className="card grid-2">
					<div className="all-center">
						<img
							src={avatar_url}
							className="round-img"
							style={{ width: "150px" }}
							alt="avatar"
						/>
						<h1>{name}</h1>
						<p>Location: {location}</p>
					</div>
					<div>
						{bio && (
							<Fragment>
								<h3>Bio</h3>
								<p>{bio}</p>
							</Fragment>
						)}
						<a
							href={html_url}
							className="btn btn-dark my-1"
							rel="noopener noreferrer"
							target="_blank"
						>
							Go to GitHub
						</a>
						<ul>
							<li>
								{login && (
									<Fragment>
										<strong>Username: </strong>
										{login}
									</Fragment>
								)}
							</li>
							<li>
								{company && (
									<Fragment>
										<strong>Company: </strong>
										{company}
									</Fragment>
								)}
							</li>
							<li>
								{blog && (
									<Fragment>
										<strong>Website: </strong>
										{blog}
									</Fragment>
								)}
							</li>
						</ul>
					</div>
				</div>

				<div className="card text-center">
					<div className="badge badge-primary">Followers: {followers}</div>
					<div className="badge badge-success">following: {following}</div>
					<div className="badge badge-danger">Public repos: {public_repos}</div>
					<div className="badge badge-dark">Public gists: {public_gists}</div>
				</div>

				<Repos repos={repos}></Repos>
			</Fragment>
		);
};

export default User;
