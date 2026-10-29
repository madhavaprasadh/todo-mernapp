import { randomUUID } from "node:crypto";

let todos = [];

export const get_ = (req, res) => {
  res.status(200).json(todos);
};

export const post_ = (req, res) => {
  const { title } = req.body;

  if (typeof title !== "string" || !title.trim()) {
    return res.status(400).json({
      message: "Todo title is required",
    });
  }

  const newTodo = {
    id: randomUUID(),
    title: title.trim(),
    completed: false,
  };

  todos.push(newTodo);

  res.status(201).json({
    message: "Todo created successfully",
    todo: newTodo,
  });
};

export const put_ = (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  const todo = todos.find((item) => item.id === id);

  if (!todo) {
    return res.status(404).json({
      message: "Todo not found",
    });
  }

  if (title !== undefined) {
    if (typeof title !== "string" || !title.trim()) {
      return res.status(400).json({
        message: "Todo title cannot be empty",
      });
    }

    todo.title = title.trim();
  }

  if (completed !== undefined) {
    if (typeof completed !== "boolean") {
      return res.status(400).json({
        message: "Completed must be a boolean",
      });
    }

    todo.completed = completed;
  }

  res.status(200).json({
    message: "Todo updated successfully",
    todo,
  });
};

export const delete_ = (req, res) => {
  const { id } = req.params;

  const index = todos.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Todo not found",
    });
  }

  const deletedTodo = todos.splice(index, 1)[0];

  res.status(200).json({
    message: "Todo deleted successfully",
    todo: deletedTodo,
  });
};
