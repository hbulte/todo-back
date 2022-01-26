import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';
import { BaseExceptionFilter } from '@nestjs/core';
import { TodoEntity } from 'src/todos/entities/todo.entity';
import { TaskEntity } from '../todos/entities/task.entity';

Repository;
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(username: string): Promise<User> {
    return await this.usersRepository.findOne({ username: username });
  }

  async signUp({ username, email, password }) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    const newUser = {
      username: username,
      email: email,
      salt: salt,
      hash: hash,
    };

    try {
      await this.usersRepository.save(newUser);
    } catch (error) {
      throw new ConflictException("le username ou l'email existe déjà");
    }
    return;
  }
}
