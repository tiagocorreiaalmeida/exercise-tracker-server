import { User } from '../user';

export interface UserRepo {
  exists(userId: string): Promise<boolean>;
  save(user: User): Promise<User>;
  findByEmail(userEmail: string): Promise<User | null>;
  findById(userId: string): Promise<User | null>;
  delete(userId: string): Promise<void>;
  findByEmailOrUsername(userEmail: string, userUsername: string): Promise<User | null>;
}
