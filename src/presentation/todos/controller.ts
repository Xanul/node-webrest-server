import { Request, Response } from "express";

const todos = [
  {id: 1, title: 'Todo 1', completedAt: new Date()},
  {id: 2, title: 'Todo 2', completedAt: new Date()},
  {id: 3, title: 'Todo 3', completedAt: new Date()},
  {id: 4, title: 'Todo 4', completedAt: new Date()},
  {id: 5, title: 'Todo 5', completedAt: new Date()},
];

export class TodosController {

  // Dependency Injection
  constructor(){};

  public getTodos = (req:Request, res:Response) => {
    return res.json(todos);
  };

  public getTodoById = (req:Request, res:Response) => {
    const id = +req.params.id;
    if (isNaN(id)) return res.status(400).json({message: 'Invalid id!'});
    const todoFound = todos.find(todo => todo.id === id);
    
    (todoFound)
      ? res.json(todoFound)
      : res.status(404).json({message: `Todo with id ${id} not found!`});

  };

  public createTodo = (req:Request, res:Response) => {

    const { title } = req.body;
    if (!title) return res.status(400).json({message: 'Title is required!'});
    const newTodo = {
      id: todos.length + 1,
      title,
      completedAt: null!
    }
    todos.push(newTodo);
    return res.json(newTodo);
    
  };

  public updateTodo = (req:Request, res:Response) => {

    const id = +req.params.id;
    if (isNaN(id)) return res.status(400).json({message: 'Invalid id!'});

    const foundTodo = todos.find(todo => todo.id === id);
    if (!foundTodo) return res.status(404).json({message: `Todo with id ${id} not found!`});

    const { title, completedAt } = req.body;
    // if (!title) return res.status(400).json({message: 'Title is required!'});

    // Se actualiza el todo por referencia
    foundTodo.title = title || foundTodo.title;
    (completedAt === null)
      ? foundTodo.completedAt = null!
      : foundTodo.completedAt = new Date(completedAt || foundTodo.completedAt);
    return res.json(foundTodo);

  };

  public deleteTodo = (req:Request, res:Response) => {

    const id = +req.params.id;
    if (isNaN(id)) return res.status(400).json({message: 'Invalid id!'});

    const todoToDelete = todos.find(todo => todo.id === id);
    if (!todoToDelete) return res.status(400).json({message: `Todo not found with id ${id}`});

    const indexToDelete = todos.findIndex(todo => todo.id === id);
    todos.splice(indexToDelete, 1);

    return res.json(todoToDelete);

  };

}