import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Patch,
  Delete,
} from '@nestjs/common';
import { TodoService } from './todos.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @UseGuards(JwtAuthGuard)
  @Post('add-todo')
  async addTodo(@Request() req, @Body() todo) {
    const userId = req.user.id;
    return await this.todoService.addTodo(todo, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('add-task')
  async addTask(@Body() task) {
    return await this.todoService.addTask(task);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete-task')
  async deleteTask(@Body() task) {
    console.log(task);
    return await this.todoService.deleteTask(task);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete-todo')
  async deletetodo(@Body() todo) {
    return this.todoService.deleteTodo(todo);
  }
}
