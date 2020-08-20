import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn("uuid")
  userId: string;

  @Column({ default: '陈冠希' })
  username: string;

  @Column({ default: '123456' })
  password: string;

  @Column({ default: 'avatar(1).png' })
  avatar: string;

  @Column({ default: 'user' })
  role: string;

  @Column({ default: '' })
  tag: string;

  @Column({ default: '' })
  occupation: string; // 职业

  @Column({type: 'double',default: new Date().valueOf()})
  createTime: number;
}