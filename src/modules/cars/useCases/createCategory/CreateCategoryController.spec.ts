import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;

describe('Create Category Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidv4();
    const password = await hash('admin', 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isadmin", created_at, driver_license)
     values('${id}', 'adminTest', 'admin2@rentx.com.br', '${password}', true, 'now()', 'D')
    `,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('Should be able to create a new Category', async () => {
    const responseToken = await request(app)
      .post('/sessions')
      .send({ email: 'admin2@rentx.com.br', password: 'admin' });

    const { token } = responseToken.body.token;

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'Category SuperTest',
        description: 'Category Supertest',
      })
      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toBe(201);
  });

  it('Should not be able to create a new Category with a name exists', async () => {
    const responseToken = await request(app)
      .post('/sessions')
      .send({ email: 'admin2@rentx.com.br', password: 'admin' });

    const { token } = responseToken.body.token;

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'Category SuperTest',
        description: 'Category Supertest',
      })
      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toBe(400);
  });
});
