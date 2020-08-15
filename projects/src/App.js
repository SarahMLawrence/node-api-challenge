import React, { useState, useEffect } from "react";
import { Route, NavLink } from "react-router-dom";
import { Axios } from "./utils/Axios";
import ProjectList from "./components/ProjectList";
import ActionList from "./components/ActionList";

import "./App.css";

function App() {
  const [projectList, setProjectList] = useState([]);
  const [actionList, setActionList] = useState([]);

  //GET PROJECTS
  useEffect(() => {
    Axios()
      .get("/projects")
      .then((res) => setProjectList(res.data))
      .catch((err) => console.log(err));
  }, []);

  //GET ACTIONS
  useEffect(() => {
    Axios()
      .get("/actions")
      .then((res) => setActionList(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <nav>
        <h1>WELCOME</h1>
        <h1>DISCOVER THE LIST OF PROJECTS AND ACTIONS</h1>
        <div className="nav-link">
          <NavLink exact to="/">
            Home
          </NavLink>
          <NavLink to="/project-list">Project List</NavLink>
          <NavLink to="/action-list">Action List</NavLink>
        </div>
      </nav>

      <Route exact path="/" />
      <Route
        exact
        path="/project-list"
        render={(props) => <ProjectList {...props} projectList={projectList} />}
      />
      <Route
        exact
        path="/action-list"
        render={(props) => <ActionList {...props} actionList={actionList} />}
      />
    </div>
  );
}

export default App;
