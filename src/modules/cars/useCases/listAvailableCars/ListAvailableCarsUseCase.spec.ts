import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { CreateCarUseCase } from '../createCar/CreateCarUseCase';
import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let createCarUseCase: CreateCarUseCase;
let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory,
    );
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('Should be able to list all available cars', async () => {
    const car = await createCarUseCase.execute({
      name: 'Name Car',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'CAB-1234',
      fine_amount: 60,
      brand: 'Brand Car',
      category_id: 'category',
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('Should be able to list all available cars by name', async () => {
    const car = await createCarUseCase.execute({
      name: 'Name Car One',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand CarOne',
      category_id: 'category',
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: 'Name Car One',
    });

    expect(cars).toEqual([car]);
  });

  it('Should be able to list all available cars by brand', async () => {
    const car = await createCarUseCase.execute({
      name: 'Name Car Two',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'BCA-1234',
      fine_amount: 60,
      brand: 'Brand CarTwo',
      category_id: 'category',
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: 'Brand CarTwo',
    });

    expect(cars).toEqual([car]);
  });

  it('Should be able to list all available cars by category', async () => {
    const car = await createCarUseCase.execute({
      name: 'Name Car three',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'BCA-1234',
      fine_amount: 60,
      brand: 'Brand CarThree',
      category_id: 'category_1',
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: 'Brand category_1',
    });

    expect(cars).toEqual([car]);
  });
});
