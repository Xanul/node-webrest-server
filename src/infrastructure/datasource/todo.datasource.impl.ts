import { prisma } from "../../data/postgres";
import { CreateTodoDto, TodoDatasource, TodoEntity, UpdateTodoDto } from "../../presentation/domain";

export class TodoDatasourceImpl implements TodoDatasource {

  async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    
    const newTodo = await prisma.todo.create({
      data: createTodoDto!
    });

    return TodoEntity.fromObject(newTodo);

  }

  async getAll(): Promise<TodoEntity[]> {
    const allTodos = await prisma.todo.findMany();

    return allTodos.map( todo => TodoEntity.fromObject(todo) );
    
    
  }
  async findById(id: number): Promise<TodoEntity> {
    
    const todoFound = await prisma.todo.findFirst({
      where: {id: id} 
    })

    if (!todoFound) throw `Todo with id ${id} not found`;
    
    return TodoEntity.fromObject(todoFound)
  }

  async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    
    const { id, title, completedAt } = updateTodoDto;

    await this.findById(id);

    const updatedTodo = await prisma.todo.update({
      where: {id: id},
      data: updateTodoDto!.values
    });

    return TodoEntity.fromObject(updatedTodo);

  }
  async deleteById(id: number): Promise<TodoEntity> {

    await this.findById(id);

    const todoToDelete = await prisma.todo.delete({
      where: {id:id}
    });

    return TodoEntity.fromObject(todoToDelete);

  }
  
}