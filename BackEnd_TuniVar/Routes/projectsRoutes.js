const express = require("express")
const projectControl = require("../Controllers/projectsController");
const router = express.Router();

router.post("/addProject", projectControl.addProject)
router.get('/:nomProjet', projectControl.userInfo)
router.get('/allProjects', projectControl.getAllProjects)
 


module.exports = router