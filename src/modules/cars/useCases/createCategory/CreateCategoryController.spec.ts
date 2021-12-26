import request from 'supertest';

import { app } from '@shared/infra/http/app';

describe('Create Category Controller', async () => {
  it('Should be able to create a new Category', async () => {
    const response = await request(app).post('/categories').send({
      name: 'Category SuperTest',
      description: 'Category Supertest',
    });

    expect(response.status).toBe(201);
  });
});
