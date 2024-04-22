import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'Alice', email: 'alice@example.com', role: 'INTERN' },
    { id: 2, name: 'Bob', email: 'bob@example.com', role: 'ENGINEER' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com', role: 'ADMIN' },
    { id: 4, name: 'David', email: 'david@example.com', role: 'INTERN' },
    { id: 5, name: 'Eve', email: 'eve@example.com', role: 'ENGINEER' },
    { id: 6, name: 'Frank', email: 'frank@example.com', role: 'ADMIN' },
    { id: 7, name: 'Grace', email: 'grace@example.com', role: 'INTERN' },
    { id: 8, name: 'Hannah', email: 'hannah@example.com', role: 'ENGINEER' },
    { id: 9, name: 'Isaac', email: 'isaac@example.com', role: 'ADMIN' },
    { id: 10, name: 'Jack', email: 'jack@example.com', role: 'INTERN' },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role);
      if (rolesArray.length === 0)
        throw new NotFoundException('User Role Not found');
      return rolesArray;
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('user not found');
    return user;
  }

  create(createUserDto: CreateUserDto) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  udpate(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUserDto };
      }
      return user;
    });
    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return removedUser;
  }
}
