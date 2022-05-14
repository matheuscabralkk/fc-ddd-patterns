import {app, sequelize} from '../express';
import request from 'supertest';

describe('E2E test for product', () => {
    beforeEach(async () => {
        await sequelize.sync({force: true});
    })

    afterAll(async () => {
        await sequelize.close();
    })

    it('should create a product', async () => {
        const response = await request(app)
            .post('/product')
            .send({
                    name: 'My Product Name',
                    price: 100,
                }
            );
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('name', 'My Product Name');
        expect(response.body).toHaveProperty('price', 100);
    })

    it('should not create a product', async () => {
        const response = await request(app)
            .post('/product')
            .send({
                    name: 'My Product Name',
                }
            );
        expect(response.status).toBe(500);
    })

    it('should list all products', async () => {
        const response1 = await request(app)
            .post('/product')
            .send({
                    name: 'My Product Name',
                    price: 100,
                }
            );
        const response2 = await request(app)
            .post('/product')
            .send({
                    name: 'My Product Name 2',
                    price: 200,
                }
            );

        expect(response1.status).toBe(200);
        expect(response2.status).toBe(200);

        const response3 = await request(app).get('/product').send();

        expect(response3.status).toBe(200);
        expect(response3.body.products).toHaveLength(2);
        expect(response3.body.products[0]).toHaveProperty('id');
        expect(response3.body.products[0]).toHaveProperty('name', 'My Product Name');
        expect(response3.body.products[0]).toHaveProperty('price', 100);
        expect(response3.body.products[1]).toHaveProperty('id');
        expect(response3.body.products[1]).toHaveProperty('name', 'My Product Name 2');
        expect(response3.body.products[1]).toHaveProperty('price', 200);
    })
})
