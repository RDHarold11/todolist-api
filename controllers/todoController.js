const Todo = require("../models/Todo");

const createTodo = async (req, res) => {
  if (!req?.body?.title || !req?.body?.description)
    return res
      .status(204)
      .json({ message: "title and description are required" });

  try {
    const result = await Todo.create({
      title: req.body.title,
      description: req.body.description,
    });
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
  }
};

const getTodo = async (req, res) => {
  const todo = await Todo.find();
  if (!todo)
    return res.status(204).json({ message: "Theres no todo list items" });
  res.json(todo);
};

const getTodoById = async (req, res) => {
  if (!req.params.id) return res.status(400);

  const todo = await Todo.findOne({ _id: req.params.id }).exec();
  if (!todo)
    return res.status(400).json({ message: "Theres no todo list to display" });
  res.json(todo);
};

const deleteTodo = async (req, res) => {
  if (!req.params.id)
    return res.status(400).json({ message: "No todo list item to display" });

  const todo = await Todo.findOne({ _id: req.params.id }).exec();
  if (!todo) return res.status(400).json({ message: "No todo list" });

  const result = todo.deleteOne({ _id: req.params.id });
  res.json(result);
};

const updateTodo = async (req, res) => {
  if (!req.body.title || !req.body.description)
    return res
      .status(400)
      .json({ message: "title and description cant be empty" });

  const todo = await Todo.findOne({ _id: req.params.id }).exec();
  if (req.body?.title) todo.title = req.body.title;
  if (req.body?.description) todo.description = req.body.description;
  const result = await todo.save();
  res.json(result);
};

module.exports = { createTodo, getTodo, getTodoById, deleteTodo, updateTodo };
