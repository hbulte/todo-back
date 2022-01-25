import { Module } from '@nestjs/common';
import { TodoController } from './todos.controller';
import { TodoService } from './todos.service';
import { TodoEntity } from './entities/todo.entity';
import { TaskEntity } from './entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from 'src/users/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity, TaskEntity, User])],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
