import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TodoEntity } from './todo.entity';

@Entity()
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  task: string;

  @ManyToOne((type) => TodoEntity, (todo) => todo.tasks)
  todo: TodoEntity;
}
