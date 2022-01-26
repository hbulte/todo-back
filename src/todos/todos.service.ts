import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Connection,
  ConnectionManager,
  createQueryBuilder,
  getConnection,
  getRepository,
  Repository,
} from 'typeorm';
import { TodoEntity } from './entities/todo.entity';
import { TaskEntity } from './entities/task.entity';
import { User } from 'src/users/entity/user.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getTodo(user) {
    return await createQueryBuilder(TodoEntity, 'todo')
      .leftJoinAndSelect('todo.tasks', 'task')
      .where('todo.id = task.todoId')
      .andWhere('todo.userId = :id', { id: user.id })
      .getMany();
  }

  async addTodo(user) {
    const resp = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(TodoEntity)
      .values({ title: 'Titre', user: user })
      .execute();

    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(TaskEntity)
      .values({ task: 'Tâche', todo: resp.identifiers[0].id })
      .execute();

    return await createQueryBuilder(TodoEntity, 'todo')
      .leftJoinAndSelect('todo.tasks', 'task')
      .where('todo.id = task.todoId')
      .andWhere('todo.userId = :id', { id: user.id })
      .getMany();
  }

  async addTask(todoId, user) {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(TaskEntity)
      .values({ task: 'Tâche', todo: todoId })
      .execute();

    return await createQueryBuilder(TodoEntity, 'todo')
      .leftJoinAndSelect('todo.tasks', 'task')
      .where('todo.id = task.todoId')
      .andWhere('todo.userId = :id', { id: user.id })
      .getMany();
  }

  async deleteTask(taskId, user) {
    await this.taskRepository.delete(taskId);

    return await createQueryBuilder(TodoEntity, 'todo')
      .leftJoinAndSelect('todo.tasks', 'task')
      .where('todo.id = task.todoId')
      .andWhere('todo.userId = :id', { id: user.id })
      .getMany();
  }

  async deleteTodo(todoId, user) {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(TaskEntity)
      .where('todoId = :id', { id: todoId })
      .execute();
    await this.todoRepository.delete(todoId);

    return await createQueryBuilder(TodoEntity, 'todo')
      .leftJoinAndSelect('todo.tasks', 'task')
      .where('todo.id = task.todoId')
      .andWhere('todo.userId = :id', { id: user.id })
      .getMany();
  }

  async updateTodo(body, user) {
    const { todoId, updatedValue } = body;
    await this.todoRepository.update(todoId, updatedValue);

    return await createQueryBuilder(TodoEntity, 'todo')
      .leftJoinAndSelect('todo.tasks', 'task')
      .where('todo.id = task.todoId')
      .andWhere('todo.userId = :id', { id: user.id })
      .getMany();
  }
}
