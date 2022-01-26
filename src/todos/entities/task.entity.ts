import { TimestampEntities } from 'src/generic/timestamp-entities';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TodoEntity } from './todo.entity';

@Entity()
export class TaskEntity extends TimestampEntities {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  task: string;

  @ManyToOne((type) => TodoEntity, (todo) => todo.tasks)
  todo: TodoEntity;
}
