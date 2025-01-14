import { uuid } from "uuidv4";

import User from "@modules/users/entities/User";

import IUserRepository from "@modules/users/repositories/iUsersRepository";
import iCreateUserDTO from "@modules/users/interfaces/iCreateUserDTO";

class FakeUsersRepository implements IUserRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find((user) => user.id === id);
    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find((user) => user.email === email);
    return findUser;
  }

  public async create(userData: iCreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid() }, userData);

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(
      (findUser) => findUser.id === user.id
    );

    this.users[findIndex] = user;

    return user;
  }
}

export default FakeUsersRepository;
