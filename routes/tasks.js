const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/tasksController');

router.get('/', authMiddleware, getTasks);
router.post('/', authMiddleware, createTask);
router.put('/:id', authMiddleware, updateTask);
router.delete('/:id', authMiddleware, deleteTask);

module.exports = router;