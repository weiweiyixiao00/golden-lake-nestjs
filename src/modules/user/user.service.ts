import { Injectable } from '@nestjs/common';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { ResCode } from '../../common/constant/rescode';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  
  async login(user: {username: string, password: string}): Promise<any> {
    try {
      const data = await this.userRepository.findOne({username:user.username, password: user.password})
      if(!data) {
        return {code: 1 , msg:'密码错误', data: ''}
      }
      return { msg:'登录成功', data: data}
    }catch(e) {
      return {code: ResCode.ERROR, msg:'登录失败', data: e}
    }
  }

  async findUser(username: string): Promise<any> {
    console.log('findUser:name=', username);
    try {
      const data = await this.userRepository.findOne({
        where: {username}
      });
      return data || {};

    } catch(e) {
      return { code: ResCode.ERROR, msg:'未找到用户', data: e }
    }
  }

  async register(user: User): Promise<any> {
    try {
      const isHave = await this.userRepository.find({username: user.username})
      if(isHave.length) {
        return {code: 1, msg:'用户名重复', data: '' }
      }

      const index = Math.round(Math.random()*19 +1)
      user.avatar = `api/avatar/avatar(${index}).png`

      const data = await this.userRepository.save(user)

      return { msg:'注册成功', data }
    } catch(e) {
      return { code: ResCode.ERROR, msg:'注册失败', data: e }
    }
  }
}