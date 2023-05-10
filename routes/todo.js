const { Router } = require("express");
const router = Router();
const {
  createTodo,
  getTodo,
  getTodoById,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");

router.route("/todo").post(createTodo).get(getTodo);
router.route("/todo/:id").delete(deleteTodo).patch(updateTodo).get(getTodoById);

module.exports = router;
