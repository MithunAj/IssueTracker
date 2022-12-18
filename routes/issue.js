const express = require('express');
const router = express.Router();
const IssueController = require('../controller/issue');

router.post('/:id/create',IssueController.createIssue);

router.get('/:id/newIssue',IssueController.newIssue);

router.post('/:id/filter',IssueController.filterIssues);

module.exports = router;


