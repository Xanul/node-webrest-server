import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../domain/dtos";

export class TodosController {

  // Dependency Injection
  constructor(){};

  // Get all todos from DB
  public getTodos = async (req:Request, res:Response) => {
    
    const allTodos = await prisma.todo.findMany();

    return res.json(allTodos);
  };

  // Get one todo from DB
  public getTodoById = async (req:Request, res:Response) => {
    const id = +req.params.id;
    if (isNaN(id)) return res.status(400).json({message: 'Invalid id!'});

    const todoFound = await prisma.todo.findFirst({
      where: {id: id} 
    })

    if (!todoFound) return res.status(404).json({message: `Todo with id ${id} was not found`});
    
    res.json(todoFound);

  };

  // Create a new todo
  public createTodo = async (req:Request, res:Response) => {

    const [error, createTodoDto] = CreateTodoDto.create(req.body); 
    if (error) return res.status(400).json({error});
    const newTodo = await prisma.todo.create({
      data: createTodoDto!
    });

    return res.json(newTodo);
    
  };

  // Update a existing todo
  public updateTodo = async (req:Request, res:Response) => {

    const id = +req.params.id;
    const [error, updateTodoDto] = UpdateTodoDto.create({...req.body, id});
    if (error) return res.status(400).json({error})

    const foundTodo = await prisma.todo.findUnique({
      where: {id: id}
    });

    if (!foundTodo) return res.status(404).json({message: `Todo with id ${id} was not found`});

    const updatedTodo = await prisma.todo.update({
      where: {id: id},
      data: updateTodoDto!.values
    });

    return res.json(updatedTodo);

  };

  // Delete a todo from DB
  public deleteTodo = async (req:Request, res:Response) => {

    const id = +req.params.id;
    if (isNaN(id)) return res.status(400).json({message: 'Invalid id!'});

    const foundTodo = await prisma.todo.findUnique({
      where: {id: id}
    })

    if (!foundTodo) return res.status(404).json({message: `Todo with id ${ id } was not found`});

    const todoToDelete = await prisma.todo.delete({
      where: {id: id}
    });

    return res.json({foundTodo, todoToDelete});

  };

}