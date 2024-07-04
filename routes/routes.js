const express = require('express');
const router = express.Router();
const { login, signup } = require('../controller/userController');
const { createObject, viewObject, updateStatus, deleteObject } = require('../controller/interviewTableController');

router.post("/login", login);
router.post("/signup", signup);
router.post("/tasks/create", createObject);
router.get("/tasks/view", viewObject);
router.put("/tasks/update/:id", updateStatus);
router.delete("/tasks/delete/:id", deleteObject);

module.exports = router;
