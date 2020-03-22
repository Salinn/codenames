import React from "react";
import Firebase from "firebase/app";
import config from "../config";

import NavBar from "./NavBar";

// New - import the React Router components, and the Profile page component
import { Router, Route, Switch } from "react-router-dom";
import Profile from "./Profile";
import history from "../utils/history";
import PrivateRoute from "./PrivateRoute";
import Home from "./Home"
import Game from "./Game";

function App() {
  Firebase.initializeApp(config.firebase);
  return (
    <div className="App">
      {/* Don't forget to include the history module */}
      <Router history={history}>
        <header>
          <NavBar />
        </header>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/profile" component={Profile} />
          <Route path="/codenames" component={Game} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
