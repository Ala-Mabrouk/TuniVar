const express = require("express")
const projectControl = require("../Controllers/projectsController");
const router = express.Router();

router.post("/addProject", projectControl.addProject)
router.post("/addProjectComment", projectControl.addComment)

router.get('/getProjectDetails/:idProjet', projectControl.getProjectById)
router.get('/allProjects', projectControl.getAllProjects)

module.exports = router