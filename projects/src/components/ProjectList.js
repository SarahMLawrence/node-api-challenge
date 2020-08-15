import React, { useState, useEffect } from "react";
import { Axios } from "../utils/Axios";
import { useHistory } from "react-router-dom";

function ProjectList() {
  const history = useHistory();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    Axios()
      .get("/projects")
      .then((res) => {
        console.log(res);
        setProjects(res.data);
      });
  }, []);

  return (
    <div>
      {projects ? (
        projects.map((project) => {
          return (
            <div className="row">
              <div className="column">
                <div className="content" key={project.id}>
                  <h3>ID: {project.id}</h3>
                  <h3>Name: {project.name}</h3>
                  <h3 className="card-title">
                    Description: {project.description}
                  </h3>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <h1>Awesome List of Projects </h1>
      )}
    </div>
  );
}

export default ProjectList;
