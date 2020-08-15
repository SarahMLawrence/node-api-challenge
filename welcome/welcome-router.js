const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send('<h2>READY TO SEE THOSE ACTIONS!<h2>');
})

module.exports = router;