import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignIn from "./components/home.js"

const App = () => (
	<Router>
		<div>
			
			<Switch>
				<Route exact path="/" component={SignIn} />
				
			</Switch>
		</div>
	</Router>
);

export default App;
