import { NoteEntity } from "src/notes/note.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import type { User } from "./types/user.interface";

@Entity('users')
export class UserEntity implements User {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ default: 'no-email@example.com' })
  email: string;

  @Column()
  username: string;
  
  @Column()
  password: string;

  @OneToMany(() => NoteEntity, (note) => note.author)
  notes: NoteEntity[];
}