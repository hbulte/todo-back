import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Patch,
  Delete,
  Get,
} from '@nestjs/common';
import { TodoService } from './todos.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getTodo(@Request() req) {
    const { user } = req;
    return await this.todoService.getTodo(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('add-todo')
  async addTodo(@Request() req) {
    const user = req.user;
    return await this.todoService.addTodo(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('add-task')
  async addTask(@Body() body, @Request() req) {
    const { todoId } = body;

    const { user } = req;
    return await this.todoService.addTask(todoId, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete-task')
  async deleteTask(@Body() body, @Request() req) {
    const { taskId } = body;
    const { user } = req;
    return await this.todoService.deleteTask(taskId, user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update-todo')
  async updateTodo(@Body() body, @Request() req) {
    const { user } = req;
    console.log(body, user);
    return await this.todoService.updateTodo(body, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete-todo')
  async deletetodo(@Body() body, @Request() req) {
    const { todoId } = body;

    const { user } = req;
    return this.todoService.deleteTodo(todoId, user);
  }
}
