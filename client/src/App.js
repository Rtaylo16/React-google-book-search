import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SearchBooks from "./pages/searchbooks";
import SavedBooks from "./pages/savedbooks.js";
import ResultsBooks from "./pages/resultsbooks.js";


function App() {
  return (
    <Router>
    <div>
     
      <Switch>
        <Route exact path="/" component={SearchBooks} />
        <Route exact path="/results" component={ResultsBooks} />
        <Route exact path="/saved" component={SavedBooks} /> 
      </Switch>

    </div>
  </Router>
  );
}

export default App;
