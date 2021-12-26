import dayjs from 'dayjs';

import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { DayJsDateProvider } from '@shared/container/providers/DateProvider/Implementations/DayJsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateRentalUseCase } from './CreateRentalUseCase';

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;
let dayJsDateProvider: DayJsDateProvider;

describe('Create Rental', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate();
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayJsDateProvider = new DayJsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayJsDateProvider,
    );
  });

  it('Should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      user_id: '12345',
      car_id: '121212',
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('Should not be able to create a new rental if there is another open to them same user', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: '121213',
        user_id: '12345',
        expected_return_date: dayAdd24Hours,
      });

      const rental = await createRentalUseCase.execute({
        car_id: '121212',
        user_id: '12345',
        expected_return_date: dayAdd24Hours,
      });

      console.log(rental);
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create a new rental if there is another open to them same car', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: 'test',
        user_id: '123',
        expected_return_date: dayAdd24Hours,
      });

      const rental = await createRentalUseCase.execute({
        car_id: 'test',
        user_id: '321',
        expected_return_date: dayAdd24Hours,
      });

      console.log(rental);
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create a new rental with invalid return time', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: 'test',
        user_id: '123',
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
