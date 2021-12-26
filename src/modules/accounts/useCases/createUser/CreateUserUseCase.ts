import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  name: string;
  email: string;
  password: string;
  driver_license: string;
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    name,
    email,
    password,
    driver_license,
  }: IRequest): Promise<void> {
    const userEmailAlreadyExists = await this.usersRepository.findByEmail(
      email,
    );

    if (userEmailAlreadyExists) {
      throw new AppError('E-mail already registered');
    }

    const hashedPassword = await hash(password, 8);

    this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      driver_license,
    });
  }
}

export { CreateUserUseCase };
