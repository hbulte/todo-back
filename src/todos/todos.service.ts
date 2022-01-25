import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
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

  async addTodo(todo, userId) {
    const { tasks } = todo;

    await this.taskRepository.save(tasks[0]);
    const resp_todo = await this.todoRepository.save(todo);
    await getConnection()
      .createQueryBuilder()
      .relation(User, 'todos')
      .of(userId)
      .add(todo);

    return resp_todo;
  }

  async addTask(task) {
    const { criteria, partialEntity } = task;
    await this.taskRepository.save(partialEntity);
    await getConnection()
      .createQueryBuilder()
      .relation(TodoEntity, 'tasks')
      .of(criteria.todo_id)
      .add(partialEntity);
  }

  async deleteTask(task: any) {
    return await this.taskRepository.delete(task.task_id);
  }

  async deleteTodo(todo) {
    return await this.todoRepository.delete(todo.todo_id);
  }
}
