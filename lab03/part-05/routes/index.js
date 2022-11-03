const express = require("express");
const controller=require('../controller');
const router = express.Router();

router.get("/students",controller.getAllStudents);
router.get("/students/:index",controller.getStudentByIndex);

module.exports=router;
