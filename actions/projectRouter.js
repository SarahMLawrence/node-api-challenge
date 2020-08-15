const express = require("express");
const Projects = require("../data/helpers/projectModel");
const Actions = require("../data/helpers/actionModel");

const router = express.Router();

//-----------------------//
// GET LIST OF projects  //
//-----------------------//
router.get("/projects", (req, res) => {
  Projects.get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error fetching list of projects " });
    });
});

//-----------------------------//
//  GET LIST OF PROJECT BY ID  //
//-----------------------------//
router.get("/projects/:id", validateProjectId, (req, res) => {
  res.status(200).json(req.project);
});

//----------------------//
// DELETE PROJECT BY ID //
//----------------------//
router.delete("/actions/:id", validateProjectId, (req, res) => {
  Projects.remove(req.project.id)
    .then((id) => {
      res.status(200).json({ message: `Successfully delete project` });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error removing the project!",
      });
    });
});

//------------------------//
//  UPDATE PROJECT BY ID  //
//------------------------//
router.put("/projects/:id", validateProjectId, (req, res) => {
  Projects.update(req.params.id, req.body)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error updating the Project!",
      });
    });
});


//------------------------//
//  POST A NEW PROJECT    //
//------------------------//
router.post("/projects", validateProject, (req, res) => {
  Projects.insert(req.body)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error creating a new project!",
      });
    });
});

//------------------------------------//
//  POST A NEW ACTION BY PROJECT ID   //
//------------------------------------//
router.post(
  "/projects/:id/actions",
  validateAction,
  validateProjectId,
  (req, res) => {
    let id = req.params.id;
    let action = {
      project_id: id,
      description: req.body.description,
      notes: req.body.notes,
    };
    Actions.insert(action)
      .then((action) => {
        res.status(201).json(action);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          error: " There was an error while saving the post to the database",
        });
      });
  }
);

//-------------------------------------------CUSTOM MIDDLEWARE---------------------------------------------//
function validateProjectId(req, res, next) {
  Projects.get(req.params.id)
    .then((project) => {
      if (project) {
        req.project = project;
        next();
      } else {
        res.status(400).json({
          message: "PROJECT NOT FOUND",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "There was an error retrieving the project",
      });
    });
}

function validateProject(req, res, next) {
  if (!req.body) {
    res.status(400).json({
      message: "missing project data",
    });
  } else if (!req.body.name || !req.body.description) {
    res.status(400).json({
      message: "missing required fields",
    });
  }
  next();
}

function validateAction(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "missing project data" }).end();
  } else {
    next();
  }
}
module.exports = router;
