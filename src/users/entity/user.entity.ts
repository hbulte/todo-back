import { TimestampEntities } from 'src/generic/timestamp-entities';
import { TodoEntity } from 'src/todos/entities/todo.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User extends TimestampEntities {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true, nullable: false })
  username: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: true })
  salt: string;

  @Column({ nullable: true })
  hash: string;

  @OneToMany((type) => TodoEntity, (todo) => todo.user, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'todos_id' })
  todos: TodoEntity[];
}
