import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

function App() {
	return (
		<div className='app'>
			<Router>
				<Switch>
					<Route exact path='/' component={() => <WelcomePage name='rony' email='rony@getd2.com'/>} />
					<Route exact path='/home' component={Home} />
					<Route exact path='/post/:id' component={Post} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;

export const WelcomePage = ({ name, email }) => {
	return(
		<div>
			<h1>{name}</h1>
			<p>{email}</p>
		</div>
	)
}

const Home = ({ history }) => {
	const [postId, setPostId] = useState("");
	return (
		<div>
			<h1>Welcome!</h1>
			<h2>Search for a post by its ID</h2>

			<label htmlFor="postId">Post ID: </label>
			<input
				id="postId"
				data-testid='post-id-input'
				value={postId}
				onChange={e => setPostId(e.target.value)}
			/>
			<button
				disabled={!postId}
				onClick={() => history.push(`/post/${postId}`)}
			>
				Submit
      		</button>
		</div>
	)
}


function Post({ match }) {
	const { id } = match.params;
	const [post, setPost] = useState();
	useEffect(() => {
		(async function fetch() {
			setPost(await fetchPost(id));
		})();
	}, [id]);
	return (
		<div>
			<h1>Post {id}</h1>
			{!post ? (
				<p>Loading...</p>
			) : (
				<>
					<h2>{post.title}</h2>
					<p>{post.body}</p>
				</>
			)}
			<Link to="/">Back to Home</Link>
		</div>
	);
}


const fetchPost = async postId => {
	const response = await fetch(
		`https://jsonplaceholder.typicode.com/posts/${postId}`
	);
	return response.json();
};
