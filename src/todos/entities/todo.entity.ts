import { TimestampEntities } from 'src/generic/timestamp-entities';
import { User } from 'src/users/entity/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskEntity } from './task.entity';

@Entity()
export class TodoEntity extends TimestampEntities {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  title: string;

  @OneToMany((type) => TaskEntity, (task) => task.todo, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  tasks: TaskEntity[];

  @ManyToOne((type) => User, (user) => user.todos)
  user: User;
}
