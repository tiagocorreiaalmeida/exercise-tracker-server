import { UserRepo as IUserRepo } from '../../../domain/repos/userRepo';
import { User } from '../../../domain/user';

export class InMemoryUserRepo implements IUserRepo {
  users: User[];
  constructor() {
    this.users = [];
  }

  async findByEmail(userEmail: string): Promise<User | null> {
    const user = this.users.find((storedUser) => storedUser.email === userEmail);

    return user || null;
  }

  async save(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }

  async findById(userId: string): Promise<User | null> {
    const user = this.users.find((storedUser) => storedUser.id === userId);

    return user || null;
  }

  async delete(userId: string): Promise<void> {
    this.users = this.users.filter((user) => user.id !== userId);
  }

  async findByEmailOrUsername(userEmail: string, userUsername: string): Promise<User | null> {
    const user = this.users.find(
      (storedUser) => storedUser.email === userEmail || storedUser.username === userUsername,
    );

    return user || null;
  }

  async exists(userId: string): Promise<User | null> {
    const user = this.users.find((storedUser) => storedUser.id === userId);

    return user || null;
  }
}

export const UserRepo = new InMemoryUserRepo();
