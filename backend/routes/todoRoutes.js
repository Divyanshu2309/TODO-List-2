const express = require("express");
const { createTodo, updateTodo, deleteTodo, getTodos } = require("../controller/todoController");

const todorouter = express.Router();

// Define routes and associate them with controller functions
todorouter.post("/create", createTodo);
todorouter.put("/edit", updateTodo);
todorouter.post("/delete", deleteTodo);
todorouter.post("/getall", getTodos);
module.exports = todorouter;
