import { Request, Response } from "express";

const todos = [
  {id: 1, title: 'Todo 1', createdAt: new Date()},
  {id: 2, title: 'Todo 2', createdAt: new Date()},
  {id: 3, title: 'Todo 3', createdAt: new Date()},
  {id: 4, title: 'Todo 4', createdAt: new Date()},
  {id: 5, title: 'Todo 5', createdAt: new Date()},
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

    const body = req.body;
    return res.json(body);
    

  };

}