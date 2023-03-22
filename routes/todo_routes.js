const { createTodo, getTodo, updateTodo, deleteTodo } = require('../controllers/todo_controller');

const router = require('express').Router();

router.post('/todo', createTodo);
router.get('/todo', getTodo);
router.get('/todo/:id', getTodo);
router.put('/todo/:id', updateTodo);
router.delete('/todo/:id', deleteTodo);

module.exports = router;