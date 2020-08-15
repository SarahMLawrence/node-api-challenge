const express = require("express");
const Actions = require("../data/helpers/actionModel");
// const Projects = require("../data/helpers/projectModel");
const router = express.Router();

//----------------------//
// GET LIST OF ACTIONS  //
//----------------------//
router.get("/actions", (req, res) => {
  Actions.get()
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error fetching list of actions " });
    });
});

//-----------------------------//
//  GET LIST OF ACTIONS BY ID  //
//-----------------------------//
router.get("/actions/:id", validateActionId, (req, res) => {
  res.status(200).json(req.action);
});

//---------------------//
// DELETE ACTION BY ID //
//---------------------//
router.delete("/actions/:id", validateActionId, (req, res) => {
  Actions.remove(req.action.id)
    .then((id) => {
      res.status(200).json({ message: `Successfully delete action` });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error removing the action!",
      });
    });
});

//-----------------------//
//  UPDATE ACTION BY ID  //
//-----------------------//
router.put("/actions/:id", validateAction, validateActionId, (req, res) => {
  Actions.update(req.params.id, req.body)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error updating the action!",
      });
    });
});

//-------------------------------------------CUSTOM MIDDLEWARE---------------------------------------------//
function validateActionId(req, res, next) {
  Actions.get(req.params.id)
    .then((action) => {
      if (action) {
        req.action = action;
        next();
      } else {
        res.status(400).json({
          message: "ACTION NOT FOUND",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "There was an error retrieving the action",
      });
    });
}

function validateAction(req, res, next) {
  if (!res.body) {
    res.status(400).json({
      message: "missing action data",
    });
  } else if (!req.body.project_id || !req.body.description || !req.body.notes) {
    res.status(400).json({
      message: "missing required description and notes fields",
    });
  }
  next();
}

module.exports = router;
