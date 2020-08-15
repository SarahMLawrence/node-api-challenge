import React, { useState, useEffect } from "react";
import { Axios } from "../utils/Axios";
import { useHistory } from "react-router-dom";

function ActionList() {
  const history = useHistory();
  const [actions, setActions] = useState([]);

  useEffect(() => {
    Axios()
      .get("/actions")
      .then((res) => {
        console.log(res);
        setActions(res.data);
      });
  }, []);

  return (
    <div>
      {actions ? (
        actions.map((action) => {
          return (
            <div className="row">
              <div className="column">
                <div className="content" key={action.id}>
                  <h3>ID: {action.id}</h3>
                  <h3>Text: {action.text}</h3>
                  <h3 className="card-title">
                    Description: {action.description}
                  </h3>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <h1>Awesome List of Actions </h1>
      )}
    </div>
  );
}

export default ActionList;
