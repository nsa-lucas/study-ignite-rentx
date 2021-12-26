import { ICreateUsersDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { User } from '@modules/accounts/infra/typeorm/entities/User';

interface IUsersRepository {
  create({
    name,
    email,
    password,
    driver_license,
  }: ICreateUsersDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(user_id: string): Promise<User>;
}

export { IUsersRepository };
