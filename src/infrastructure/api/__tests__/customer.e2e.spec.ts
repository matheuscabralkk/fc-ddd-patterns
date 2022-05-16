import {app, sequelize} from '../express';
import request from 'supertest';

describe('E2E test for customer', () => {
    beforeEach(async () => {
        await sequelize.sync({force: true});
    })

    afterAll(async () => {
        await sequelize.close();
    })

    it('should create a customer', async () => {
        const response = await request(app)
            .post('/customer')
            .send({
                    name: 'John Doe',
                    address: {
                        street: '123 Main St',
                        city: 'Anytown',
                        number: 123,
                        zip: '12345'
                    }
                }
            );
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('name', 'John Doe');
        expect(response.body).toHaveProperty('address');
        expect(response.body.address).toHaveProperty('street', '123 Main St');
        expect(response.body.address).toHaveProperty('city', 'Anytown');
        expect(response.body.address).toHaveProperty('number', 123);
        expect(response.body.address).toHaveProperty('zip', '12345');
    })

    it('should not create a customer', async () => {
        const response = await request(app)
            .post('/customer')
            .send({
                    name: 'John Doe',
                }
            );
        expect(response.status).toBe(500);
    })

    it('should list all customers', async () => {
        const response1 = await request(app)
            .post('/customer')
            .send({
                    name: 'John Doe',
                    address: {
                        street: '123 Main St',
                        city: 'Anytown',
                        number: 123,
                        zip: '12345'
                    }
                }
            );
        const response2 = await request(app)
            .post('/customer')
            .send({
                    name: 'Jane Doe',
                    address: {
                        street: '1234 Main St',
                        city: 'Anytown 2',
                        number: 1234,
                        zip: '123453252'
                    }
                }
            );

        expect(response1.status).toBe(200);
        expect(response2.status).toBe(200);

        const response3 = await request(app).get('/customer').send();

        expect(response3.status).toBe(200);
        expect(response3.body.customers).toHaveProperty('length', 2);
        expect(response3.body.customers[0]).toHaveProperty('id');
        expect(response3.body.customers[0]).toHaveProperty('name', 'John Doe');
        expect(response3.body.customers[0]).toHaveProperty('address');
        expect(response3.body.customers[0].address).toHaveProperty('street', '123 Main St');
        expect(response3.body.customers[0].address).toHaveProperty('city', 'Anytown');
        expect(response3.body.customers[1]).toHaveProperty('id');
        expect(response3.body.customers[1]).toHaveProperty('name', 'Jane Doe');
        expect(response3.body.customers[1]).toHaveProperty('address');
        expect(response3.body.customers[1].address).toHaveProperty('street', '1234 Main St');
        expect(response3.body.customers[1].address).toHaveProperty('city', 'Anytown 2');

        const listResponseXML = await request(app).get('/customer').set('Accept', 'application/xml');

        expect(listResponseXML.status).toBe(200);
        expect(listResponseXML.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`);
        expect(listResponseXML.text).toContain(`<customers>`);
        expect(listResponseXML.text).toContain(`<customer>`);
        expect(listResponseXML.text).toContain(`<name>John Doe</name>`);
        expect(listResponseXML.text).toContain(`<address>`);
        expect(listResponseXML.text).toContain(`<street>123 Main St</street>`);
        expect(listResponseXML.text).toContain(`<city>Anytown</city>`);
        expect(listResponseXML.text).toContain(`<number>123</number>`);
        expect(listResponseXML.text).toContain(`<zip>12345</zip>`);
    })
})
