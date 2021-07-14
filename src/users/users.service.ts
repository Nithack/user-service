import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { ResponseUserDto } from './dto/response-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const findEmail =
        (await this.usersRepository.findOne({
          email: createUserDto.email,
        })) || null;
      console.log(findEmail);
      if (findEmail) return ResponseUserDto.factory(false, 'Email Exist');
      const newUser = await this.usersRepository.save(createUserDto);
      return ResponseUserDto.factory(true, newUser);
    } catch (error) {
      return ResponseUserDto.factory(false, error.message);
    }
  }

  async findAll() {
    try {
      const findUsers = await this.usersRepository.find();
      return ResponseUserDto.factory(true, findUsers);
    } catch (error) {
      return ResponseUserDto.factory(false, error.message);
    }
  }

  async findOne(id: string) {
    try {
      const findUser = await this.usersRepository.findOne({ uuid: id });
      if (!findUser) return ResponseUserDto.factory(true, 'User not found');
      return ResponseUserDto.factory(true, findUser);
    } catch (error) {
      return ResponseUserDto.factory(false, error.message);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const findUser = await this.usersRepository.findOne({ uuid: id });
      if (!findUser) return ResponseUserDto.factory(false, 'User not found');
      Object.assign(findUser, updateUserDto);
      const userUpdate = await this.usersRepository.save(findUser);
      return ResponseUserDto.factory(true, userUpdate);
    } catch (error) {
      return ResponseUserDto.factory(false, error.message);
    }
  }

  async remove(id: string) {
    try {
      await this.usersRepository.delete({ uuid: id });
      return ResponseUserDto.factory(true, 'no data');
    } catch (error) {
      return ResponseUserDto.factory(false, error.message);
    }
  }
}
