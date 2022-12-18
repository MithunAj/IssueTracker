const express = require('express');
const router = express.Router();
const projectController = require('../controller/project')

router.get('/new',projectController.newProject);

router.post('/create',projectController.createProject);

router.get('/details/:id',projectController.projectDetails);

module.exports = router;